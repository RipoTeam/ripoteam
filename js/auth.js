const ADMIN_CREDENTIALS = {
    username: "ripo team",
    password: "ripo123"
};

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    // Reset errors
    usernameError.textContent = '';
    passwordError.textContent = '';

    if (username === "ripo team" && password === "ripo123") {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('username', username);
        window.location.href = 'dashboard.html';
    } else {
        if (!username) {
            usernameError.textContent = 'Please enter a username';
        }
        if (!password) {
            passwordError.textContent = 'Please enter a password';
        }
        if (username && password) {
            passwordError.textContent = 'Incorrect username or password';
        }
    }
}
