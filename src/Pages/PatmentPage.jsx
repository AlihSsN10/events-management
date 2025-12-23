import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-teal-900 mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="space-y-4">
          <Label>Cardholder Name</Label>
          <Input placeholder="John Doe" />
          <Label>Card Number</Label>
          <div className="relative">
            <Input placeholder="0000 0000 0000 0000" />
            <CreditCard className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Expiry Date</Label><Input placeholder="MM/YY" /></div>
            <div><Label>CVV</Label><Input placeholder="123" /></div>
          </div>
          <Button className="w-full bg-teal-800 py-6 mt-4"> <Lock className="mr-2" size={16}/> Pay Securely </Button>
        </div>

        {/* Order Summary */}
        <Card className="bg-gray-50 border-none shadow-sm h-fit">
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Music Festival (x1)</span><span>250 EGP</span></div>
            <div className="flex justify-between"><span>Service Fee</span><span>20 EGP</span></div>
            <hr />
            <div className="flex justify-between font-bold text-teal-900 text-xl"><span>Total</span><span>270 EGP</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}