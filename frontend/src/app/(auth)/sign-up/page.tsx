import { auth } from "@/auth";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return <SignUpForm />;
};

export default SignUpPage;
