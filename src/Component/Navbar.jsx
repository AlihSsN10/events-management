import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeartIcon, TicketCheck, User2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-50 py-3 bg-teal-700 text-4xl text-gray-900 font-semibold">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4">
            <h1>
              {" "}
              <Link to="/">  <h2 className="text-2xl font-bold text-white tracking-tight">
              EM-<span className="text-gray-950">Booking</span>
            </h2></Link>{" "}
            </h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
               
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/booking">Booking</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/reviews">Reviews</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <User2Icon />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {" "}
                    <Link to="login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="logout">LogOut</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="signup">SignUp</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className=" relative">
                <Link to="cart">
                  <TicketCheck className="ml-4" />
                </Link>

                <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute -top-3 -end-2 bg-teal-950">
                  0
                </Badge>
              </div>
              <div className=" relative">
                <Link to="wishlist">
                  <HeartIcon className="ml-4" />
                </Link>

                <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute -top-3 -end-2 bg-teal-950">
                  0
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
