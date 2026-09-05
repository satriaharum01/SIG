import { useState } from "react";

export function useAuth() {
  // LOAD FROM DATABASE/API: data user login.
  const [user] = useState({ name: "", email: "", avatar: "" });
  return { user };
}
