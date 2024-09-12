import { Leaf } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import UserDropdown from "./UserDropdown";

const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-white text-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Leaf className="h-8 w-8" />
          <span className="text-2xl font-bold">Marketplace</span>
        </Link>
        <div className="flex space-x-2">
          {!session ? (
            <>
              <Button
                className="text-white bg-green-600 hover:bg-green-600"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button className="text-white bg-green-600 hover:bg-green-600">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="flex gap-3 items-center">
              <Button
                asChild
                className="text-white bg-green-600 hover:bg-green-600"
              >
                <Link href="/ad/create">Post Ad</Link>
              </Button>
              <UserDropdown
                name={session?.user?.name as string}
                email={session?.user?.email as string}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
