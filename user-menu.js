// Initialize user menu
document.addEventListener('DOMContentLoaded', function() {
    console.log("User menu initialized");
    
    // Update user menu based on login status
    updateUserMenu();
    
    // Add event listener for logout
    setupLogoutListener();
});

// Update user menu based on login status
function updateUserMenu() {
    const userIcon = document.getElementById('user-icon');
    if (!userIcon) return;
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData && userData.isLoggedIn) {
        // User is logged in
        userIcon.innerHTML = `
            <div class="user-menu">
                <i class="fas fa-user"></i>
                <div class="user-dropdown">
                    <div class="user-info">
                        <span>${userData.email}</span>
                    </div>
                    <div class="dropdown-links">
                        <a href="profile.html"><i class="fas fa-user-circle"></i> My Profile</a>
                        <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
                        <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener for logout
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', handleLogout);
        }
    } else {
        // User is not logged in
        userIcon.innerHTML = '<i class="fas fa-user"></i>';
        userIcon.href = 'login.html';
    }
}

// Setup logout listener
function setupLogoutListener() {
    document.addEventListener('click', function(event) {
        // Close dropdown when clicking outside
        if (!event.target.closest('.user-menu')) {
            const dropdowns = document.querySelectorAll('.user-dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Toggle dropdown when clicking on user icon
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function(event) {
            event.preventDefault();
            const dropdown = this.querySelector('.user-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
        });
    }
}

// Handle logout
function handleLogout(event) {
    event.preventDefault();
    console.log("Logout clicked");
    
    if (confirm("Are you sure you want to logout?")) {
        // Clear user data from localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('rememberMe');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
} 