"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { deleteAd } from "@/lib/actions/ads.actions";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface AdProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: ImagesProps[];
  userId: string;
}

interface ImagesProps {
  id: string;
  url: string;
}

const AdCard = ({ ad }: { ad: AdProps }) => {
  const { data: session } = useSession();
  console.log(typeof session?.user.id, ad.userId);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (confirm("Are you sure?")) {
      const adId = e.target.adId.value;
      try {
        await deleteAd(adId);
        queryClient.invalidateQueries({
          queryKey: ["ads"],
        });
        toast({
          className: "bg-green-500 text-white text-md font-medium",
          title: "Ad was deleted successfully",
        });
      } catch (error) {
        toast({
          className: "bg-red-500 text-white text-md font-medium",
          title: "Something went wrong please try again.",
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[380px] relative">
      {session?.user.id === ad.userId && (
        <form onSubmit={handleDelete} className="absolute top-3 right-3 z-20">
          <input type="hidden" value={ad.id} name="adId" />
          <Button variant="destructive">Delete</Button>
        </form>
      )}
      <div className="w-[380px] h-[200px] relative">
        {ad.images.slice(0, 1).map((img: ImagesProps) => (
          <Image
            key={img.id}
            src={img.url}
            alt={ad.title}
            fill
            className="object-contain object-top"
          />
        ))}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {ad.title.length > 50 ? ad.title.substring(0, 50) + "..." : ad.title}
        </h3>
        <p className="text-gray-700 mb-4">
          {ad.description.length > 150
            ? ad.description.substring(0, 150) + "..."
            : ad.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold text-1xl">
            ${ad.price.toFixed(2)}
          </span>
          <Button className="bg-green-600 hover:bg-green-700" asChild>
            <Link href={`/ad/${ad.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
