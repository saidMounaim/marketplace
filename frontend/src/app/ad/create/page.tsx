import { auth } from "@/auth";
import AdForm from "@/components/shared/AdForm";
import { redirect } from "next/navigation";
import React from "react";

const AddAdPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return <AdForm />;
};

export default AddAdPage;
