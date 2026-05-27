<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MimeaHub — AI-Powered Plant Disease Detection</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='14' font-size='14'>🌱</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
</head>
<body class="landing-page">
    
    <!-- Navigation -->
    <nav class="landing-nav">
        <div class="nav-container">
            <div class="nav-brand">
                <svg class="brand-logo" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2L4 9L16 16L28 9L16 2Z" fill="#3fb950"/>
                    <path d="M4 23L16 30L28 23" stroke="#58a6ff" stroke-width="2.5"/>
                    <path d="M4 16L16 23L28 16" stroke="#58a6ff" stroke-width="2.5"/>
                    <circle cx="16" cy="16" r="4" fill="#bc8cff"/>
                </svg>
                <span class="brand-name">MimeaHub</span>
            </div>
            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#about">About</a>
                <button class="btn btn-primary" onclick="showAuthModal()">Get Started</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-content">
            <div class="hero-badge">🌱 AI-Powered Plant Healthcare</div>
            <h1 class="hero-title">
                Diagnose Plant Diseases
                <span class="gradient-text">Instantly & Accurately</span>
            </h1>
            <p class="hero-description">
                Upload a photo or use your camera to identify crop diseases in seconds. 
                Get treatment recommendations powered by advanced machine learning.
            </p>
            <div class="hero-actions">
                <button class="btn btn-primary btn-large" onclick="showAuthModal()">
                    Start Free Diagnosis
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 5L13 10L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn btn-secondary btn-large" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">
                    Learn More
                </button>
            </div>
            <div class="hero-stats">
                <div class="stat-item">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Diseases Detected</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">95%</span>
                    <span class="stat-label">Accuracy Rate</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">10K+</span>
                    <span class="stat-label">Farmers Helped</span>
                </div>
            </div>
        </div>
        <div class="hero-visual">
            <div class="hero-mockup">
                <div class="mockup-screen">
                    <div class="mockup-header">
                        <div class="mockup-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <div class="mockup-content">
                        <div class="mockup-plant">🌿</div>
                        <div class="mockup-scanning">Scanning plant...</div>
                        <div class="mockup-result">
                            <div class="mockup-check">✓</div>
                            <div>Healthy Plant Detected</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section">
        <h2 class="section-title">Why Choose MimeaHub?</h2>
        <p class="section-subtitle">Powerful features designed for modern agriculture</p>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🔬</div>
                <h3>Real-Time Detection</h3>
                <p>Get instant disease diagnosis using your camera or uploaded images with our advanced AI model.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h3>Works Offline</h3>
                <p>Full functionality without internet connection. Perfect for remote field locations.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">💊</div>
                <h3>Treatment Guides</h3>
                <p>Receive organic, chemical, and preventive treatment recommendations for each disease.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Analytics Dashboard</h3>
                <p>Track disease patterns and monitor crop health trends over time.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <h3>Multilingual Support</h3>
                <p>Available in English and Kiswahili to serve diverse farming communities.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h3>Privacy First</h3>
                <p>Your data stays on your device. No cloud uploads required for diagnosis.</p>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="how-it-works-section">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">Three simple steps to diagnose your plants</p>
        
        <div class="steps-container">
            <div class="step-item">
                <div class="step-number">1</div>
                <h3>Capture or Upload</h3>
                <p>Take a photo of the affected plant or upload an existing image</p>
            </div>
            <div class="step-connector"></div>
            <div class="step-item">
                <div class="step-number">2</div>
                <h3>AI Analysis</h3>
                <p>Our model processes the image and identifies potential diseases</p>
            </div>
            <div class="step-connector"></div>
            <div class="step-item">
                <div class="step-number">3</div>
                <h3>Get Results</h3>
                <p>Receive diagnosis, confidence score, and treatment recommendations</p>
            </div>
        </div>
    </section>

    <!-- Auth Modal -->
    <div id="auth-modal" class="modal hidden">
        <div class="modal-overlay" onclick="closeAuthModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeAuthModal()">✕</button>
            
            <div id="login-form" class="auth-form">
                <h2>Welcome Back</h2>
                <p>Sign in to access your dashboard</p>
                
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" placeholder="farmer@example.com">
                </div>
                
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" placeholder="Enter your password">
                </div>
                
                <button class="btn btn-primary btn-full" onclick="handleLogin()">Sign In</button>
                
                <p class="auth-switch">
                    Don't have an account? 
                    <a href="#" onclick="switchAuthForm('register')">Create one</a>
                </p>
            </div>

            <div id="register-form" class="auth-form hidden">
                <h2>Create Account</h2>
                <p>Join thousands of farmers using MimeaHub</p>
                
                <div class="form-group">
                    <label for="register-name">Full Name</label>
                    <input type="text" id="register-name" placeholder="John Doe">
                </div>
                
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" placeholder="farmer@example.com">
                </div>
                
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" placeholder="Create a password">
                </div>
                
                <div class="form-group">
                    <label for="register-confirm">Confirm Password</label>
                    <input type="password" id="register-confirm" placeholder="Confirm your password">
                </div>
                
                <button class="btn btn-primary btn-full" onclick="handleRegister()">Create Account</button>
                
                <p class="auth-switch">
                    Already have an account? 
                    <a href="#" onclick="switchAuthForm('login')">Sign in</a>
                </p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="landing-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <h3>MimeaHub</h3>
                <p>Empowering farmers with AI-driven plant disease detection</p>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <h4>Product</h4>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#">Pricing</a>
                </div>
                <div class="footer-column">
                    <h4>Company</h4>
                    <a href="#">About</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                </div>
                <div class="footer-column">
                    <h4>Legal</h4>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 MimeaHub. All rights reserved.</p>
        </div>
    </footer>

    <script src="auth.js"></script>
</body>

</html>