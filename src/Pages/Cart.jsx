import React, { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function CartPage() {
  // بيانات ستاتيك قابلة للتعديل
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Music Festival",
      price: 250,
      qty: 1,
      img: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Art Workshop",
      price: 150,
      qty: 2,
      img: "https://via.placeholder.com/80",
    },
  ]);

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="container mx-auto p-6 max-w-5xl min-h-[70vh]">
      <h1 className="text-3xl font-bold text-teal-950 mb-8 flex items-center gap-2">
        <ShoppingBag className="text-teal-700" /> Your Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-2xl bg-white shadow-sm"
              >
                <img
                  src={item.img}
                  className="w-20 h-20 rounded-xl object-cover"
                  alt={item.name}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-teal-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.price} EGP</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border rounded-lg bg-teal-50 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQty(item.id, -1)}
                    className="h-8 w-8 text-teal-700"
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.qty}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQty(item.id, 1)}
                    className="h-8 w-8 text-teal-700"
                  >
                    <Plus size={14} />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-teal-50/50 p-6 rounded-3xl border border-teal-100 h-fit space-y-4">
            <h3 className="text-xl font-bold text-teal-900">Summary</h3>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{subtotal} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>20 EGP</span>
            </div>
            <Separator className="bg-teal-200" />
            <div className="flex justify-between text-xl font-bold text-teal-950">
              <span>Total</span>
              <span>{subtotal + 20} EGP</span>
            </div>
            <Button className="w-full bg-teal-800 hover:bg-teal-700 py-6 text-lg rounded-xl mt-4">
              Checkout Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-400">Your cart is empty</p>
          <Link
            to="/booking"
           
          >
            <Button variant="ghost" className="mt-6 text-teal-700 hover:bg-teal-50 rounded-xl">
              Go back to booking
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
