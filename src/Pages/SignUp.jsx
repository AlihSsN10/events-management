import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/authSchema"; // استيراد الاسكيمه

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();
  // 1. تعريف الفورم
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  // 2. وظيفة الإرسال (Submit)
  function onSubmit(values) {
    console.log("UserData", values);
    // هنا يتم إرسال البيانات للـ API الخاص بكِ
      toast.success("account created successfully!");
    navigate("/login");
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md shadow-lg border-teal-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-teal-800">
              Create an Account
            </CardTitle>
            <CardDescription>
              Register now to book tickets for the upcoming event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 text-right"
              >
                {/* حقل الاسم */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* حقل البريد الإلكتروني */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* حقل الهاتف */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="01xxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* حقل كلمة المرور */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* تأكيد كلمة المرور */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RePassword</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-teal-800 hover:bg-teal-700 mt-6"
                >
                Register
                </Button>
                  <div className="text-center text-sm mt-4 text-gray-600">
              Already you have an account..?{" "}
                <button 
                  onClick={() => navigate("/login")} 
                  className="text-teal-700 font-bold hover:underline"
                >
                Login
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
