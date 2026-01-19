const API_URL = "http://localhost:5000/api";

async function loadDashboard() {
  try {
    const res = await fetch(`${API_URL}/user/me`, {
      credentials: "include"
    });

    if (!res.ok) {
      window.location.href = "login-signup.html";
      return;
    }

    const { user } = await res.json();

    document.getElementById("userName").textContent = user.fullName;
    document.getElementById("userRole").textContent = user.role;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhone").textContent = user.phone;
    document.getElementById("userInstitute").textContent = user.institute || "-";
    document.getElementById("userCourse").textContent = user.course || "-";
    document.getElementById("userBranch").textContent = user.branch || "-";
    document.getElementById("userYear").textContent = user.year || "-";
    document.getElementById("userSemester").textContent = user.semester || "-";

    document.getElementById("profileImage").src =
      user.profileImage || "https://via.placeholder.com/150";

  } catch {
    window.location.href = "login-signup.html";
  }
}

loadDashboard();
