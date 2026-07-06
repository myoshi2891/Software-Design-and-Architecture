# Implementation Plans（アーキテクト資格試験対策プラットフォーム拡張）

improve スキル（`.agents/skills/improve/SKILL.md`）により 2026-07-06 に生成。対象コミット: `06ca17c`。
各実行者は担当計画を最初に全文読み、STOP 条件を遵守し、完了時に自分の行の Status を更新すること。
すべての計画は Plan 001（方針文書）を前提とするため、実行前に 001 を必ず読むこと。

## Execution order & status

| Plan | Title | Priority | Effort | Depends on | Status |
|------|-------|----------|--------|------------|--------|
| 001 | カテゴリ体系とロードマップの確立（方針文書） | P1 | S | — | DONE |
| 004 | TOGAF ガイドの TOGAF 10 対応改訂 + 試験対策強化 | P1 | M | 001 | TODO |
| 002 | iSAQB CPSA-F 試験対策ガイド新規作成 | P1 | L | 001 | TODO |
| 003 | クラウド・インフラ設計ガイド新規作成（3 大クラウド資格対応） | P2 | L | 001 | TODO |
| 005 | CDMP データマネジメントガイド新規作成 | P2 | L | 001 | TODO |

Status values: TODO | IN PROGRESS | DONE | BLOCKED (with one-line reason) | REJECTED (with one-line rationale)

## Dependency notes

- 004 を最初に推奨: 既存資産（`product-and-enterprise/togaf-certification-comprehensive-guide/`）の改訂であり、最小の労力で「TOGAF 10 未対応」という実害を解消できる。
- 002/003/005 は互いに独立しており並行実行可能。ただしいずれも 001 のカテゴリ決定（配置先ディレクトリ・キャッチアップ機構）に従う。
- 各ガイドの web-next 移植は各計画内のオプションステップ。コンテンツ層（`.md`）完成が先行条件。

## Findings considered and rejected

- **ISTQB カテゴリ新設**: 既存 TDD/BDD ガイドと重複が大きく、アーキテクト資格の主軸から外れるため見送り。
- **ITIL / PMP カテゴリ新設**: 運用管理・プロジェクト管理は本プラットフォームの「アーキテクチャ・設計」スコープ外。
- **資格専用 `certifications/` カテゴリ新設**: ドメイン別ナビ構造と衝突し、知識ガイドと試験ガイドを分断するため不採用（詳細は Plan 001 決定 1）。
- **Kubernetes 独立カテゴリ**: `cloud-infrastructure/` 内の 1 ガイドとして吸収（Plan 001 決定 4）。
