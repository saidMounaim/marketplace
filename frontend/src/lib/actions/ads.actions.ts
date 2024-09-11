"use server";

export async function getAds(query?: string, category?: string) {
  const queryString = new URLSearchParams({
    ...(query && { query }),
    ...(category && { category }),
  }).toString();

  const response = await fetch(`${process.env.API_URL}/ads?${queryString}`);
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
}

export async function getSingleAd(slug: string) {
  const response = await fetch(`${process.env.API_URL}/ads/${slug.toString()}`);
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
}

export async function addAd(values: FormData) {
  try {
    const response = await fetch(`${process.env.API_URL}/ads`, {
      method: "POST",
      body: values,
    });
    if (!response.ok) {
      throw new Error("Someting went wrong please try again");
    }
    return response.json();
  } catch (error) {
    throw new Error("Someting went wrong please try again");
  }
}
export async function deleteAd(adId: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/ads/${adId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Someting went wrong please try again");
    }
    return response.json();
  } catch (error) {
    throw new Error("Someting went wrong please try again");
  }
}
