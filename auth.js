// ==========================================================================
// AUTHENTICATION SYSTEM WITH TOASTS
// ==========================================================================

// Toast function defined globally for landing page
function showLandingToast(message, type) {
    type = type || 'info';
    var existing = document.querySelector('.landing-toast');
    if (existing) existing.remove();
    
    var icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    var colors = { success: '#3fb950', error: '#f85149', warning: '#d29922', info: '#58a6ff' };
    
    var toast = document.createElement('div');
    toast.className = 'landing-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);background:' + colors[type] + ';color:white;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:600;font-family:"Plus Jakarta Sans",sans-serif;z-index:10000;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(0,0,0,0.3);transition:transform 0.3s ease;max-width:90vw;';
    toast.innerHTML = icons[type] + ' ' + message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    setTimeout(function() {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

(function() {
    class AuthSystem {
        constructor() {
            this.currentUser = null;
            this.checkAuth();
        }

        checkAuth() {
            var savedUser = localStorage.getItem('mimeahub_user');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
            }
        }

        isLoggedIn() {
            return this.currentUser !== null;
        }

        login(email, password) {
            var users = JSON.parse(localStorage.getItem('mimeahub_users') || '[]');
            var user = users.find(function(u) { return u.email === email && u.password === password; });
            
            if (user) {
                this.currentUser = { id: user.id, name: user.name, email: user.email };
                localStorage.setItem('mimeahub_user', JSON.stringify(this.currentUser));
                return { success: true, user: this.currentUser };
            }
            return { success: false, error: 'Invalid email or password' };
        }

        register(name, email, password) {
            var users = JSON.parse(localStorage.getItem('mimeahub_users') || '[]');
            
            if (users.find(function(u) { return u.email === email; })) {
                return { success: false, error: 'Email already registered' };
            }
            
            var newUser = { id: Date.now().toString(), name: name, email: email, password: password };
            users.push(newUser);
            localStorage.setItem('mimeahub_users', JSON.stringify(users));
            
            this.currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
            localStorage.setItem('mimeahub_user', JSON.stringify(this.currentUser));
            return { success: true, user: this.currentUser };
        }

        logout() {
            this.currentUser = null;
            localStorage.removeItem('mimeahub_user');
        }

        getUserData() {
            return this.currentUser;
        }
    }

    window.auth = new AuthSystem();

    window.handlePageRouting = function() {
        var currentPath = window.location.pathname;
        var isDashboard = currentPath.indexOf('dashboard.html') > -1;
        
        if (window.auth.isLoggedIn()) {
            if (!isDashboard) {
                window.location.href = 'dashboard.html';
            } else {
                var userGreeting = document.getElementById('user-greeting');
                if (userGreeting) {
                    var user = window.auth.getUserData();
                    userGreeting.textContent = 'Welcome, ' + user.name;
                }
            }
        } else {
            if (isDashboard) {
                window.location.href = 'index.html';
            }
        }
    };

    window.showAuthModal = function() {
        var modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('hidden');
    };

    window.closeAuthModal = function() {
        var modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('hidden');
    };

    window.switchAuthForm = function(formType) {
        var loginForm = document.getElementById('login-form');
        var registerForm = document.getElementById('register-form');
        if (formType === 'register') {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        } else {
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        }
    };

    window.handleLogin = function() {
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            showLandingToast('Please fill in all fields', 'warning');
            return;
        }
        
        var result = window.auth.login(email, password);
        
        if (result.success) {
            showLandingToast('Login successful! Redirecting...', 'success');
            setTimeout(function() {
                window.closeAuthModal();
                window.location.href = 'dashboard.html';
            }, 800);
        } else {
            showLandingToast(result.error, 'error');
        }
    };

    window.handleRegister = function() {
        var name = document.getElementById('register-name').value;
        var email = document.getElementById('register-email').value;
        var password = document.getElementById('register-password').value;
        var confirm = document.getElementById('register-confirm').value;
        
        if (!name || !email || !password || !confirm) {
            showLandingToast('Please fill in all fields', 'warning');
            return;
        }
        
        if (password !== confirm) {
            showLandingToast('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            showLandingToast('Password must be at least 6 characters', 'warning');
            return;
        }
        
        var result = window.auth.register(name, email, password);
        
        if (result.success) {
            showLandingToast('Account created! Redirecting...', 'success');
            setTimeout(function() {
                window.closeAuthModal();
                window.location.href = 'dashboard.html';
            }, 800);
        } else {
            showLandingToast(result.error, 'error');
        }
    };

    window.handleLogout = function() {
        window.auth.logout();
        window.location.href = 'index.html';
    };

    document.addEventListener('DOMContentLoaded', function() {
        window.handlePageRouting();
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                var modal = document.getElementById('auth-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    var loginForm = document.getElementById('login-form');
                    if (loginForm && !loginForm.classList.contains('hidden')) {
                        window.handleLogin();
                    } else {
                        window.handleRegister();
                    }
                }
            }
        });
        
        var modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function() {
                window.closeAuthModal();
            });
        }
    });
})();