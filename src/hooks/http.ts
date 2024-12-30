console.log(process.env.NODE_ENV)
const isDevelopement = process.env.NODE_ENV === "development";
export const baseURL = isDevelopement
  ? "https://localhost:3006/api/v1"
  : "https://174.138.123.193:3006/api/v1";
// export const baseURL = "http://174.138.123.193:3006/api/v1";
