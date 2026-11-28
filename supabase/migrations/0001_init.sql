-- キャリア逆算ナビ 初期スキーマ（案）
-- フロントの型定義 src/types/index.ts と対応

-- プロフィール（auth.users と 1:1）
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null default '',
  graduation_year int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 診断セッション（AI対話の単位）
create table public.diagnosis_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  starting_role text check (starting_role in ('engineer', 'business', 'undecided')),
  answers jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- 対話メッセージ
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.diagnosis_sessions (id) on delete cascade,
  role text not null check (role in ('ai', 'user')),
  content text not null,
  created_at timestamptz not null default now()
);

-- 診断結果
create table public.diagnosis_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.diagnosis_sessions (id) on delete set null,
  user_id uuid references auth.users (id) on delete cascade,
  starting_role text not null,
  type_name text not null,
  type_description text not null,
  value_scores jsonb not null,      -- { contribution, mastery, leadership, creation, stability }
  axis_statements text[] not null,
  keywords text[] not null default '{}',
  path_matches jsonb not null,      -- [{ pathId, score, reason }]
  trait_ids text[] not null default '{}',
  is_public boolean not null default false,
  share_slug text unique,           -- 公開用URL /share/:slug
  card_image_path text,             -- storage: axis-cards/{user_id}/{id}.png
  created_at timestamptz not null default now()
);
create index on public.diagnosis_results (user_id, created_at desc);

-- スキル・経験の自己チェック
create table public.skill_checks (
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,
  item text not null,
  checked_at timestamptz not null default now(),
  primary key (user_id, path_id, item)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.diagnosis_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.diagnosis_results enable row level security;
alter table public.skill_checks enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own sessions" on public.diagnosis_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own messages" on public.chat_messages
  for all using (
    exists (select 1 from public.diagnosis_sessions s where s.id = session_id and s.user_id = auth.uid())
  );

create policy "own results" on public.diagnosis_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "public results are readable" on public.diagnosis_results
  for select using (is_public = true);

create policy "own skill checks" on public.skill_checks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- サインアップ時にプロフィールを自動作成
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nickname', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage（カード画像）
insert into storage.buckets (id, name, public) values ('axis-cards', 'axis-cards', true)
  on conflict do nothing;

create policy "upload own card" on storage.objects
  for insert with check (bucket_id = 'axis-cards' and auth.uid()::text = (storage.foldername(name))[1]);
