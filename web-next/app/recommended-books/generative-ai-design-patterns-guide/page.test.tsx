import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("generative-ai-design-patterns-guide page contract", () => {
  it("h1 見出しが原本と完全一致する", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "Generative AI Design Patterns 徹底解説：初学者のための生成AI設計パターン実践ガイド"
    );
  });

  it("h2 セクション見出しが 17 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(17);
  });

  it("17 個の主要セクションが原本と完全一致する id と順序を持つ", () => {
    const { container } = render(<Page />);
    const h2s = container.querySelectorAll("h2[id]");
    const ids = Array.from(h2s).map((h) => h.id);
    expect(ids).toEqual([
      "はじめにこのガイドについて",
      "part0",
      "part1",
      "part2",
      "part3",
      "part4",
      "part5",
      "part6",
      "part7",
      "part8",
      "part9",
      "part10",
      "part11",
      "roadmap",
      "checklist",
      "glossary",
      "references",
    ]);
  });

  it("目次で参照される 66 個すべての ID が本文内に存在する", () => {
    const { container } = render(<Page />);
    const expectedIds = [
      "はじめにこのガイドについて",
      "part0",
      "01-なぜ設計パターンという考え方が必要なのか",
      "02-基盤モデルの上に築くという発想",
      "03-エージェンティックaiとは何か",
      "04-本ガイドの構成と使い方",
      "part1",
      "11-プロンプトとコンテキスト",
      "12-きめ細かい制御デコーディングパラメータ",
      "13-インコンテキスト学習zero-shot-と-few-shot",
      "14-ポストトレーニングとファインチューニング",
      "part2",
      "パターン1-logits-maskingロジットマスキング",
      "パターン2-grammar文法制約デコーディング",
      "パターン3-style-transferスタイル変換",
      "パターン4-reverse-neutralization逆中立化",
      "パターン5-content-optimizationコンテンツ最適化",
      "part3",
      "パターン6-basic-rag基本的な検索拡張生成",
      "パターン7-semantic-indexingセマンティックインデキシング",
      "パターン8-indexing-at-scale大規模インデキシング",
      "part4",
      "パターン9-index-aware-retrievalインデックス認識型検索",
      "パターン10-node-postprocessingノード後処理",
      "パターン11-trustworthy-generation信頼できる生成",
      "パターン12-deep-searchディープサーチ",
      "part5",
      "51-llm推論の限界既知の能力と未知の能力",
      "パターン13-chain-of-thought思考の連鎖cot",
      "パターン14-tree-of-thoughts思考の木tot",
      "パターン15-adapter-tuningアダプタチューニング",
      "パターン16-evol-instruct進化的指示データ生成",
      "part6",
      "パターン17-llm-as-judgellmを評価者として使う",
      "パターン18-reflection内省自己反省",
      "パターン19-dependency-injection依存性注入",
      "パターン20-prompt-optimizationプロンプト最適化",
      "part7",
      "パターン21-tool-callingツール呼び出しfunction-calling",
      "パターン22-code-executionコード実行",
      "パターン23-multiagent-collaborationマルチエージェント協調",
      "part8",
      "パターン24-small-language-model小規模言語モデルslm",
      "パターン25-prompt-cachingプロンプトキャッシュ",
      "パターン26-inference-optimization推論最適化",
      "パターン27-degradation-testing劣化テスト",
      "パターン28-long-term-memory長期記憶",
      "part9",
      "パターン29-template-generationテンプレート生成",
      "パターン30-assembled-reformat組み立て型再フォーマット",
      "パターン31-self-check自己検証",
      "パターン32-guardrailsガードレール",
      "part10",
      "101-システムアーキテクチャの考え方",
      "102-デプロイメントの観点",
      "part11",
      "111-model-context-protocolmcpの標準化と業界ガバナンス移行",
      "112-コンテキストエンジニアリングとプロンプトキャッシュ経済学の転換",
      "113-小規模言語モデルslmによるハイブリッド構成の定着",
      "114-llm-as-judgeパターン17の成熟とバイアス対策の体系化",
      "115-ガードレールパターン32のインフラ化",
      "116-業界標準を形作るその他の代表的リソース",
      "roadmap",
      "checklist",
      "glossary",
      "references",
    ];

    for (const id of expectedIds) {
      const element = container.querySelector(`[id="${id}"]`);
      expect(element, `ID "${id}" should exist in document`).not.toBeNull();
    }
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(16);
    for (const a of external) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンクに .html を含む旧 URL がない", () => {
    const { container } = render(<Page />);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("Mermaid 図 23 個・table 5 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(23);
    expect(container.querySelectorAll("table")).toHaveLength(5);
  });

  it("globals.css に .generative-ai-design-patterns-guide のスコープ定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".generative-ai-design-patterns-guide");
    expect(cssContent).toContain("--bg: #07111e");
    expect(cssContent).toContain("--card: #0f1e33");
  });
});
