# キャリア逆算ナビ

**エンジニア志望の就活生**が、AI（Claude）との対話を通して「なりたい未来」から会社選びの軸を言語化するWebアプリです。
収益は **大学・キャリアセンター向けの法人契約（学生は無料）** を想定しています。

このブランチ（`claude/local-storage`）は **サーバーを使わず、ブラウザのローカルストレージだけで動く版** です。
診断はブラウザ内のルールベースで行い、外部APIには一切通信しません。掲載企業はすべて**架空のサンプル**です。

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
| データ保存 | ブラウザの localStorage | `src/lib/storage.ts` にキーを集約 |

## 起動

```bash
npm install
npm run dev
```

## デプロイ

ビルドコマンド `npm run build`、公開ディレクトリ `dist`。SPA のため、全パスを `index.html` に返す設定を同梱しています。

| サービス | 設定ファイル |
| --- | --- |
| Netlify（bolt の Deploy ボタンもこれ） | `netlify.toml` / `public/_redirects` |
| Vercel | `vercel.json` |
| Cloudflare Pages | `public/_redirects` |

環境変数は不要です。

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
├─ lib/            ローカルストレージ・ユーティリティ
├─ pages/          各画面
├─ services/       データアクセス層（現在はモック）
└─ types/          ドメイン型
```

## ローカルストレージの構成

すべて `career-navi:` プレフィックス付きで保存します（`src/lib/storage.ts`）。

| キー | 内容 |
| --- | --- |
| `version` | 保存形式のバージョン |
| `user` | 簡易ログインのプロフィール（パスワードは保存・照合しない） |
| `results` | 診断結果の配列（新しい順） |
| `skill-checks:{キャリアID}` | スキル・経験のチェック状態 |
| `inquiries` | 大学向けお問い合わせ（デモ・外部送信なし） |

マイページの「データの管理」から、JSONでの書き出しと全削除ができます。

### この版の制約
- データはその端末・そのブラウザの中だけ。別の端末と同期はできません
- ログインは本人確認を伴わない簡易版
- AIはルールベース（Claude との連携は、サーバー側でAPIキーを扱える `main` ブランチの構成で行う）
- キャリアセンター管理画面・結果の共有は画面イメージのみ（他の学生のデータは集計できない）
