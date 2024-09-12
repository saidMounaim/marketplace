"use server";

import { auth } from "@/auth";
import { ERROR_MESSAGES } from "../errorMessages";
import { SignUpValues } from "../validator";

export async function registerUser(values: SignUpValues) {
  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/JSON" },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.REGISTER_USER);
  }

  return response.json();
}

export async function getLoggedIn() {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}/auth/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.GET_LOGGED_IN);
    }
    return response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.GET_LOGGED_IN);
  }
}
