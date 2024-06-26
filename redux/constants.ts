export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://health-planet.vercel.app/api"
    : "https://health-planet.vercel.app/api";
