"use server";

export async function getAds() {
  const response = await fetch(`${process.env.API_URL}/ads`);
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
