const API_URL = "http://localhost:5000/api";

/* =========================
   NAVBAR AUTH STATE
========================= */
async function updateNavbarAuth() {
  const loginBtn = document.getElementById("btn-login");
  const dashboardBtn = document.getElementById("btn-dashboard");

  if (!loginBtn) return;

  try {
    const res = await fetch(`${API_URL}/user/me`, {
      credentials: "include"
    });

    if (!res.ok) throw new Error("Not logged in");

    // Logged in
    loginBtn.classList.add("hidden");
    if (dashboardBtn) dashboardBtn.classList.remove("hidden");

  } catch {
    // Not logged in
    loginBtn.classList.remove("hidden");
    if (dashboardBtn) dashboardBtn.classList.add("hidden");
  }
}

updateNavbarAuth();
