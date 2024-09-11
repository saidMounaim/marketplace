import { auth } from "@/auth";
import SignInForm from "./SignInForm";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return <SignInForm />;
};

export default SignInPage;
