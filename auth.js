// Authentication Logic for Login/Signup Page
// NO UI CHANGES - Only form handling logic

document.addEventListener('DOMContentLoaded', () => {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const errorMsg = document.getElementById('errorMsg');

  // Tab Switching
  if (loginTab && signupTab) {
    loginTab.onclick = () => {
      loginTab.classList.add('bg-[#00ff1a]', 'text-black');
      loginTab.classList.remove('bg-transparent', 'text-gray-300');
      signupTab.classList.remove('bg-[#00ff1a]', 'text-black');
      signupTab.classList.add('bg-transparent', 'text-gray-300');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      errorMsg.classList.add('hidden');
    };

    signupTab.onclick = () => {
      signupTab.classList.add('bg-[#00ff1a]', 'text-black');
      signupTab.classList.remove('bg-transparent', 'text-gray-300');
      loginTab.classList.remove('bg-[#00ff1a]', 'text-black');
      loginTab.classList.add('bg-transparent', 'text-gray-300');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      errorMsg.classList.add('hidden');
    };
  }

  // Login Form Handler
  if (loginForm) {
    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      errorMsg.classList.add('hidden');

      const email = document.getElementById('loginEmail')?.value;
      const password = document.getElementById('loginPassword')?.value;

      try {
        const response = await fetch(`${window.API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          window.location.href = './dashboard.html';
        } else {
          errorMsg.textContent = data.message || 'Login failed';
          errorMsg.classList.remove('hidden');
        }
      } catch (error) {
        errorMsg.textContent = 'Network error. Please try again.';
        errorMsg.classList.remove('hidden');
      }
    };
  }

  // Signup Form Handler
  if (signupForm) {
    signupForm.onsubmit = async (e) => {
      e.preventDefault();
      errorMsg.classList.add('hidden');

      const formData = new FormData();
      formData.append('fullName', document.getElementById('fullName')?.value);
      formData.append('email', document.getElementById('email')?.value);
      formData.append('phone', document.getElementById('phone')?.value);
      formData.append('password', document.getElementById('password')?.value);
      formData.append('role', document.getElementById('role')?.value);
      formData.append('institute', document.getElementById('institute')?.value);
      formData.append('course', document.getElementById('course')?.value);
      formData.append('branch', document.getElementById('branch')?.value);
      formData.append('year', document.getElementById('year')?.value);
      formData.append('semester', document.getElementById('semester')?.value);

      const profileImage = document.getElementById('profileImage')?.files[0];
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      try {
        const response = await fetch(`${window.API_URL}/auth/register`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          window.location.href = './dashboard.html';
        } else {
          errorMsg.textContent = data.message || 'Signup failed';
          errorMsg.classList.remove('hidden');
        }
      } catch (error) {
        errorMsg.textContent = 'Network error. Please try again.';
        errorMsg.classList.remove('hidden');
      }
    };
  }
});
