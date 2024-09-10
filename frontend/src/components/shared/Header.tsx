import { Leaf } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white text-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Leaf className="h-8 w-8" />
          <span className="text-2xl font-bold">Marketplace</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="#" className="hover:underline">
            Home
          </Link>
          <Link href="#" className="hover:underline">
            About
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Button className="text-white bg-green-600 hover:bg-green-600">
            Sign In
          </Button>
          <Button className="text-white bg-green-600 hover:bg-green-600">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
