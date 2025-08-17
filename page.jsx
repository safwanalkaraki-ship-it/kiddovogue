'use client';
import React, { useState } from "react";

const products = [
  { id: 1, name: "Stylish Romper", price: 89, image: "/products/product-1.jpg" },
  { id: 2, name: "Floral Dress", price: 109, image: "/products/product-2.jpg" },
  { id: 3, name: "Casual Overalls", price: 95, image: "/products/product-3.jpg" },
  { id: 4, name: "Classic Tee & Shorts", price: 75, image: "/products/product-4.jpg" },
];

export default function ProductsPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    const message = cart
      .map((item) => `${item.name} × ${item.quantity} = SAR ${item.price * item.quantity}`)
      .join("\n");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const whatsappMessage = encodeURIComponent(
      `Hello, I'd like to place an order from KiddoVogue:\n\n${message}\n\nTotal: SAR ${total}`
    );
    window.open(`https://wa.me/966500000000?text=${whatsappMessage}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>KiddoVogue - Children's Clothing</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #eee', padding: 10, width: 200 }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>SAR {product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Cart</h2>
          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
            </p>
          ))}
          <button onClick={handleCheckout} style={{ marginTop: 10 }}>
            Checkout via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
