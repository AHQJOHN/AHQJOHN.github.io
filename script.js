// ===================================
// JAVASCRIPT - Md. Ashfaqul Haque Portfolio
// ===================================

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ===================================
// Media Management with localStorage
// ===================================

// Load media from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadAllMedia();
});

function loadAllMedia() {
    const mediaData = JSON.parse(localStorage.getItem('projectMedia')) || {};
    
    Object.keys(mediaData).forEach(projectId => {
        const container = document.getElementById(`${projectId}-media`);
        if (container) {
            container.innerHTML = '';
            mediaData[projectId].forEach((item, index) => {
                addMediaToGallery(projectId, item, index);
            });
        }
    });
}

function saveMediaToStorage(projectId, mediaItem) {
    const mediaData = JSON.parse(localStorage.getItem('projectMedia')) || {};
    
    if (!mediaData[projectId]) {
        mediaData[projectId] = [];
    }
    
    mediaData[projectId].push(mediaItem);
    localStorage.setItem('projectMedia', JSON.stringify(mediaData));
}

function removeMediaFromStorage(projectId, index) {
    const mediaData = JSON.parse(localStorage.getItem('projectMedia')) || {};
    
    if (mediaData[projectId]) {
        mediaData[projectId].splice(index, 1);
        localStorage.setItem('projectMedia', JSON.stringify(mediaData));
    }
}

function addMediaToGallery(projectId, item, index) {
    const container = document.getElementById(`${projectId}-media`);
    if (!container) return;
    
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'media-item';
    
    if (item.type === 'video') {
        mediaDiv.innerHTML = `
            <iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>
            <div class="media-caption">${item.caption || ''}</div>
            <button class="remove-media-btn" onclick="removeMedia('${projectId}', ${index})">&times;</button>
        `;
    } else {
        mediaDiv.innerHTML = `
            <img src="${item.url}" alt="${item.caption || 'Project image'}" onclick="window.open('${item.url}', '_blank')">
            <div class="media-caption">${item.caption || ''}</div>
            <button class="remove-media-btn" onclick="removeMedia('${projectId}', ${index})">&times;</button>
        `;
    }
    
    container.appendChild(mediaDiv);
}

function removeMedia(projectId, index) {
    if (confirm('Are you sure you want to remove this media?')) {
        removeMediaFromStorage(projectId, index);
        loadAllMedia();
    }
}

// ===================================
// Media Modal
// ===================================

let currentProject = '';
let currentMediaType = '';

function openMediaModal(projectId, mediaType) {
    currentProject = projectId;
    currentMediaType = mediaType;
    const modal = document.getElementById('mediaModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modal && modalTitle) {
        modalTitle.textContent = `Add ${mediaType === 'video' ? 'Video' : 'Image'} - ${projectId}`;
        modal.style.display = 'block';
    }
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    const form = document.getElementById('mediaForm');
    
    if (modal) {
        modal.style.display = 'none';
    }
    
    if (form) {
        form.reset();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('mediaModal');
    if (event.target === modal) {
        closeMediaModal();
    }
}

// Media Form Submission
const mediaForm = document.getElementById('mediaForm');
if (mediaForm) {
    mediaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const url = document.getElementById('mediaUrl').value;
        const caption = document.getElementById('mediaCaption').value;
        const embedUrl = convertGoogleDriveUrl(url, currentMediaType);
        
        const mediaItem = {
            type: currentMediaType,
            url: embedUrl,
            caption: caption,
            originalUrl: url
        };
        
        saveMediaToStorage(currentProject, mediaItem);
        loadAllMedia();
        closeMediaModal();
    });
}

function convertGoogleDriveUrl(url, type) {
    // Convert Google Drive sharing URL to direct embed URL
    const fileIdMatch = url.match(/\/d\/(.+?)\/|id=(.+?)(&|$)/);
    
    if (fileIdMatch) {
        const fileId = fileIdMatch[1] || fileIdMatch[2];
        if (type === 'video') {
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } else {
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
    }
    
    return url;
}

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Store in localStorage (for demo purposes)
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success message
            const formMessage = document.getElementById('formMessage');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
        }, 2000);
        
        // In production, replace the above with actual API call:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle success
        })
        .catch(error => {
            // Handle error
        });
        */
    });
}

// ===================================
// FAQ Accordion
// ===================================

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.expertise-card, .project-card, .research-item, .skill-card, .service-card');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// ===================================
// Skill Bar Animation
// ===================================

const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===================================
// Statistics Counter Animation
// ===================================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    if (!stat.textContent.includes('+') && !stat.textContent.includes('%')) {
        statsObserver.observe(stat);
    }
});

// ===================================
// Back to Top Button
// ===================================

// Create back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0)';
});

// ===================================
// Console Easter Egg
// ===================================

console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cLooking for an AI/ML Engineer?', 'color: #764ba2; font-size: 16px;');
console.log('%cContact: ahq.john@gmail.com', 'color: #333; font-size: 14px;');
console.log('%cLinkedIn: linkedin.com/in/ashfaqul-haque-john', 'color: #0077b5; font-size: 14px;');
