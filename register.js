document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const phoneInput = document.getElementById('phone');
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

    // Initialize Google Sign-In
    initGoogleSignIn();

    // Check if this is a callback from Google
    if (window.location.pathname === '/auth/google/callback') {
        handleGoogleCallback();
    }

    // Validation functions
    function validateFullName(name) {
        return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return password.length >= minLength && 
               hasUpperCase && 
               hasLowerCase && 
               hasNumbers && 
               hasSpecialChar;
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone);
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

    // Input event listeners for real-time validation
    fullnameInput.addEventListener('input', () => {
        if (!validateFullName(fullnameInput.value)) {
            showError('fullname', 'Please enter a valid full name (letters and spaces only)');
        } else {
            hideError('fullname');
        }
    });

    emailInput.addEventListener('input', () => {
        if (!validateEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
        } else {
            hideError('email');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (!validatePassword(passwordInput.value)) {
            showError('password', 'Password must meet all requirements');
        } else {
            hideError('password');
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError('confirm-password', 'Passwords do not match');
        } else {
            hideError('confirm-password');
        }
    });

    phoneInput.addEventListener('input', () => {
        if (!validatePhone(phoneInput.value)) {
            showError('phone', 'Please enter a valid 10-digit phone number');
        } else {
            hideError('phone');
        }
    });

    // Form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset all error messages
        hideError('fullname');
        hideError('email');
        hideError('password');
        hideError('confirm-password');
        hideError('phone');

        // Validate all fields
        let isValid = true;

        if (!validateFullName(fullnameInput.value)) {
            showError('fullname', 'Please enter a valid full name (letters and spaces only)');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePassword(passwordInput.value)) {
            showError('password', 'Password must meet all requirements');
            isValid = false;
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            showError('confirm-password', 'Passwords do not match');
            isValid = false;
        }

        if (!validatePhone(phoneInput.value)) {
            showError('phone', 'Please enter a valid 10-digit phone number');
            isValid = false;
        }

        if (isValid) {
            // Create user object
            const user = {
                fullname: fullnameInput.value,
                email: emailInput.value,
                password: passwordInput.value, // In a real app, this should be hashed
                phone: phoneInput.value
            };

            // Store user data in localStorage (in a real app, this would be sent to a server)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (users.some(u => u.email === user.email)) {
                showError('email', 'This email is already registered');
                return;
            }

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            // Show success message
            showSuccess('Registration successful! Redirecting to login page...');

            // Clear form
            registerForm.reset();

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
}); 