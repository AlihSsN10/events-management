import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ChevronLeft } from "lucide-react";
import img from "@/assets/_.jpg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function TicketDetails() {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
     <Link to="/booking" >
      <Button variant="ghost" className="mb-4 text-teal-700"> <ChevronLeft /> Back to Events </Button>
     </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img src={img} className="rounded-3xl shadow-xl h-100 w-full object-cover" alt="Event" />
        
        <div className="space-y-6">
          <Badge className="bg-teal-100 text-teal-800">Music & Arts</Badge>
          <h1 className="text-4xl font-bold text-teal-950">Grand Music Festival 2025</h1>
          
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2"><Calendar size={18}/> June 15, 2025</div>
            <div className="flex items-center gap-2"><Clock size={18}/> 07:00 PM - 11:00 PM</div>
            <div className="flex items-center gap-2"><MapPin size={18}/> Cairo Opera House, Egypt</div>
            <div className="flex items-center gap-2"><Users size={18}/> 500 Seats Available</div>
          </div>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <p className="text-sm text-teal-700">Ticket Price</p>
            <p className="text-3xl font-bold text-teal-900">250 EGP</p>
          </div>

          <Button 
            onClick={() => toast.success("Added to Booking")} 
            className="w-full bg-teal-800 hover:bg-teal-700 py-6 text-lg"
          >
            Book My Spot Now
          </Button>
        </div>
      </div>
    </div>
  );
}