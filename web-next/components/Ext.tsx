type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * 外部リンク用のヘルパー。常に `target="_blank"` と
 * `rel="noopener noreferrer"` を付与してタブナッピングを防ぐ。
 */
export function Ext({ href, children, className }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
