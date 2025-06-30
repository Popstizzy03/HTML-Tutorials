<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Tutorials Dashboard</title>
    <style>
        :root {
            --primary: #4a6cf7;
            --secondary: #f7754a;
            --success: #28a745;
            --dark: #222832;
            --light: #f8f9fa;
            --grey: #6c757d;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: var(--light);
            color: var(--dark);
            line-height: 1.6;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .container {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo {
            position: relative;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--dark);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .logo svg {
            width: 60%;
            height: 60%;
            fill: white;
        }
        
        .logo:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
            top: 0;
            left: 0;
        }
        
        .title-section h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 5px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .title-section p {
            font-size: 1.1rem;
            color: var(--grey);
        }
        
        .badge {
            background-color: var(--primary);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.8rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .card {
            background-color: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .card h2 {
            margin-bottom: 20px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card h2 span {
            color: var(--primary);
        }
        
        .progress-container {
            margin-bottom: 25px;
        }
        
        .progress-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .progress-title {
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .progress-value {
            font-weight: 700;
            color: var(--primary);
        }
        
        .progress-bar {
            height: 10px;
            background-color: #e9ecef;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 5px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            transition: width 1s ease-in-out;
            width: 0;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .feature-icon {
            min-width: 40px;
            height: 40px;
            background-color: rgba(74, 108, 247, 0.1);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 1.2rem;
        }
        
        .feature-text h3 {
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        
        .feature-text p {
            color: var(--grey);
            font-size: 0.9rem;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 20px;
        }
        
        .tech-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 15px;
            background-color: rgba(74, 108, 247, 0.05);
            border-radius: 8px;
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .section-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), transparent);
            border-radius: 3px;
        }
        
        .modules-list {
            list-style-type: none;
        }
        
        .module-item {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .module-item:last-child {
            border-bottom: none;
        }
        
        .module-title {
            font-weight: 600;
        }
        
        .module-desc {
            color: var(--grey);
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        .module-status {
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .status-beginner {
            background-color: #e3f2fd;
            color: #0d6efd;
        }
        
        .status-intermediate {
            background-color: #fff3cd;
            color: #ffc107;
        }
        
        .status-advanced {
            background-color: #f8d7da;
            color: #dc3545;
        }
        
        .cta-section {
            text-align: center;
            padding: 40px 0;
        }
        
        .cta-section h2 {
            font-size: 2rem;
            margin-bottom: 15px;
        }
        
        .cta-section p {
            font-size: 1.1rem;
            color: var(--grey);
            margin-bottom: 25px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(74, 108, 247, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(74, 108, 247, 0.4);
        }
        
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-container">
                <div class="logo">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h5v2H7v-2z"/>
                    </svg>
                </div>
                <div class="title-section">
                    <h1>HTML Tutorials</h1>
                    <p>Master web development from scratch to job-ready skills</p>
                </div>
            </div>
            <div class="badge">Industry-Aligned Curriculum</div>
        </div>
        
        <div class="card">
            <h2><span>📊</span> Program Stats</h2>
            
            <div class="progress-container">
                <div class="progress-header">
                    <div class="progress-title">Hiring Success Rate</div>
                    <div class="progress-value">92%</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" data-value="92"></div>
                </div>
            </div>
            
            <div class="progress-container">
                <div class="progress-header">
                    <div class="progress-title">Course Completion Rate</div>
                    <div class="progress-value">87%</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" data-value="87"></div>
                </div>
            </div>
            
            <div class="progress-container">
                <div class="progress-header">
                    <div class="progress-title">Skill Coverage</div>
                    <div class="progress-value">95%</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" data-value="95"></div>
                </div>
            </div>
        </div>
        
        <h2 class="section-title">Key Features</h2>
        <div class="features">
            <div class="feature-item">
                <div class="feature-icon">📝</div>
                <div class="feature-text">
                    <h3>Hands-on Projects</h3>
                    <p>Build real-world applications that you can showcase in your portfolio</p>
                </div>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon">🔍</div>
                <div class="feature-text">
                    <h3>Industry Best Practices</h3>
                    <p>Learn coding standards and methodologies used in top tech companies</p>
                </div>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon">👨‍💻</div>
                <div class="feature-text">
                    <h3>Expert Mentorship</h3>
                    <p>Get guidance from industry professionals with years of experience</p>
                </div>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon">🏆</div>
                <div class="feature-text">
                    <h3>Certification</h3>
                    <p>Earn recognized credentials that validate your skills to employers</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2><span>📚</span> Course Modules</h2>
            
            <ul class="modules-list">
                <li class="module-item">
                    <div>
                        <div class="module-title">HTML Fundamentals</div>
                        <div class="module-desc">Document structure, elements, attributes, and semantic markup</div>
                    </div>
                    <div class="module-status status-beginner">Beginner</div>
                </li>
                
                <li class="module-item">
                    <div>
                        <div class="module-title">Advanced HTML5 Features</div>
                        <div class="module-desc">Forms, multimedia, canvas, and modern HTML APIs</div>
                    </div>
                    <div class="module-status status-intermediate">Intermediate</div>
                </li>
                
                <li class="module-item">
                    <div>
                        <div class="module-title">Responsive Web Design</div>
                        <div class="module-desc">Mobile-first design, media queries, and flexible layouts</div>
                    </div>
                    <div class="module-status status-intermediate">Intermediate</div>
                </li>
                
                <li class="module-item">
                    <div>
                        <div class="module-title">Web Accessibility</div>
                        <div class="module-desc">ARIA, keyboard navigation, and inclusive design principles</div>
                    </div>
                    <div class="module-status status-advanced">Advanced</div>
                </li>
                
                <li class="module-item">
                    <div>
                        <div class="module-title">Final Project: Portfolio Website</div>
                        <div class="module-desc">Build a fully responsive, accessible personal portfolio site</div>
                    </div>
                    <div class="module-status status-advanced">Advanced</div>
                </li>
            </ul>
            
            <div class="tech-stack">
                <div class="tech-item">HTML5</div>
                <div class="tech-item">CSS3</div>
                <div class="tech-item">JavaScript</div>
                <div class="tech-item">Responsive Design</div>
                <div class="tech-item">Web Accessibility</div>
                <div class="tech-item">SEO Basics</div>
            </div>
        </div>
        
        <div class="cta-section">
            <h2>Ready to Start Your Web Development Journey?</h2>
            <p>Our HTML Tutorials program will equip you with the skills employers are looking for in today's digital economy.</p>
            <a href="#" class="cta-button">Enroll Now</a>
        </div>
    </div>
    
    <script>
        // Animate progress bars on page load
        document.addEventListener('DOMContentLoaded', function() {
            const progressBars = document.querySelectorAll('.progress-fill');
            
            setTimeout(() => {
                progressBars.forEach(bar => {
                    const value = bar.getAttribute('data-value');
                    bar.style.width = value + '%';
                });
            }, 300);
        });
    </script>
</body>
</html>
