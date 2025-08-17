export function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`rounded px-4 py-2 text-sm font-medium ${className}`}>
      {children}
    </button>
  );
}