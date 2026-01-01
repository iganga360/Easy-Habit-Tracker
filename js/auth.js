/* ============================================
   AUTH.JS - Authentication System
   ============================================ */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('habitTrackerUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }

        // Check remember me
        const rememberMe = localStorage.getItem('habitTrackerRememberMe');
        if (rememberMe === 'true' && this.currentUser) {
            // Auto-login
            return true;
        } else if (!window.location.pathname.includes('login.html') && !this.currentUser) {
            // Redirect to login if not logged in
            // window.location.href = 'login.html';
        }
    }

    // Validate email format
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Check password strength
    checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    }

    // Hash password (simple implementation for demo)
    hashPassword(password) {
        // In production, use a proper hashing library
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    // Sign up new user
    signup(email, password, username) {
        // Validate inputs
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email format');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('habitTrackerUsers') || '[]');
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email: email,
            username: username || email.split('@')[0],
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            avatar: this.generateAvatar(username || email)
        };

        users.push(newUser);
        localStorage.setItem('habitTrackerUsers', JSON.stringify(users));

        return newUser;
    }

    // Login user
    login(email, password, rememberMe = false) {
        const users = JSON.parse(localStorage.getItem('habitTrackerUsers') || '[]');
        const user = users.find(u => u.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== this.hashPassword(password)) {
            throw new Error('Invalid password');
        }

        // Remove password from user object before storing
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        this.currentUser = userWithoutPassword;
        localStorage.setItem('habitTrackerUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('habitTrackerRememberMe', rememberMe.toString());

        return userWithoutPassword;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('habitTrackerUser');
        localStorage.removeItem('habitTrackerRememberMe');
        window.location.href = 'login.html';
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Generate simple avatar
    generateAvatar(name) {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];
        const initial = name.charAt(0).toUpperCase();
        const colorIndex = name.charCodeAt(0) % colors.length;
        
        return {
            initial: initial,
            color: colors[colorIndex]
        };
    }

    // Update user profile
    updateProfile(updates) {
        if (!this.currentUser) {
            throw new Error('No user logged in');
        }

        const users = JSON.parse(localStorage.getItem('habitTrackerUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Update user data
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('habitTrackerUsers', JSON.stringify(users));

        // Update current user
        const updatedUser = { ...users[userIndex] };
        delete updatedUser.password;
        this.currentUser = updatedUser;
        localStorage.setItem('habitTrackerUser', JSON.stringify(updatedUser));

        return this.currentUser;
    }

    // Change password
    changePassword(oldPassword, newPassword) {
        if (!this.currentUser) {
            throw new Error('No user logged in');
        }

        const users = JSON.parse(localStorage.getItem('habitTrackerUsers') || '[]');
        const user = users.find(u => u.id === this.currentUser.id);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== this.hashPassword(oldPassword)) {
            throw new Error('Invalid current password');
        }

        if (newPassword.length < 6) {
            throw new Error('New password must be at least 6 characters');
        }

        // Update password
        user.password = this.hashPassword(newPassword);
        localStorage.setItem('habitTrackerUsers', JSON.stringify(users));

        return true;
    }

    // Demo mode - create a demo user
    loginAsDemo() {
        const demoUser = {
            id: 'demo',
            email: 'demo@habittracker.com',
            username: 'Demo User',
            createdAt: new Date().toISOString(),
            avatar: { initial: 'D', color: '#4CAF50' }
        };

        this.currentUser = demoUser;
        localStorage.setItem('habitTrackerUser', JSON.stringify(demoUser));
        localStorage.setItem('habitTrackerRememberMe', 'false');

        return demoUser;
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}
