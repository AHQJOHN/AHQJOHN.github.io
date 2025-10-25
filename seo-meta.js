// SEO Meta Tags Dynamic Injection

function initializeSEO() {
    const seoSettings = JSON.parse(localStorage.getItem('seoSettings')) || getDefaultSEO();
    
    // Set title
    if (seoSettings.homeTitle) {
        document.title = seoSettings.homeTitle;
    }
    
    // Set meta description
    setMetaTag('description', seoSettings.homeDescription);
    
    // Set meta keywords
    setMetaTag('keywords', seoSettings.homeKeywords);
    
    // Open Graph tags
    setMetaTag('og:title', seoSettings.ogTitle || seoSettings.homeTitle, 'property');
    setMetaTag('og:description', seoSettings.ogDescription || seoSettings.homeDescription, 'property');
    setMetaTag('og:image', seoSettings.ogImage, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', window.location.href, 'property');
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', seoSettings.ogTitle || seoSettings.homeTitle);
    setMetaTag('twitter:description', seoSettings.ogDescription || seoSettings.homeDescription);
    setMetaTag('twitter:image', seoSettings.ogImage);
    
    // Structured Data (Schema.org)
    if (seoSettings.schemaData) {
        injectStructuredData(seoSettings.schemaData);
    }
}

function setMetaTag(name, content, attribute = 'name') {
    if (!content) return;
    
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
}

function injectStructuredData(schemaData) {
    try {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = schemaData;
        document.head.appendChild(script);
    } catch (error) {
        console.error('Error injecting structured data:', error);
    }
}

function getDefaultSEO() {
    return {
        homeTitle: 'Md. Ashfaqul Haque - Senior AI/ML Engineer | Computer Vision Expert',
        homeDescription: 'Senior AI/ML Engineer specializing in Computer Vision, Deep Learning, Edge Deployment. 15,000+ annotations, 9+ research publications, 20+ industrial projects. Available for consulting and PhD collaboration.',
        homeKeywords: 'AI engineer Bangladesh, ML engineer, computer vision expert, deep learning, YOLO, PyTorch, TensorFlow, edge AI deployment, data annotation, research collaboration, PhD opportunities, AI consulting, Bengali ANPR, container tracking, industrial AI',
        ogTitle: 'Md. Ashfaqul Haque - AI/ML Engineer Portfolio',
        ogDescription: 'Experienced AI/ML Engineer with expertise in computer vision, deep learning, and real-world AI deployments. Open for projects and research collaboration.',
        ogImage: 'https://yourdomain.com/og-image.jpg',
        schemaData: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Md. Ashfaqul Haque",
            "jobTitle": "Senior AI/ML Engineer",
            "description": "AI/ML Engineer specializing in Computer Vision and Deep Learning",
            "url": "https://yourdomain.com",
            "email": "ahq.john@gmail.com",
            "telephone": "+8801792895969",
            "sameAs": [
                "https://www.linkedin.com/in/ashfaqul-haque-john",
                "https://github.com/AHQJOHN",
                "https://www.researchgate.net/profile/Md-Ashfaqul-Haque"
            ],
            "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Computer Vision",
                "Deep Learning",
                "PyTorch",
                "TensorFlow",
                "YOLO",
                "Object Detection",
                "Edge AI Deployment"
            ],
            "alumniOf": [
                {
                    "@type": "Organization",
                    "name": "Brac University",
                    "sameAs": "https://www.bracu.ac.bd"
                },
                {
                    "@type": "Organization",
                    "name": "RUET",
                    "sameAs": "https://www.ruet.ac.bd"
                }
            ]
        })
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeSEO);
