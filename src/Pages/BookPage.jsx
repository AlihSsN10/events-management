import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketSeaarch from "@/Component/TicketSeaarch";
import img from "@/assets/_.jpg";
import { Button } from "@/components/ui/button";
import { HeartIcon, TicketIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// مكون فرعي لعمل الهايلايت
const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;

  // التحقق مما إذا كان النص يبدأ بكلمة البحث
  const regex = new RegExp(`^(${highlight})`, "i");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-teal-800 text-black rounded-sm">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default function BookPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const tickets = [
    { id: 1, name: "Music Festival", description: "Enjoy the best music" },
    { id: 2, name: "Tech Conference", description: "Latest in technology" },
    { id: 3, name: "Art Workshop", description: "Learn to paint" },
    { id: 4, name: "Movie Night", description: "Watch latest films" },
  ];

  // منطق البحث: يبدأ بـ (Starts With)
  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex justify-center">
        <TicketSeaarch value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="w-full md:w-[45%] lg:w-[23%] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              <img
                className="w-full object-cover h-48"
                src={img}
                alt={ticket.name}
              />
              <CardHeader>
                <CardTitle className="text-xl">
                  {/* استخدام مكون الهايلايت هنا */}
                  <HighlightText text={ticket.name} highlight={searchTerm} />
                </CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-teal-900">100 EGP</p>
              </CardContent>
            </div>

            <CardFooter className="flex items-center gap-4 pb-6 px-4">
              {/* استخدمنا flex-grow عشان الزرار ياخد المساحة المتاحة ويسيب مكان للقلب */}
              <Button
                onClick={() => toast.success("Added to cart Successfully")}
                className="grow bg-teal-800 cursor-pointer hover:bg-teal-700 text-white text-xs"
              >
                <TicketIcon className="mr-1 h-4 w-4" />
                Add to booking
              </Button>

              {/* القلب هنا محمي بـ div عشان نتحكم في حجمه وسهولة الضغط عليه */}
              <div className="shrink-0">
                <HeartIcon
                  onClick={(e) => {
                    e.stopPropagation(); // منع انتقال الحدث للكارت
                    toast.success("Added to wish list successfully", {
                      duration: 2000,
                      position: "top-center",
                    });
                  }}
                  // أضفنا حجم ثابت للقلب (w-6 h-6) ولون رمادي افتراضي عشان يظهر
                  className="w-6 h-6 cursor-pointer text-gray-400 hover:text-red-500 hover:scale-110 transition-all active:scale-90"
                />
              </div>
            </CardFooter>
          </Card>
        ))}

        {filteredTickets.length === 0 && (
          <p className="text-center text-gray-500 w-full mt-10 font-semibold">
            THIS TICKET IS NOT AVAILABLE
          </p>
        )}
      </div>
    </div>
  );
}
