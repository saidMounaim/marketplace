import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export interface AdProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: ImagesProps[];
}

interface ImagesProps {
  id: string;
  url: string;
}

const AdCard = ({ ad }: { ad: AdProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[380px]">
      <div className="w-[380px] h-[200px] relative">
        {ad.images.slice(0, 1).map((img: ImagesProps) => (
          <Image
            key={img.id}
            src={img.url}
            alt={ad.title}
            fill
            className="object-cover object-top"
          />
        ))}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
        <p className="text-gray-600 mb-2">{ad.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">
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
