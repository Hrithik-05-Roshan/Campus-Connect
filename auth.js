const API_URL = "http://localhost:5000/api";

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const errorMsg = document.getElementById("errorMsg");

/* ======================
   LOGIN
====================== */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.classList.add("hidden");

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    errorMsg.textContent = data.message;
    errorMsg.classList.remove("hidden");
    return;
  }

  window.location.href = "dashboard.html";
});

/* ======================
   SIGNUP
====================== */
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.classList.add("hidden");

  const body = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    role: role.value,
    institute: institute.value,
    course: course.value,
    branch: branch.value,
    year: year.value,
    semester: semester.value
  };

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (!res.ok) {
    errorMsg.textContent = data.message;
    errorMsg.classList.remove("hidden");
    return;
  }

  window.location.href = "dashboard.html";
});

/* ======================
   TOGGLE UI
====================== */
loginTab.onclick = () => {
  loginTab.classList.add("bg-[#00ff1a]", "text-black");
  signupTab.classList.remove("bg-[#00ff1a]", "text-black");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
};

signupTab.onclick = () => {
  signupTab.classList.add("bg-[#00ff1a]", "text-black");
  loginTab.classList.remove("bg-[#00ff1a]", "text-black");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};
