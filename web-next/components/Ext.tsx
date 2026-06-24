type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Renders an external link.
 *
 * @param href - The link destination URL.
 * @param children - The content rendered inside the anchor.
 * @param className - CSS class names applied to the anchor.
 */
export function Ext({ href, children, className }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
