// Auth State Management for Navbar
// NO UI CHANGES - Only toggles visibility of existing buttons

document.addEventListener('DOMContentLoaded', async () => {
  const btnLogin = document.getElementById('btn-login');
  const btnDashboard = document.getElementById('btn-dashboard');

  // Only proceed if buttons exist (navbar is present)
  if (!btnLogin || !btnDashboard) return;

  try {
    // Check if user is logged in
    const response = await fetch(`${window.API_URL}/user/me`, {
      credentials: 'include'
    });

    if (response.ok) {
      // User is logged in
      btnLogin.classList.add('hidden');
      btnDashboard.classList.remove('hidden');
    } else {
      // User is not logged in
      btnLogin.classList.remove('hidden');
      btnDashboard.classList.add('hidden');
    }
  } catch (error) {
    // On error, assume not logged in
    btnLogin.classList.remove('hidden');
    btnDashboard.classList.add('hidden');
  }
});

// Logout function (can be called from console or attached to a button later)
window.logout = async () => {
  try {
    await fetch(`${window.API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    window.location.href = './index.html';
  } catch (error) {
    console.error('Logout failed', error);
  }
};
