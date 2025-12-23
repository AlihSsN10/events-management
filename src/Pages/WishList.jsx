import React, { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [items, setItems] = useState([
    { id: 1, name: "Tech Conference 2025", price: 500, img: "https://via.placeholder.com/300" },
    { id: 2, name: "Movie Night", price: 100, img: "https://via.placeholder.com/300" },
  ]);

  const remove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success("Removed from wishlist");
  };

  const moveToCart = (name) => {
    toast.success(`Moved ${name} to cart!`);
  };

  return (
    <div className="container mx-auto p-6 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-teal-950 mb-8 flex items-center gap-2">
        <Heart className="fill-red-500 text-red-500" /> Wishlist
      </h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative border rounded-3xl overflow-hidden bg-white hover:shadow-xl transition-all">
              <img src={item.img} className="w-full h-48 object-cover" alt={item.name} />
              
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-xl text-teal-900">{item.name}</h3>
                <p className="text-teal-700 font-semibold">{item.price} EGP</p>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => moveToCart(item.name)}
                    className="flex-1 bg-teal-800 hover:bg-teal-700 rounded-xl"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => remove(item.id)}
                    className="border-red-100 text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="mx-auto h-16 w-16 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Your wishlist is empty</p>
        </div>
      )}
    </div>
  );
}