"use server";

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
