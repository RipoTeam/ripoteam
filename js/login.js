document.addEventListener('DOMContentLoaded', function() {
    // Initialize users if they don't exist
    const defaultUsers = [
        { 
            id: 1, 
            username: "Ripo Team", 
            password: "admin123", 
            role: "admin", 
            status: "active" 
        },
        {
            id: 2,
            username: "test",
            password: "test123",
            role: "user",
            status: "active"
        }
    ];

    // Always ensure our users exist in localStorage
    localStorage.setItem('users', JSON.stringify(defaultUsers));
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Define valid users
    const validUsers = [
        {
            username: "Ripo Team",
            password: "admin123",
            role: "admin"
        },
        {
            username: "test",
            password: "test123",
            role: "user"
        }
    ];

    const user = validUsers.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === "admin") {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "user-dashboard.html";
        }
    } else {
        const errorDiv = document.getElementById('loginError');
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Invalid username or password';
    }
});