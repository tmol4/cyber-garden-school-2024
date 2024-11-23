export const API_ENDPOINT = import.meta.env.DEV
  ? new URL("http://localhost:5000")
  : new URL("http://93.183.80.138:8080")
