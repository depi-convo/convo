// API utility for backend auth endpoints
const API_BASE = "http://localhost:5000/api";

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login failed");
  return await res.json();
}

export async function signupUser({ fullName, email, password }) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ fullName, email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Signup failed");
  return await res.json();
}
