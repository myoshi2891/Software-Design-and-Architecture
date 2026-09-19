import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GenerativeAiDesignPatternsSidebar, {
  type NavGroup,
} from "./GenerativeAiDesignPatternsSidebar";

const testGroups: readonly NavGroup[] = [
  {
    title: "基礎知識",
    items: [
      { id: "part0", label: "第0部: 生成AIエンジニアリングの基礎知識" },
      { id: "part1", label: "第1部: 生成AIモデルの基本制御" },
    ],
  },
  {
    title: "パターン解説",
    items: [
      { id: "part2", label: "第2部: 出力の制御" },
      { id: "part3", label: "第3部: 知識の追加①基礎編" },
    ],
  },
];

describe("GenerativeAiDesignPatternsSidebar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("すべてのナビゲーション項目を描画する", () => {
    render(<GenerativeAiDesignPatternsSidebar groups={testGroups} />);
    expect(screen.getByText("第0部: 生成AIエンジニアリングの基礎知識")).toBeInTheDocument();
    expect(screen.getByText("第1部: 生成AIモデルの基本制御")).toBeInTheDocument();
    expect(screen.getByText("第2部: 出力の制御")).toBeInTheDocument();
    expect(screen.getByText("第3部: 知識の追加①基礎編")).toBeInTheDocument();
  });

  it("モバイルトグルボタンでサイドバーの開閉状態を切り替える", () => {
    render(<GenerativeAiDesignPatternsSidebar groups={testGroups} />);
    const toggleButton = screen.getByRole("button", { name: /メニュー/i });
    const sidebar = screen.getByRole("navigation");

    expect(sidebar.classList.contains("open")).toBe(false);

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(true);

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(false);
  });

  it("リンククリック時にサイドバーを閉じる", () => {
    render(<GenerativeAiDesignPatternsSidebar groups={testGroups} />);
    const toggleButton = screen.getByRole("button", { name: /メニュー/i });
    const sidebar = screen.getByRole("navigation");

    fireEvent.click(toggleButton);
    expect(sidebar.classList.contains("open")).toBe(true);

    const firstLink = screen.getByText("第0部: 生成AIエンジニアリングの基礎知識");
    fireEvent.click(firstLink);
    expect(sidebar.classList.contains("open")).toBe(false);
  });
});
