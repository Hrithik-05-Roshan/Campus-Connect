// Dashboard Data Loading
// NO UI CHANGES - Only populates existing elements with data

document.addEventListener('DOMContentLoaded', async () => {
  // Verify we are on the dashboard page
  if (!document.querySelector('body[data-page="dashboard"]')) return;

  try {
    // Fetch user data
    console.log('Fetching user data from:', `${window.API_URL}/user/me`);
    const response = await fetch(`${window.API_URL}/user/me`, {
      credentials: 'include'
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      // Not logged in, redirect to login
      console.error('Not authenticated, redirecting to login');
      window.location.href = './login-signup.html';
      return;
    }

    const data = await response.json();
    const user = data.user;

    // Populate Dashboard Elements
    const dashName = document.getElementById('dashName');
    const dashCourse = document.getElementById('dashCourse');
    const dashRank = document.getElementById('dashRank');
    const issuesSolved = document.getElementById('issuesSolved');
    const issuesRaised = document.getElementById('issuesRaised');
    const totalPoints = document.getElementById('totalPoints');
    const dashProfileImage = document.getElementById('dashProfileImage');

    if (dashName) dashName.textContent = user.fullName;
    if (dashCourse) dashCourse.textContent = `${user.course} • ${user.branch}`;
    if (dashRank) dashRank.textContent = `🏆 Rank ${user.rank || 'N/A'}`;
    if (issuesSolved) issuesSolved.textContent = user.issuesSolved || 0;
    if (issuesRaised) issuesRaised.textContent = user.issuesRaised || 0;
    if (totalPoints) totalPoints.textContent = user.points || 0;

    if (dashProfileImage && user.profileImage) {
      dashProfileImage.src = user.profileImage;
    } else if (dashProfileImage) {
      // Fallback image or keep default
      dashProfileImage.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

  } catch (error) {
    console.error('Failed to load dashboard data', error);
    // Optional: redirect to login on error
    // window.location.href = './login-signup.html';
  }
});
