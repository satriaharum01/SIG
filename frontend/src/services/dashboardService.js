import api from "./api";

// LOAD FROM DATABASE: seluruh data dashboard.
export async function getDashboard() {
  const response = await api.get("/dashboard");
  return response.data;
}
