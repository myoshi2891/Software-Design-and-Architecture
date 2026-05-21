# Software Architecture Design - Comprehensive Guide

このプロジェクトは、ソフトウェアアーキテクチャ、デザイン原則、開発手法、およびプロダクト/エンタープライズ管理に関する包括的な知識を体系化したガイド集です。

## プロジェクトの目的

現代のソフトウェア開発において必要とされる、堅牢で拡張性の高いシステム設計と効果的な開発プロセスのベストプラクティスを網羅的に提供することを目的としています。

## コンテンツ構造

リポジトリは以下のカテゴリに分類されています：

### 1. アーキテクチャ (`architecture/`)

さまざまなシステム構造とその適用例を詳しく解説しています。
- Clean Architecture
- Event-Driven Architecture (EDA)
- Hexagonal Architecture
- Microservices Architecture
- Monolithic Architecture
- Service-Oriented Architecture (SOA)

### 2. デザイン原則 (`design-principles/`)

優れたソフトウェア設計の基礎となる原則とパターンを扱います。
- API-First Design
- Component-Oriented Development
- Domain-Driven Design (DDD)
- Object-Oriented Programming (OOP)

### 3. 開発手法 (`development-methodologies/`)

チームが価値を届けるためのプロセスのガイドです。
- Behavior-Driven Development (BDD)
- Extreme Programming (XP)
- Feature-Driven Development (FDD)
- Test-Driven Development (TDD)

### 4. プロダクト & エンタープライズ (`product-and-enterprise/`)

ビジネス価値の創出と組織規模での設計に関するガイドです。
- Minimum Viable Product (MVP)
- TOGAF Certification (Enterprise Architecture)

### 5. 一般・デザインシステム

- 総合ガイド (`general/comprehensive-guide/`)
- CSS デザインシステムガイド (`css-design-system-guide/`)

## メンテナンス

このプロジェクトでは、ドキュメントの品質を維持するために自動化ツールを使用しています。

### リンクチェック

Markdownファイル内の外部リンクが有効であることを確認するために、`markdown-link-check` を使用しています。

```bash
# Bunを使用してリンクチェックを実行
bun run check-links
```

### リンティング

Markdownのスタイルを統一するために `markdownlint` を使用しています（設定ファイル: `.markdownlint.json`）。

## ライセンス

本プロジェクトは個人学習用の資料です。掲載されている情報の利用により生じた、いかなる損害についても一切の責任を負いません。内容の正確性、完全性、最新性については、利用者自身で確認した上で利用してください。
