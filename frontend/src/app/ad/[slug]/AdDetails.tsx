"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getSingleAd } from "@/lib/actions/ads.actions";
import { notFound } from "next/navigation";
import Image from "next/image";

const AdDetails = ({ slug }: { slug: string }) => {
  const {
    data: ad,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adDetails", slug],
    queryFn: () => getSingleAd(slug),
  });

  if (isLoading) return;

  if (error || !ad) return notFound();

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto px-4 py-12 lg:py-20">
      <div className="flex-1">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">{ad.title}</h1>
          <p className="text-muted-foreground text-lg">{ad.description}</p>
        </div>
        <div>
          <Carousel className="rounded-lg overflow-hidden">
            <CarouselContent>
              {ad.images.map((image: { url: string; id: string }) => (
                <CarouselItem key={image.id}>
                  <Image
                    src={image.url}
                    width={800}
                    height={600}
                    alt={ad.title}
                    className="aspect-[4/3] object-cover object-top"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <Card className="pt-4">
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Details</h2>
              <div className="text-muted-foreground text-sm">
                <p>
                  <span className="font-medium">Category:</span> {ad.category}
                </p>
                <p>
                  <span className="font-medium">Price:</span> $
                  {ad.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Contact</h2>
              <div className="text-muted-foreground text-sm">
                <p>
                  <span className="font-medium">{ad.contact}</span>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Contact Seller
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdDetails;
