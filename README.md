# キャリア逆算ナビ

**エンジニア志望の就活生**が、AI（Claude）との対話を通して「なりたい未来」から会社選びの軸を言語化するWebアプリです。
収益は **大学・キャリアセンター向けの法人契約（学生は無料）** を想定しています。

現在は **UIのみ（モックデータ）** で動作します。掲載企業はすべて**架空のサンプル**です。
Supabase の環境変数を設定すると、AI対話は Edge Function 経由で Claude を使います（失敗時はモックにフォールバック）。

## 技術スタック

| 区分 | 採用技術 | 備考 |
| --- | --- | --- |
| ビルド | Vite 5 + TypeScript 5.5 | bolt.new の標準テンプレートと同じ構成 |
| UI | React 18 | |
| ルーティング | React Router v6 | |
| スタイル | Tailwind CSS 3.4 | テーマは `src/index.css` の CSS 変数 |
| コンポーネント | shadcn/ui（Radix UI） | `src/components/ui/`、`components.json` あり |
| アイコン | lucide-react | |
| 画像出力 | html-to-image | 就活軸カードの PNG 化 |
| バックエンド（予定） | Supabase（Auth / Postgres / Storage / Edge Functions） | `@supabase/supabase-js` 導入済み |
| AI | Claude（`claude-opus-5-5`）/ `@anthropic-ai/sdk` | `supabase/functions/career-chat`。APIキーはサーバー側のみ |

## 起動

```bash
npm install
npm run dev
```

## サイトマップ

```
/                 トップ（LP）
├─ /diagnosis     AI対話診断（チャット）
│   └─ /result/:id    診断結果（タイプ・就活軸・価値観・キャリアパス・ギャップ・会社の特徴・逆質問）
│       └─ /card/:id  就活軸カード作成（画像保存・SNSシェア・公開設定）
├─ /careers       キャリア図鑑（一覧／カテゴリで絞り込み）
│   └─ /careers/:id   キャリア詳細（ロードマップ・必要スキル・会社の特徴）
├─ /companies     軸から探す企業（架空のサンプル／会社の特徴で絞り込み）
│   └─ /companies/:id 企業詳細
├─ /mypage        マイページ（診断履歴・プロフィール・キャリアセンター共有設定）
├─ /login         ログイン／新規登録（大学の招待コード）
├─ /for-universities 大学・キャリアセンター向けページ（お問い合わせ）
├─ /admin         キャリアセンター管理画面（デモ）
├─ /about         このサービスについて
├─ /terms         利用規約
└─ /privacy       プライバシーポリシー
```

## ディレクトリ構成

```
src/
├─ components/
│  ├─ ui/          shadcn/ui コンポーネント
│  ├─ layout/      ヘッダー・フッター・レイアウト
│  ├─ common/      ロゴ・グラフなど共通部品
│  ├─ diagnosis/   チャット関連
│  ├─ career/      ロードマップ・スキルチェック・会社の特徴
│  └─ card/        就活軸カード
├─ contexts/       AuthContext
├─ data/           マスターデータ（キャリアパス・会社特徴・質問）
├─ lib/            supabase クライアント・ユーティリティ
├─ pages/          各画面
├─ services/       データアクセス層（現在はモック）
└─ types/          ドメイン型
supabase/migrations/  テーブル定義・RLS（案）
```

## Supabase 接続手順（予定）

1. `.env.example` を `.env.local` にコピーし、`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` を設定
2. `supabase/migrations/0001_init.sql` を SQL Editor で実行
3. 各サービスをモックから Supabase 実装に差し替え
   - `authService.ts` → `supabase.auth.*`
   - `diagnosisService.ts` → `diagnosis_results` テーブル
   - `aiService.ts` → 実装済み。`supabase functions deploy career-chat` と `supabase secrets set ANTHROPIC_API_KEY=...` で有効化
   - `SkillGapChecker` → `skill_checks` テーブル
   - カード画像 → Storage `axis-cards` バケット
