import type { Metadata, Viewport } from "next";
import { DisclaimerBanner } from "@/components/site/DisclaimerBanner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { jetbrainsMono, notoSansJp } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT業界 主流設計手法・駆動開発 完全ガイド",
  description:
    "TDD / BDD / DDD / EDA / Clean Architecture / Microservices など主要手法を初学者からシニアエンジニアまで対応した詳細解説。国際資格ガイド付き。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * アプリ全体のルートレイアウト。`<html lang="ja">` にフォント変数を適用する。
 *
 * @param children - body 内に描画する React ノード
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${jetbrainsMono.variable}`}>
      <body className="has-common-header">
        <SiteHeader />
        <DisclaimerBanner />
        {children}
      </body>
    </html>
  );
}
