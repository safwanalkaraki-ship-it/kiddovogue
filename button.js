
import React from 'react';

export function Button({ children, onClick, className = '', size = 'md', variant = 'default' }) {
  return (
    <button onClick={onClick} className={`p-2 rounded ${className}`}>
      {children}
    </button>
  );
}
