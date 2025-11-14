/**
 * Card Component
 * Composant de carte réutilisable avec support de footer et header
 */
export function Card({
  children,
  className = '',
  header = null,
  footer = null,
  hover = false,
}) {
  const hoverClass = hover ? 'hover:border-green-500/50 hover:shadow-lg transition-all hover:-translate-y-1' : '';

  return (
    <div
      className={`bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 ${hoverClass} ${className}`}
    >
      {header && <div className="border-b border-gray-700 p-4">{header}</div>}
      <div className="p-6">{children}</div>
      {footer && <div className="border-t border-gray-700 p-4">{footer}</div>}
    </div>
  );
}
