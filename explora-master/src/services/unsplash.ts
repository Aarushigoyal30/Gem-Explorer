const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const BASE_URL = "https://api.unsplash.com/search/photos";

export async function fetchPlaceImages(query: string) {
  const res = await fetch(
    `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=12`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    }
  );

  const data = await res.json();
  return data.results;
}