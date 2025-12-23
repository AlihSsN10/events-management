import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/schemas/loginSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log("بيانات الدخول:", values);
    
    // هنا يتم التحقق من البيانات مع الـ API
    // في حال النجاح، نتوجه لصفحة الهوم أو الـ Profile
  if (values.email === "admin@test.com") {
    toast.success("successfully logged in!");
    navigate("/");
  } else {
    toast.error("Invalid email or password");
  }
 
  }

  return (
   <>
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <Card className="w-full max-w-sm shadow-lg border-teal-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-teal-800">Login</CardTitle>
          <CardDescription> Welcome to EM-Booking</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                       <FormLabel>Password</FormLabel>
                       
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-teal-800 hover:bg-teal-700">
               Login
              </Button>

              <div className="text-center text-sm mt-4 text-gray-600">
               Don't have an account?{" "}
                <button 
                  onClick={() => navigate("/signup")} 
                  className="text-teal-700 font-bold hover:underline"
                >
                  SignUp
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
   </>
  );
}