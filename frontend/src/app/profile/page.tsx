import { auth } from "@/auth";
import ProfileDetails from "./ProfileDetails";
import { redirect } from "next/navigation";

const MyProfilePage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return <ProfileDetails />;
};

export default MyProfilePage;
