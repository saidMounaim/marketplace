"use server";

import { auth } from "@/auth";
import { ERROR_MESSAGES } from "../errorMessages";

export async function getAds(query?: string, category?: string) {
  const queryString = new URLSearchParams({
    ...(query && { query }),
    ...(category && { category }),
  }).toString();

  const response = await fetch(`${process.env.API_URL}/ads?${queryString}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_ADS);
  }
  return response.json();
}

export async function getSingleAd(slug: string) {
  const response = await fetch(`${process.env.API_URL}/ads/${slug.toString()}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_AD_DETAILS);
  }
  return response.json();
}

export async function addAd(values: FormData) {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}/ads`, {
      method: "POST",
      body: values,
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.ADD_AD);
    }
    return response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ADD_AD);
  }
}
export async function deleteAd(adId: string) {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}/ads/${adId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.DELETE_AD);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(ERROR_MESSAGES.DELETE_AD);
  }
}
