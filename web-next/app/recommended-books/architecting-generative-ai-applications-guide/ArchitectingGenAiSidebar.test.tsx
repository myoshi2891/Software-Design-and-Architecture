import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ArchitectingGenAiSidebar, { type NavGroup } from "./ArchitectingGenAiSidebar";

const testGroups: readonly NavGroup[] = [
  {
    title: "導入・全体像",
    items: [
      { id: "part0", label: "第0部：プロトタイプと本番運用の違い" },
      { id: "part1", label: "第1部：プロトタイプを構築する" },
    ],
  },
  {
    title: "評価・アーキテクチャ",
    items: [
      { id: "part2", label: "第2部：生成AIを評価する" },
      { id: "part3", label: "第3部：主要アーキテクチャ" },
    ],
  },
];

describe("ArchitectingGenAiSidebar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("すべてのナビゲーション項目を描画する", () => {
    render(<ArchitectingGenAiSidebar groups={testGroups} />);
    expect(screen.getByText("第0部：プロトタイプと本番運用の違い")).toBeInTheDocument();
    expect(screen.getByText("第1部：プロトタイプを構築する")).toBeInTheDocument();
    expect(screen.getByText("第2部：生成AIを評価する")).toBeInTheDocument();
    expect(screen.getByText("第3部：主要アーキテクチャ")).toBeInTheDocument();
  });

  it("モバイルトグルボタンでサイドバーの開閉状態を切り替える", () => {
    render(<ArchitectingGenAiSidebar groups={testGroups} />);
    const toggleButton = screen.getByRole("button", { name: /メニュー/i });
    const sidebar = screen.getByRole("navigation");

    expect(sidebar.classList.contains("open")).toBe(false);

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(true);

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(false);
  });

  it("リンククリック時にサイドバーを閉じる", () => {
    render(<ArchitectingGenAiSidebar groups={testGroups} />);
    const toggleButton = screen.getByRole("button", { name: /メニュー/i });
    const sidebar = screen.getByRole("navigation");

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(true);

    const firstLink = screen.getByText("第0部：プロトタイプと本番運用の違い");
    fireEvent.click(firstLink);
    expect(sidebar.classList.contains("open")).toBe(false);
  });
});
