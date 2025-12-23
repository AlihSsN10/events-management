import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

// 1. Zod Schema for English Validation
const reviewSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  comment: z.string().min(10, "Comment must be at least 10 characters long"),
});

// Mock data in English
const dummyReviews = [
  { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", comment: "An amazing experience and very professional event organization!", initial: "AM" },
  { id: 2, name: "Sara Mahmoud", email: "sara@example.com", comment: "The workshop was extremely useful and the venue was comfortable.", initial: "SM" },
  { id: 3, name: "Yassin Ali", email: "yassin@example.com", comment: "Easy booking process and very helpful customer support.", initial: "YA" },
  { id: 4, name: "Laila Hassan", email: "laila@example.com", comment: "The best platform for booking events in Egypt.", initial: "LH" },
];

export default function ReviewsPage() {

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { email: "", comment: "" },
  });

  function onSubmit(values) {
    console.log("Submitted Review:", values);
    toast.success("Thank you for your review!");
    form.reset();
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4 space-y-16">
        
        {/* Section 1: Review Form */}
        <section className="max-w-2xl mx-auto">
          <Card className="border-teal-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-teal-800 text-center">Share Your Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Comment</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your review about our services here..." 
                            className="resize-none min-h-30" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-teal-800 hover:bg-teal-700">
                    Submit Review
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Previous Reviews Carousel */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-teal-900 mb-8">What Our Customers Say</h2>
          <div className="px-12"> {/* Space for arrows */}
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {dummyReviews.map((rev) => (
                  <CarouselItem key={rev.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-none bg-teal-50/50 shadow-sm">
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-16 w-16 border-2 border-teal-600">
                          <AvatarFallback className="bg-teal-700 text-white">{rev.initial}</AvatarFallback>
                        </Avatar>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic text-sm">"{rev.comment}"</p>
                        <div className="mt-auto">
                          <h4 className="font-bold text-teal-900">{rev.name}</h4>
                          <span className="text-xs text-gray-500">{rev.email}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-teal-800 border-teal-200" />
              <CarouselNext className="text-teal-800 border-teal-200" />
            </Carousel>
          </div>
        </section>

      </div>
    </>
  );
}