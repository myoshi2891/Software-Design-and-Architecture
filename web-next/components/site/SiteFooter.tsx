import Link from "next/link";

/**
 * サイト共通フッター。公開デプロイに必要な著作権・商標・非提携の表記と、
 * サードパーティライセンス一覧へのリンクを全ページに表示する。
 */
export function SiteFooter() {
  return (
    <footer className="site-footer" lang="ja">
      <p className="site-footer-copy">© 2026 myoshi2891. All rights reserved.</p>
      <p>
        本サイトの文章・図は作成者による独自の解説です。引用・参考文献の著作権は各権利者に帰属します。
      </p>
      <p>
        本サイトは各書籍・規格・資格の公式資料ではなく、著者・出版社・認定団体とは一切関係ありません。
        記載の会社名・製品名・資格名は各社の商標または登録商標です。
      </p>
      <p>
        <Link href="/licenses">サードパーティライセンス</Link>
      </p>
    </footer>
  );
}
