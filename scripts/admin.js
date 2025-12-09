// scripts/admin.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Panel Loaded');

    // Add simple row highlighting effect or other interactions here
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            // Toggle a 'selected' class for better visibility if needed
            rows.forEach(r => r.style.background = ''); // Reset others
            row.style.background = 'rgba(0, 210, 255, 0.1)';
        });
    });
});
