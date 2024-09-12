"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getLoggedIn } from "@/lib/actions/user.actions";
import { getInitials } from "@/lib/utils";
import AdCard from "@/components/shared/AdCard";

const ProfileDetails = () => {
  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getLoggedIn(),
  });

  if (isLoading) return;
  if (error) return;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="flex gap-20">
        <div className="w-80">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback>{getInitials(userInfo.name)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userInfo.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">My Ads</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {userInfo.ads.map((ad: any) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
