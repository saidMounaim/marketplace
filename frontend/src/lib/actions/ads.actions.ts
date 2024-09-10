"use server";

export async function getAds() {
  const response = await fetch(`${process.env.API_URL}/ads`);
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
}
