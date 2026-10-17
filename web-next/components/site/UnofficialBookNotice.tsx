type Props = {
  title: string;
  author: string;
  publisher: string;
};

/**
 * 書籍ガイド冒頭の注記。非公式の学習ノートであり、著者・出版社と
 * 提携・承認関係にないことを明示し、原著の購入を勧める。
 *
 * @param title - 原著の書名
 * @param author - 原著の著者
 * @param publisher - 原著の出版社
 */
export function UnofficialBookNotice({ title, author, publisher }: Props) {
  return (
    <aside className="unofficial-book-notice" aria-label="非公式ガイドに関する注記">
      本ページは『{title}』（{author} 著、{publisher}
      刊）を読んだ作成者による非公式の学習ノートです。著者・出版社との提携・承認関係はありません。本文は独自の要約・解説であり、原著の代替ではありません。正確な内容は原著をお読みください。
    </aside>
  );
}
