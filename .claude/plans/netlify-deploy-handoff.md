# Netlify デプロイ準備 — 引き継ぎ（2026-10-17 時点）

計画書: [netlify-deploy-preparation.md](./netlify-deploy-preparation.md)
ブランチ: `dev`（未 push。main へのマージ／PR も未実施）

## 進捗サマリ

| Phase | 内容 | 状態 |
|---|---|---|
| 1 | ローカル専用ガイド（書籍9件）の非公開化 | ✅ 完了 |
| 2 | サイト共通の法務表記（フッター・/licenses・書籍注記） | ✅ 完了 |
| 3 | コンテンツの法務修正（商標・出典・海賊版リンク） | ✅ 完了 |
| 4 | Netlify 設定（静的エクスポート・netlify.toml） | ✅ 完了 |
| 5 | ドキュメント同期（README / GEMINI / CLAUDE.md） | ✅ 完了 |

## 実装済みの要点

- **除外9件**（`web-next/app/recommended-books/` の sql-antipatterns / generative-ai-design-patterns / database-design-for-mere-mortals / architecting-generative-ai-applications / data-warehouse-toolkit / database-internals / high-performance-mysql / nosql-distilled / refactoring-databases）
  - `web-next/.gitignore` に列挙し `git rm --cached` 済み。ファイルはローカルに残る
  - 索引・ナビは `lib/guide-visibility.ts` でフィルタ。`web-next/.env.local`（追跡外）の `NEXT_PUBLIC_INCLUDE_LOCAL_GUIDES=1` でローカルのみ表示
  - 全件定義は `allGuideCatalog` / `allNavLinks`、公開版は `guideCatalog` / `navLinks`（各エントリの `localOnly: true` で判定）
- **法務表記**: `components/site/SiteFooter.tsx`（© 2026 myoshi2891 All rights reserved・商標・非提携）、`app/licenses/page.tsx` + `lib/third-party-licenses.ts`、`components/site/UnofficialBookNotice.tsx`（公開書籍3件に配置）
- **コンテンツ修正**: TOGAF（ExamTopics 削除・®/非公式表記・出題比率の注記・バッジ変更）、SAFe®、多エージェントガイドの英題と無関係書籍の削除、SOLID 引用の出典、Cash App アイコン差し替え、Clean Architecture 図キャプション、LLM 書籍の出版社訂正
  - TOGAF は原本照合テストがあるため、変更は `source-contract.ts` の `TEXT_ERRATA` に登録済み
- **恒久ガード**: `tests/legal-guard.test.ts`（追跡ファイル内の海賊版・試験問題流出系 URL を検出）、`tests/deploy-config.test.ts`
- **Netlify**: `next.config.ts` に `output: "export"`、ルート `netlify.toml`（base=web-next / publish=out / `npm run build` / Node 22 / `NPM_FLAGS=--legacy-peer-deps` / セキュリティヘッダ）
  - bun.lock が追跡外のため Netlify は npm を使う。npm 10.9 は overrides の有無に関係なく peer 解決で内部エラー（`edgesOut`）になるため `--legacy-peer-deps` が必須
  - `postcss` の override を devDependency と同じ `^8.5.28` に揃えた（npm の EOVERRIDE 回避。下限 8.5.23 は満たす）

## 検証結果（最終確認時点）

- web-next: lint エラー 0（warning 14 は既存と同数）/ typecheck OK / test 818件 pass / build OK
- ルート: `bun run test` pass / `bun run audit` 脆弱性 0
- **Netlify 再現**（クリーン clone + npm + `--legacy-peer-deps`）: 31 HTML を生成。除外9件のページ・本文、海賊版系 URL はいずれも `out/` に存在しない
- 目視確認: `/licenses`、フッター、書籍注記は OK

## 残作業（次セッション）

1. ✅ **Clean Architecture 図キャプションの目視再確認**（2026-10-17 完了: 1280px 幅でキャプションが SVG 直下・`.hero-svg-wrap` 内に収まることを確認。モバイル幅は既存仕様で図ごと非表示）: 最後の CSS 修正（`.hero-svg-wrap` を `height: auto` に変更し `.hero-svg-caption` を追加）はビルドのみ確認済み。`out/` を配信してキャプションが図の直下に収まっているか確認する
2. ✅ **Phase 5 ドキュメント同期**（spec-sync スキル。2026-10-17 完了）
   - `README.md` / `GEMINI.md` に除外9件へのリンクや説明が残っており、GitHub 上ではリンク切れになる。「ローカル専用（追跡外）」の扱いに書き換える
   - デプロイ手順（Netlify・`netlify.toml`・`.env.local` フラグ）と、`CLAUDE.md` の overrides 説明（postcss の値・npm 前提）を追記する
3. **任意**: 公開バンドルに除外9件の「書名・一行要約・href」と、ページ別 CSS（クラス名・配色のみ）が残っている。本文は含まれず法的リスクは低い。完全に消すなら、ローカル専用エントリを別モジュールに分け、存在する場合だけ alias で読み込む方式を検討する
4. **ユーザー作業**: dev → main のマージ（または PR）、Netlify でサイトを作成してリポジトリを連携（netlify.toml は自動で読み込まれる）、デプロイブランチの指定

## 注意事項

- **ビルドの一時的な失敗**: クリーン環境で 4 回中 1 回、`next/font/google` の取得で Turbopack が `next/font/google queries have exactly one entry` を出して失敗した。再実行で解消。Netlify で同じ症状が出たら、まず再デプロイする
- **TDD 規約からの逸脱（報告済み・履歴は書き換えていない）**: Phase 1 の Green 時に全体テストを実行しておらず、`app/page.test.tsx` の件数期待（36 → 27）の更新が後追いの独立コミット `0dc191e` になった
- 除外9件は git 履歴からは引き続き参照できる（リポジトリを public のまま維持する判断による）
- ローカルで `bun run test` を実行すると、追跡外のガイドのテストも走る（CI や clone では走らない）
