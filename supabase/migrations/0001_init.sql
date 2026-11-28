-- キャリア逆算ナビ 初期スキーマ（案）
-- フロントの型定義 src/types/index.ts と対応

-- 契約大学（マネタイズ：大学・キャリアセンター向けB2B）
create table public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text not null unique,   -- 学生が新規登録時に入力
  plan text not null default 'trial',
  created_at timestamptz not null default now()
);

-- プロフィール（auth.users と 1:1）
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null default '',
  graduation_year int,
  university_id uuid references public.universities (id),
  share_with_career_center boolean not null default false,  -- 学生本人の同意
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 診断セッション（AI対話の単位）
create table public.diagnosis_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  engineer_field text check (engineer_field in ('web', 'infra', 'data', 'undecided')),
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
  engineer_field text not null,
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

-- キャリアセンター職員
create table public.university_staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  university_id uuid not null references public.universities (id) on delete cascade,
  role text not null default 'staff' check (role in ('staff', 'admin'))
);

-- 企業（現在は架空のサンプル。src/data/companies.ts と対応）
create table public.companies (
  id text primary key,
  name text not null,
  industry text not null,
  size text not null,
  employees text,
  tagline text,
  description text,
  engineer_fields text[] not null default '{}',
  trait_ids text[] not null default '{}',
  career_path_ids text[] not null default '{}',
  highlights text[] not null default '{}',
  is_sample boolean not null default true
);

-- 大学向けお問い合わせ
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  university_name text not null,
  department text,
  contact_name text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.universities enable row level security;
alter table public.university_staff enable row level security;
alter table public.companies enable row level security;
alter table public.inquiries enable row level security;
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

create policy "companies are public" on public.companies for select using (true);
create policy "anyone can inquire" on public.inquiries for insert with check (true);
create policy "staff reads own university" on public.universities
  for select using (exists (select 1 from public.university_staff s where s.user_id = auth.uid() and s.university_id = id));

-- 職員は「共有に同意した学生」の結果だけ閲覧できる
create policy "staff reads consented results" on public.diagnosis_results
  for select using (
    exists (
      select 1 from public.profiles p
      join public.university_staff s on s.university_id = p.university_id
      where p.id = diagnosis_results.user_id and p.share_with_career_center and s.user_id = auth.uid()
    )
  );

-- 管理画面の匿名集計（個人は特定しない）
create function public.university_value_stats(target_university uuid)
returns table (top_value text, students bigint)
language sql security definer set search_path = public as $$
  select r.keywords[1] as top_value, count(distinct r.user_id) as students
  from public.diagnosis_results r
  join public.profiles p on p.id = r.user_id
  where p.university_id = target_university
    and exists (select 1 from public.university_staff s where s.user_id = auth.uid() and s.university_id = target_university)
  group by 1;
$$;

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
