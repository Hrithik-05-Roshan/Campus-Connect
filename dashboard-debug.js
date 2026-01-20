// TEMPORARY DIAGNOSTIC SCRIPT
// Add this to dashboard.html BEFORE dashboard.js to see what's happening

console.log('=== DASHBOARD DIAGNOSTIC START ===');
console.log('Current URL:', window.location.href);
console.log('API_URL:', window.API_URL);
console.log('Page attribute:', document.body.dataset.page);

// Log all cookies
console.log('All cookies:', document.cookie);

// Test if we can reach the API
fetch(`${window.API_URL}/health`, { credentials: 'include' })
    .then(res => {
        console.log('Health check status:', res.status);
        return res.json();
    })
    .then(data => console.log('Health check response:', data))
    .catch(err => console.error('Health check error:', err));

console.log('=== DASHBOARD DIAGNOSTIC END ===');
