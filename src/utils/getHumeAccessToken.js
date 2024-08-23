// import "server-only";
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
  const accessToken = await fetchAccessToken({
    apiKey: "AhkdUj5mjSFzY9oQWwXMivX7AkiGiUyZwcuEveG7gXQvBwLL",
    secretKey:
      "CWkJKjUmchCzmxraEBnHaxWLTlTEUB1yXXNY8GgxeKBO0wNiQrsW2yhx8yKZJq2J",
  });
  if (accessToken === "undefined") {
    return null;
  }

  return accessToken ?? null;
};
