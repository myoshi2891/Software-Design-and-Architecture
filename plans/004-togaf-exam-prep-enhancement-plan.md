# Plan 004: TOGAF ガイドを TOGAF Standard 10th Edition の資格体系に改訂し試験対策を強化する

> **Executor instructions**: 本計画をステップ順に実行し、各ステップの検証コマンドを実行して期待結果を確認してから次へ進むこと。「STOP conditions」に該当したら即座に停止して報告する。完了時に `plans/README.md` の自分の行の Status を更新すること。
>
> **Drift check（最初に実行）**: `git diff --stat 06ca17c..HEAD -- product-and-enterprise/togaf-certification-comprehensive-guide/`
> 対象ガイドが本計画作成後に変更されている場合は「Current state」の抜粋と実物を突き合わせ、不一致なら STOP。

## Status

- **Priority**: P1（既存資産の事実誤りに近い陳腐化の解消。全計画中で最初に実行推奨）
- **Effort**: M（新規執筆でなく改訂）
- **Risk**: MED（既存の公開済みガイドの書き換え。`.md` と `.html` の 2 ファイルが同期対象）
- **Depends on**: plans/001-certification-platform-roadmap.md
- **Category**: docs / direction
- **Planned at**: commit `06ca17c`, 2026-07-06

## Why this matters

既存の TOGAF ガイド（`product-and-enterprise/togaf-certification-comprehensive-guide/`）は **TOGAF 9.2 の資格体系を前提に書かれており、2022 年リリースの TOGAF Standard 10th Edition に一度も言及していない**（`grep -c "TOGAF 10\|10th Edition\|第10版"` = 0 件）。The Open Group は 10th Edition で資格名自体を変更しており（後述）、現ガイドの「Level 1 TOGAF Foundation / Level 2 TOGAF Practitioner」という記述は受験者を旧体系へ誘導しかねない。試験対策プラットフォームとして最も実害の大きい陳腐化であり、新規ガイド執筆より優先して改訂すべきである。

## Current state

- 対象: `product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.md`（約 36KB、11 章構成）と同名 `.html`（約 88KB、Web 移植版）。**両ファイルの同期が必要。**
- web-next には未移植（`web-next/app/product-and-enterprise/` ディレクトリ自体が存在しない）。nav-links.ts には `/product-and-enterprise/togaf-certification-comprehensive-guide` へのリンクが既に存在する（未移植リンクの先行配置は設計どおり）。
- 陳腐化の証拠（`.md` 内の実記述）:
  - 51〜52 行目: 歴史表が「2009 TOGAF 9 リリース（現在も広く使用）」「2018 TOGAF 9.2 リリース」で終わっている
  - 85〜86 行目: 資格体系図が「Level 1 TOGAF Foundation / Level 2 TOGAF Practitioner」
  - 960 行目: 公式テキストとして「TOGAF® Standard, Version 9.2」を参照
- 章立て（維持する骨格）: 1. TOGAF とは → 2. 試験の種類と概要 → 3. ADM 完全解説 → 4. BDAT → 5. EA 構成要素 → 6. アーキテクチャリポジトリ → 7. ステークホルダーマネジメント → 8. ガバナンス → 9. 試験対策 → 10. 7 週間学習ロードマップ → 11. 参考文献

### TOGAF 10 の事実（2026-07-06 確認、改訂に使用する一次情報）

- The Open Group は 10th Edition で「TOGAF 10 Foundation / TOGAF 10 Practitioner」という名称を意図的に採用せず、資格名は **TOGAF Enterprise Architecture Foundation** と **TOGAF Enterprise Architecture Practitioner**。
- **Foundation（Part 1）**: 多肢選択 40 問・60 分・60% で合格。
- **Practitioner（Part 2）**: シナリオ問題 8 問・90 分。TOGAF 標準の分析・適用能力を問う。
- Foundation + Practitioner を統合した Combined 受験パスも提供される。
- 10th Edition は「基礎コンテンツ（Fundamental Content）+ シリーズガイド（Series Guides）」のモジュール構造に再編された — ADM 自体の骨格は 9.2 から大きく変わらないため、第 3〜8 章の知識本文は用語調整中心で流用可能。

## Commands you will need

| 目的 | コマンド | 成功条件 |
|---|---|---|
| リンク検証 | ルートで `bun run check-links` | exit 0 |
| Markdown 修正 | `bun run fix-markdown` | exit 0 |
| 旧表記の残存確認 | `grep -n "9\.2" product-and-enterprise/togaf-certification-comprehensive-guide/*.md` | 意図した箇所（歴史表・比較章）のみヒット |
| Web 層検証（Step 5 実施時のみ） | `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` | すべて成功 |

## Suggested executor toolkit

- `markdown-formatter` スキル、`fix-mermaid` スキル（資格体系図を書き換えるため図の構文エラーに注意）
- Step 5 実施時: `nextjs-page-migration` スキル（`.html` からの移植手順）

## Scope

**In scope**:

- `product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.md`（改訂）
- 同ディレクトリの `.html`（`.md` の改訂内容と同期）
- `plans/README.md`（Status 更新）
- （オプション Step 5）`web-next/app/product-and-enterprise/togaf-certification-comprehensive-guide/` 配下の新規ファイル

**Out of scope**:

- `nav-links.ts` — TOGAF リンクは既に存在するため変更不要（Step 5 を実施しても不要）
- ADM・BDAT 等の知識本文の全面書き直し — 10th Edition でも骨格は共通。用語・参照の更新に留める
- MVP ガイド（同カテゴリの別ガイド）

## Git workflow

- 現行ブランチ（`dev`）上で作業。push は指示があるまで行わない。
- コミット分割: `docs(product-and-enterprise): ...`（`.md` 改訂）→ 同 `.html` 同期も同一コミットに含めてよい（同一論理変更のため）。Step 5 は `feat(web-next): ...` + TDD フェーズコミット。
- 各コミット前に PII チェック: `git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'` → 出力なし。

## Steps

### Step 1: 資格体系の全面改訂（第 1・2 章 + 資格体系図）

- 歴史表（51 行目付近）に「2022 | TOGAF Standard, 10th Edition リリース（現行版）」を追加し、「現在も広く使用」の注記を 10th Edition 前提に修正。
- 資格体系図（85 行目付近の Mermaid）と第 2 章の試験概要表を「TOGAF Enterprise Architecture Foundation / Practitioner」に改訂し、上記「TOGAF 10 の事実」の試験形式（40 問/60 分、シナリオ 8 問/90 分、Combined パス）を反映。
- 「なぜ TOGAF 10 Foundation という名前ではないのか」のコラムを追加（The Open Group 公式 FAQ の要旨。受験者の検索混乱を解消する価値が高い）。
- 冒頭に「対象試験バージョン表」（10th Edition / 確認日）を追加（Plan 001 決定 3）。

**Verify**: `grep -c "10th Edition" product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.md` ≥ 3

### Step 2: 知識本文（第 3〜8 章）の用語・参照更新

10th Edition のモジュール構造（Fundamental Content + Series Guides）を第 1 章か第 3 章冒頭で説明し、本文中の「TOGAF 9.2 では〜」型の記述を版非依存の記述に改める。ADM フェーズ構成・BDAT は骨格維持。

**Verify**: `grep -n "9\.2" product-and-enterprise/togaf-certification-comprehensive-guide/*.md` → 歴史表と新旧比較の文脈のみ（それ以外のヒットは修正漏れ）

### Step 3: 試験対策章（第 9・10 章）と参考文献（第 11 章）の更新

- 第 9 章の頻出テーマを Foundation/Practitioner の新試験構成に対応させる（特に Practitioner のシナリオ 8 問形式に合わせた解答アプローチ節を追加）。
- 960 行目付近の公式テキスト参照を「TOGAF® Standard, 10th Edition」へ更新し、公式 URL（opengroup.org の certification portfolio と試験データシート PDF）を参考文献に追加。
- **リンクチェック CI の制約**: help.opengroup.org（Zendesk）は自動リンクチェックをボットブロック（HTTP 403）するため、同ホストの URL をガイドに追加してはならない。FAQ の内容を引用する場合は記事タイトルの文字列参照に留めるか、`.markdown-link-check.json` の `ignorePatterns` に `^https://help\.opengroup\.org` を追加した上でリンクする（後者を選ぶ場合のみ同設定ファイルを In scope に加えてよい）。

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0

### Step 4: `.html` の同期とコミット

`.md` の改訂内容を同ディレクトリの `.html` に反映（該当セクションの差分適用。全面再生成は不要）。コミット: `docs(product-and-enterprise): TOGAF ガイドを 10th Edition 資格体系に改訂`（PII チェック後）。

**Verify**: `grep -c "10th Edition" product-and-enterprise/togaf-certification-comprehensive-guide/*.html` ≥ 3、`git log --oneline -2` に規約形式のコミット

### Step 5（オプション）: web-next への移植

`nextjs-page-migration` スキルに従い `web-next/app/product-and-enterprise/togaf-certification-comprehensive-guide/page.tsx` + 契約テストを TDD で作成。**新カテゴリルートのため globals.css にページスコープクラスを新設**（既存スコープから継承しない）。nav-links.ts のリンクは既存のため変更不要。exemplar: `web-next/app/general/comprehensive-guide/page.tsx`。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` → すべて成功。`bun run dev` で `/product-and-enterprise/togaf-certification-comprehensive-guide` が 404 でなくなる

## Test plan

- コンテンツ層: `bun run check-links`（新規追加する opengroup.org URL の死活を含む）+ markdownlint。
- 改訂の回帰確認: Step 1〜3 の grep ベース検証（10th Edition 言及数、9.2 残存箇所）が機械的なゲートになる。
- Web 層（Step 5）: `page.test.tsx` を general/comprehensive-guide のパターンで新規作成（見出し構造・Mermaid 図数・外部リンク rel 属性の契約）。

## Done criteria

- [ ] `.md` と `.html` の両方で `grep -c "10th Edition"` ≥ 3
- [ ] 資格名が「TOGAF Enterprise Architecture Foundation / Practitioner」で記載され、試験形式（40 問/60 分、シナリオ 8 問/90 分）が明記されている
- [ ] `grep -n "9\.2"` のヒットが歴史・比較文脈のみ
- [ ] `bun run check-links` exit 0
- [ ] In scope 外のファイルに変更がない（`git status`）
- [ ] `plans/README.md` の 004 行が DONE に更新されている

## STOP conditions

- 対象 `.md` が本計画の「Current state」抜粋（51〜52 行目の歴史表、85〜86 行目の体系図、960 行目の参考文献）と一致しない — 既に誰かが改訂した可能性。差分を確認して報告
- The Open Group の資格体系が本計画記載からさらに変わっている（例: 11th Edition や新資格名の登場）— 計画の事実表が古い。更新内容を報告してから続行
- `.html` の構造が `.md` と大きく乖離しており差分適用が不可能 — 同期方針（再生成 or 移植優先）の判断を仰ぐ

## Maintenance notes

- The Open Group は Series Guides を随時追加する。年 1 回、certification portfolio ページとガイド冒頭のバージョン表を突き合わせること。
- 本ガイドが web-next 移植された後（Step 5 完了後）は、`.md` 改訂時に page.tsx への同期が必要になる（三重管理: md/html/tsx）。改訂頻度が上がるようなら html の廃止を別途検討。
- レビュー観点: 試験形式の数値（問題数・時間・合格ライン）が公式データシートと一致すること。

## 参考文献・ソース一覧

- [The Open Group: TOGAF Certification Portfolio](https://www.opengroup.org/certifications/togaf-certification-portfolio)
- The Open Group ヘルプセンター FAQ（記事タイトルで検索: "What certifications are available for the TOGAF Standard, 10th Edition" / "Why Is There No TOGAF 10 Foundation or TOGAF 10 Practitioner"。ホスト help.opengroup.org はリンクチェック CI がボットブロックされるため URL 直リンクなし — Step 3 の CI 制約参照）
- [TOGAF Examinations データシート (PDF)](https://certification.opengroup.org/docs/datasheets/togaf-exams.pdf)
