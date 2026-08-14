/* =========================================
   BIBEK BHATTARAI PORTFOLIO - JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // 2. Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        htmlElement.classList.add('dark');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                htmlElement.classList.add('light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 3. Mobile Menu Handling
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu && mobileCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 4. Resume Modal Trigger & Global Attachments
    const resumeBtn = document.getElementById('resumeBtn');
    const resumeModal = document.getElementById('resumeModal');

    if (resumeBtn && resumeModal) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Attach global functions to window so HTML inline onclick attributes work cleanly
    window.openResumeModal = function(e) {
        if (e) e.preventDefault();
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeResumeModal = function() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    window.closeResumeModalOutside = function(event) {
        if (event.target === resumeModal) {
            window.closeResumeModal();
        }
    };

    // 5. Contact Form Submission Handler with Web3Forms
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const result = await response.json();

                if (response.status === 200) {
                    formSuccess.style.display = 'block';
                    formSuccess.style.backgroundColor = 'rgba(34, 197, 94, 0.15)';
                    formSuccess.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                    formSuccess.style.color = '#22c55e';
                    formSuccess.innerHTML = 'Success! Your message has been sent to Bibek.';
                    contactForm.reset();
                } else {
                    formSuccess.style.display = 'block';
                    formSuccess.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                    formSuccess.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    formSuccess.style.color = '#ef4444';
                    formSuccess.innerHTML = result.message || 'Something went wrong. Please try again.';
                }
            } catch (error) {
                formSuccess.style.display = 'block';
                formSuccess.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                formSuccess.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                formSuccess.style.color = '#ef4444';
                formSuccess.innerHTML = 'Network error. Please check your connection.';
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 6000);
            }
        });
    }

    // 6. Project Modal Data & Handlers
    const projectData = {
        sabaithok: {
            title: "Sabaithok Nepal (Everything Nepal)",
            category: "Ambitious Platform Concept • Digital Services",
            desc: "A comprehensive digital platform concept designed around services and information relevant to Nepal. It aims to unite emergency services, healthcare, transportation, local business directory, education, and government services into a single accessible portal.",
            status: "Platform Concept & Vision",
            features: [
                "Unified Search & Voice Search functionality",
                "Location detection for nearby services",
                "Quick access hubs for Emergency, Hospitals, and Bus Tickets",
                "Comprehensive categories spanning travel, health, education, and local businesses"
            ]
        },
        sales: {
            title: "Sales & Purchase Management System",
            category: "Business Software • Full-Stack",
            desc: "Software engineered to digitize real-world business accounting and inventory processes. It includes customer tracking with PAN numbers, Bikram Sambat (Nepali) date support, automated VAT calculation, invoice generation, and export capabilities.",
            status: "In Development / Prototype",
            features: [
                "Customer & Supplier ledger management",
                "Automated VAT & professional invoice generation",
                "Nepali (Bikram Sambat) date recording",
                "Searchable bills with PDF and Excel export features"
            ]
        },
        ecommerce: {
            title: "E-Commerce Platform & Admin Panel",
            category: "Web Application • Database-Driven",
            desc: "A full-stack database-driven e-commerce architecture featuring a responsive customer shopfront and a separate, secure administration dashboard for inventory, product catalog, and order oversight.",
            status: "Practical Learning Project",
            features: [
                "Customer-facing product catalog and shopping flow",
                "Dedicated admin dashboard interface",
                "Complete product & category CRUD operations",
                "Secure authentication and database management"
            ]
        },
        healthcare: {
            title: "Healthcare Information Platform Concept",
            category: "Information Platform Architecture",
            desc: "A structured digital information portal concept designed to organize health-related data into an accessible format—categorizing medicines, diseases, symptoms, first aid guidelines, health tests, and hospital directory services.",
            status: "Information Architecture Concept",
            features: [
                "Structured medical and health information index",
                "Disease symptom mapping and first aid guides",
                "Hospital and medical service directory",
                "Designed for clean, accessible public information delivery"
            ]
        }
    };

    window.openProjectModal = function(projectId) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        const project = projectData[projectId];

        if (modal && modalBody && project) {
            modalBody.innerHTML = `
                <span class="modal-project-category">${project.category}</span>
                <h3 class="modal-project-title">${project.title}</h3>
                <p class="modal-project-desc">${project.desc}</p>
                <h4 class="modal-section-title">Key System Features:</h4>
                <ul class="modal-features-list">
                    ${project.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
                </ul>
                <p class="status-label" style="margin-top: 1.5rem; display: block;">Current Project Status: ${project.status}</p>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    window.closeProjectModalOutside = function(event) {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            window.closeProjectModal();
        }
    };
});