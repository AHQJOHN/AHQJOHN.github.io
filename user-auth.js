// User Authentication Logic with Appwrite

// Wait for appwrite to be initialized
window.addEventListener('load', async () => {
    // Check if user is already logged in
    try {
        const user = await appwrite.helpers.getCurrentUser();
        if (user) {
            // Redirect based on user role
            if (user.email === appwrite.config.ADMIN_EMAIL) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        }
    } catch (error) {
        console.log('Not logged in');
    }
});

// Switch between login and signup tabs
function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    }
    
    hideMessage();
}

// Show message
function showMessage(message, type) {
    const messageEl = document.getElementById('authMessage');
    messageEl.textContent = message;
    messageEl.className = `auth-message ${type}`;
    messageEl.style.display = 'block';
}

function hideMessage() {
    const messageEl = document.getElementById('authMessage');
    messageEl.style.display = 'none';
}

// Show loading spinner
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// Google Sign In
async function signInWithGoogle() {
    try {
        showLoading();
        await appwrite.helpers.loginWithGoogle();
    } catch (error) {
        hideLoading();
        showMessage('Error signing in with Google: ' + error.message, 'error');
    }
}

// GitHub Sign In
async function signInWithGithub() {
    try {
        showLoading();
        await appwrite.helpers.loginWithGithub();
    } catch (error) {
        hideLoading();
        showMessage('Error signing in with GitHub: ' + error.message, 'error');
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    hideMessage();
    showLoading();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await appwrite.helpers.createSession(email, password);
        
        // Get user info
        const user = await appwrite.helpers.getCurrentUser();
        
        // Redirect based on role
        if (user.email === appwrite.config.ADMIN_EMAIL) {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user-dashboard.html';
        }
    } catch (error) {
        hideLoading();
        showMessage('Login failed: ' + error.message, 'error');
    }
}

// Handle Signup
async function handleSignup(event) {
    event.preventDefault();
    hideMessage();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const organization = document.getElementById('signupOrganization').value;
    const role = document.getElementById('signupRole').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    // Validate password strength
    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Create account
        await appwrite.helpers.createAccount(email, password, name);
        
        // Login after signup
        await appwrite.helpers.createSession(email, password);
        
        // Get user
        const user = await appwrite.helpers.getCurrentUser();
        
        // Create user document in database
        await appwrite.helpers.createDocument(
            appwrite.config.COLLECTIONS.USERS,
            {
                userId: user.$id,
                name: name,
                email: email,
                organization: organization || '',
                role: role,
                createdAt: new Date().toISOString()
            }
        );
        
        showMessage('Account created successfully! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'user-dashboard.html';
        }, 1500);
        
    } catch (error) {
        hideLoading();
        showMessage('Signup failed: ' + error.message, 'error');
    }
}

// Reset Password
async function resetPassword() {
    const email = prompt('Enter your email address:');
    
    if (!email) return;
    
    try {
        showLoading();
        await appwrite.helpers.sendPasswordReset(email);
        hideLoading();
        showMessage('Password reset email sent! Check your inbox.', 'success');
    } catch (error) {
        hideLoading();
        showMessage('Error sending reset email: ' + error.message, 'error');
    }
}

// Make functions available globally
window.switchTab = switchTab;
window.signInWithGoogle = signInWithGoogle;
window.signInWithGithub = signInWithGithub;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.resetPassword = resetPassword;
