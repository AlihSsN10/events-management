import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { 
  User, Mail, Phone, Save, History, Lock, 
  ShieldCheck, KeyRound, Ticket, LogOut, Camera 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// 1. Schemas for Validation
const profileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Required"),
  newPassword: z.string().min(6, "At least 6 characters"),
  confirmPassword: z.string().min(6, "Required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Profile() {
  // Forms Initialization
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "Jane Smith", email: "jane.smith@example.com", phone: "01234567890" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onUpdateProfile = (values) => {
    console.log("Profile Data:", values);
    toast.success("Profile updated successfully!");
  };

  const onChangePassword = (values) => {
    console.log("Password Data:", values);
    toast.success("Password changed successfully!");
    passwordForm.reset();
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl min-h-screen pb-20">
      {/* --- Top Header Section --- */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 bg-teal-50/50 p-8 rounded-3xl border border-teal-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-teal-800 text-white text-3xl font-bold">JS</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white hover:bg-teal-700 transition-colors shadow-md">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-teal-950">Jane Smith</h1>
            <p className="text-teal-600">Member since January 2025</p>
          </div>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0 border-red-200 text-red-500 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-teal-100/50 h-14 p-1 rounded-2xl mb-8">
          <TabsTrigger value="personal" className="rounded-xl font-semibold data-[state=active]:bg-white">Personal Info</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl font-semibold data-[state=active]:bg-white">Security</TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl font-semibold data-[state=active]:bg-white">My Bookings</TabsTrigger>
        </TabsList>

        {/* --- Tab 1: Personal Data --- */}
        <TabsContent value="personal">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-teal-900">Personal Information</CardTitle>
              <CardDescription>Update your basic profile details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><div className="relative"><User className="absolute left-3 top-2.5 text-gray-400" size={18}/><Input className="pl-10" {...field}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><div className="relative"><Mail className="absolute left-3 top-2.5 text-gray-400" size={18}/><Input className="pl-10" {...field}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="phone" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><div className="relative"><Phone className="absolute left-3 top-2.5 text-gray-400" size={18}/><Input className="pl-10" {...field}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <Button type="submit" className="bg-teal-800 hover:bg-teal-700 px-10">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Tab 2: Security (Password) --- */}
        <TabsContent value="security">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-teal-900 flex items-center gap-2"><ShieldCheck size={22}/> Security Settings</CardTitle>
              <CardDescription>Secure your account with a strong password.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4 max-w-2xl">
                  <FormField name="currentPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl><div className="relative"><KeyRound className="absolute left-3 top-2.5 text-gray-400" size={18}/><Input type="password" placeholder="••••••••" className="pl-10" {...field}/></div></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField name="newPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl><div className="relative"><Lock className="absolute left-3 top-2.5 text-gray-400" size={18}/><Input type="password" placeholder="••••••••" className="pl-10" {...field}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="confirmPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl><div className="relative"><Lock className="absolute left-3 top-2.5 text-gray-400" size={18}/><Input type="password" placeholder="••••••••" className="pl-10" {...field}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <Button type="submit" className="bg-teal-800 hover:bg-teal-700 mt-4">Update Password</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Tab 3: Booking History --- */}
        <TabsContent value="history">
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-teal-50 rounded-3xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6">
                  <div className="bg-teal-50 p-4 rounded-2xl text-teal-800"><Ticket size={28}/></div>
                  <div>
                    <h4 className="font-bold text-teal-950 text-lg">Event Name Example {i}</h4>
                    <p className="text-sm text-gray-400">June 2{i}, 2025 • Order #EB-9920{i}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold text-teal-900">350 EGP</p>
                    <Badge className="bg-green-100 text-green-700 border-none px-3">Confirmed</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}