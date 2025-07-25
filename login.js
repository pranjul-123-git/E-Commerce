// Initialize the login page
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const googleLoginBtn = document.getElementById('google-login');

    // Google OAuth Configuration
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Google Client ID
    const GOOGLE_REDIRECT_URI = window.location.origin + '/auth/google/callback';

    // Initialize Google Sign-In
    function initGoogleSignIn() {
        googleLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
                client_id=${GOOGLE_CLIENT_ID}&
                redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&
                response_type=code&
                scope=${encodeURIComponent('email profile')}&
                access_type=offline&
                prompt=consent`;
            
            // Redirect to Google's OAuth 2.0 server
            window.location.href = googleAuthUrl.replace(/\s/g, '');
        });
    }

    // Handle Google OAuth callback
    function handleGoogleCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
            // In a real application, you would exchange this code for tokens
            // and handle the user authentication on your server
            console.log('Received authorization code:', code);
            
            // For demo purposes, we'll just show a success message
            showSuccess('Google authentication successful!');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    // Show error message
    function showError(inputId, message) {
        const errorElement = document.getElementById(`${inputId}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Hide error message
    function hideError(inputId) {
        const errorElement = document.getElementById(`${inputId}-error`);
        errorElement.style.display = 'none';
    }

    // Show success message
    function showSuccess(message) {
        const successElement = document.getElementById('success-message');
        successElement.textContent = message;
        successElement.style.display = 'block';
    }

    // Validate email format
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        hideError('email');
        hideError('password');

        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
            return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user by email
        const user = users.find(u => u.email === emailInput.value);
        
        if (!user) {
            showError('email', 'No account found with this email');
            return;
        }

        // Check password
        if (user.password !== passwordInput.value) {
            showError('password', 'Incorrect password');
            return;
        }

        // Store logged in user info
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            fullname: user.fullname
        }));

        // Show success message
        showSuccess('Login successful! Redirecting...');

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });

    // Initialize Google Sign-In
    initGoogleSignIn();

    // Check if this is a callback from Google
    if (window.location.pathname === '/auth/google/callback') {
        handleGoogleCallback();
    }
});

// Set up event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', togglePasswordVisibility);
    }
    
    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }
    
    const facebookBtn = document.querySelector('.facebook-btn');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', handleFacebookLogin);
    }
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    console.log("Login form submitted");
    
    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate API call (replace with actual API call in production)
    setTimeout(() => {
        // For demo purposes, we'll use a simple check
        // In a real application, you would validate against a backend
        if (email === 'demo@example.com' && password === 'password') {
            // Login successful
            loginSuccess(email, remember);
        } else {
            // Login failed
            loginFailed();
        }
    }, 1500);
}

// Validate login form
function validateLoginForm(email, password) {
    // Reset previous error messages
    clearErrorMessages();
    
    let isValid = true;
    
    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

// Check if email is valid
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show loading state
function showLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    }
}

// Handle successful login
function loginSuccess(email, remember) {
    console.log("Login successful");
    
    // Store user data in localStorage
    const userData = {
        email: email,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // If remember me is checked, set a longer expiration
    if (remember) {
        localStorage.setItem('rememberMe', 'true');
    }
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Handle failed login
function loginFailed() {
    console.log("Login failed");
    
    // Reset loading state
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Login';
    }
    
    // Show error message
    const errorContainer = document.createElement('div');
    errorContainer.className = 'login-error';
    errorContainer.textContent = 'Invalid email or password. Please try again.';
    
    const loginForm = document.getElementById('login-form');
    loginForm.insertBefore(errorContainer, loginForm.firstChild);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorContainer.remove();
    }, 3000);
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Handle Google login
function handleGoogleLogin() {
    console.log("Google login clicked");
    // In a real application, you would implement OAuth with Google
    alert("Google login functionality would be implemented here.");
}

// Handle Facebook login
function handleFacebookLogin() {
    console.log("Facebook login clicked");
    // In a real application, you would implement OAuth with Facebook
    alert("Facebook login functionality would be implemented here.");
}

// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();
    console.log("Forgot password clicked");
    
    const email = document.getElementById('email').value;
    
    if (!email) {
        alert("Please enter your email address first.");
        return;
    }
    
    // In a real application, you would send a password reset email
    alert(`Password reset instructions would be sent to ${email}`);
}

// Check if user is already logged in
function checkLoginStatus() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData && userData.isLoggedIn) {
        // User is already logged in, redirect to home page
        window.location.href = 'index.html';
    }
} 