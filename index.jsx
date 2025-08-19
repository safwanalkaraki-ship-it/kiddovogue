import React, { useState } from "react";
import Head from "next/head";

const products = [
  { id: 1, name: "Stylish Romper", price: 89, image: "/products/product-1.jpg" },
  { id: 2, name: "Floral Dress", price: 109, image: "/products/product-2.jpg" },
  { id: 3, name: "Casual Overalls", price: 95, image: "/products/product-3.jpg" },
  { id: 4, name: "Classic Tee & Shorts", price: 75, image: "/products/product-4.jpg" },
];

export default function Home() {
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

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const handleCheckout = () => {
    const message = cart
      .map(
        (item) => \`\${item.name} × \${item.quantity} = SAR \${item.price * item.quantity}\`
      )
      .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const whatsappMessage = encodeURIComponent(
      \`Hello, I'd like to place an order from KiddoVogue:\n\n\${message}\n\nTotal: SAR \${total}\n\nName: \nAddress: \nPhone:\`
    );

    window.open(\`https://wa.me/966500000000?text=\${whatsappMessage}\`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>KiddoVogue - Children’s Clothing Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">KiddoVogue</h1>
        <nav className="space-x-6 text-sm">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#products" className="hover:underline">Shop</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <a href="#cart" className="text-xl">🛒</a>
      </header>

      <section id="products" className="py-12 px-6 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Children's Clothing</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded hover:shadow-lg transition duration-200">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">SAR {product.price}.00</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="cart" className="py-12 px-6">
        <h3 className="text-2xl font-semibold mb-6 text-center">Shopping Cart</h3>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">SAR {item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border px-2 py-1 text-sm"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="text-sm px-3 py-1 border rounded">Remove</button>
                </div>
              </div>
            ))}
            <div className="text-right mt-6">
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Proceed to Checkout via WhatsApp
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="py-8 px-6 bg-gray-100 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} KiddoVogue. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#faq">FAQ</a>
          <a href="#returns">Returns</a>
          <a href="https://instagram.com/kiddovogue">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
