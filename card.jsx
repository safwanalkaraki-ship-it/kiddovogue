export function Card({ children, ...props }) {
  return (
    <div {...props} className={`border rounded shadow-sm ${props.className || ''}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div {...props} className={`p-4 ${props.className || ''}`}>
      {children}
    </div>
  );
}
