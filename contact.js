// DOM Elements
const contactForm = document.getElementById('contact-form');

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form (simple validation)
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    
    // Form data object (would be sent to server in a real app)
    const formData = {
        name,
        email,
        subject,
        message
    };
    
    console.log('Form data:', formData);
    
    // Show success message
    showNotification('Your message has been sent successfully!', 'success');
    
    // Reset form
    contactForm.reset();
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#2ecc71';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    notification.style.color = 'white';

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add event listener to form
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');

    // Validation functions
    function validateName(name) {
        return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateSubject(subject) {
        return subject.length >= 3;
    }

    function validateMessage(message) {
        return message.length >= 10;
    }

    // Show error message
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        }
    }

    // Hide error message
    function hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }

    // Show success message
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Real-time validation
    nameInput.addEventListener('input', () => {
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name (at least 2 characters, letters only)');
        } else {
            hideError(nameInput);
        }
    });

    emailInput.addEventListener('input', () => {
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
        } else {
            hideError(emailInput);
        }
    });

    subjectInput.addEventListener('input', () => {
        if (!validateSubject(subjectInput.value)) {
            showError(subjectInput, 'Subject must be at least 3 characters long');
        } else {
            hideError(subjectInput);
        }
    });

    messageInput.addEventListener('input', () => {
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Message must be at least 10 characters long');
        } else {
            hideError(messageInput);
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isSubjectValid = validateSubject(subjectInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            return;
        }

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                })
            });

            const data = await response.json();

            if (data.success) {
                showSuccess('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            showError(submitButton, error.message || 'Failed to send message. Please try again.');
        } finally {
            // Re-enable submit button and restore original text
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}); 