// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MultiAgentSidebar, { type NavH2Item } from "./MultiAgentSidebar";

const testItems: readonly NavH2Item[] = [
  { id: "top", label: "はじめに", isSolo: true },
  { id: "本ガイドについて", label: "本ガイドについて" },
  {
    id: "第0部-前提知識--llmエージェントとは何か",
    label: "第0部　前提知識 — LLMエージェントとは何か",
    subItems: [
      { id: "01-llmエージェントの基本ループ", label: "0.1 LLMエージェントの基本ループ" },
      { id: "02-単一エージェントの限界", label: "0.2 単一エージェントの限界" },
    ],
  },
  {
    id: "第1部-なぜマルチエージェントなのか--効果とコストそして反論",
    label: "第1部　なぜマルチエージェントなのか — 効果とコスト、そして反論",
  },
  {
    id: "第2部-基本設計パターン9種",
    label: "第2部　基本設計パターン9種",
  },
];

describe("MultiAgentSidebar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("すべてのナビゲーション項目を描画する", () => {
    render(<MultiAgentSidebar items={testItems} />);
    expect(screen.getByText("はじめに")).toBeInTheDocument();
    expect(screen.getByText("本ガイドについて")).toBeInTheDocument();
    expect(screen.getByText(/第0部.*前提知識/)).toBeInTheDocument();
    expect(screen.getByText("0.1 LLMエージェントの基本ループ")).toBeInTheDocument();
    expect(screen.getByText("0.2 単一エージェントの限界")).toBeInTheDocument();
    expect(screen.getByText(/第1部.*なぜマルチエージェントなのか/)).toBeInTheDocument();
    expect(screen.getByText(/第2部.*基本設計パターン9種/)).toBeInTheDocument();
  });

  it("モバイルトグルボタンでサイドバーの開閉状態を切り替える", () => {
    render(<MultiAgentSidebar items={testItems} />);
    const toggleButton = screen.getByRole("button", { name: /メニュー/i });
    const sidebar = screen.getByRole("navigation");

    expect(sidebar.classList.contains("open")).toBe(false);

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(true);

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(false);
  });

  it("リンククリック時にサイドバーを閉じる", () => {
    render(<MultiAgentSidebar items={testItems} />);
    const toggleButton = screen.getByRole("button", { name: /メニュー/i });
    const sidebar = screen.getByRole("navigation");

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(true);

    const firstLink = screen.getByText("はじめに");
    fireEvent.click(firstLink);
    expect(sidebar.classList.contains("open")).toBe(false);
  });
});
