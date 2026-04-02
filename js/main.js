document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------------------------
       Navbar Scroll Effect
    ----------------------------------------------------------- */
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* -----------------------------------------------------------
       Mobile Menu Toggle
    ----------------------------------------------------------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li a");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when a link is clicked
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  /* -----------------------------------------------------------
       Scroll Reveal Animations
    ----------------------------------------------------------- */
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  }

  // Initial check
  revealOnScroll();

  // Check on scroll
  window.addEventListener("scroll", revealOnScroll);

  /* -----------------------------------------------------------
       Dynamic Gallery Generation & Lightbox
    ----------------------------------------------------------- */
  const galleryContainer = document.getElementById("gallery-container");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.querySelector(".close-lightbox");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const images = typeof propertyGallery !== 'undefined' ? propertyGallery : [];

  const basePath = typeof propertyBasePath !== 'undefined' ? propertyBasePath : "";
  let currentImageIndex = 0;
  let filteredImages = [...images];

  // Generate Gallery Grid
  function renderGallery() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";

    filteredImages.forEach((imgObj, index) => {
      const item = document.createElement("div");
      item.className = "gallery-item scroll-reveal active";
      item.style.animationDelay = `${(index % 3) * 0.1}s`;

      const imgUrl = encodeURI(`${basePath}${imgObj.src}`);
      item.innerHTML = `
                <img src="${imgUrl}" alt="Condominium Gallery Image ${index + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;

      item.addEventListener("click", () => openLightbox(index));
      galleryContainer.appendChild(item);
    });
  }

  if (galleryContainer) {
    renderGallery();

    // Setup Filters
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");
        
        // Firebase Analytics Event
        if (window.logFirebaseEvent) {
          window.logFirebaseEvent("select_content", {
            content_type: "gallery_filter",
            item_id: filterValue
          });
        }

        if (filterValue === "all") {
          filteredImages = [...images];
        } else {
          filteredImages = images.filter((img) => img.category === filterValue);
        }
        renderGallery();
      });
    });
  }

  /* Lightbox Logic */
  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling behind lightbox
    
    // Firebase Analytics Event
    if (window.logFirebaseEvent && filteredImages[currentImageIndex]) {
      window.logFirebaseEvent("view_item", {
        content_type: "gallery_image",
        item_category: filteredImages[currentImageIndex].category,
        item_id: filteredImages[currentImageIndex].src
      });
    }
  }

  function closeLightboxModal() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function updateLightboxImage() {
    if (filteredImages[currentImageIndex]) {
      lightboxImg.src = encodeURI(`${basePath}${filteredImages[currentImageIndex].src}`);
    }
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
  }

  // Event Listeners for Lightbox
  if (closeLightbox)
    closeLightbox.addEventListener("click", closeLightboxModal);
  if (nextBtn) nextBtn.addEventListener("click", showNextImage);
  if (prevBtn) prevBtn.addEventListener("click", showPrevImage);

  // Close on overlay click
  window.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightboxModal();
    }
  });

  // Keyboard navigation for Lightbox
  window.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "Escape") closeLightboxModal();
    }
  });

  /* -----------------------------------------------------------
       Form Submission mock
    ----------------------------------------------------------- */
  const form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      const originalText = btn.textContent;

      btn.textContent = "Sending...";
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        btn.textContent = "Message Sent Successfully!";
        btn.style.backgroundColor = "#2c3e50";
        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = "";
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* -----------------------------------------------------------
       Language Switcher Logic
    ----------------------------------------------------------- */
  const langSelect = document.getElementById("lang-select");
  if (langSelect && typeof translations !== "undefined") {
    // Check local storage for saved language or default to 'th'
    let currentLang = localStorage.getItem("preferredLang") || "th";
    langSelect.value = currentLang;

    function applyTranslations(lang) {
      document.documentElement.lang = lang;
      
      const currentTranslations = { ...(translations[lang] || {}) };
      if (typeof propertyContent !== 'undefined' && propertyContent[lang]) {
        Object.assign(currentTranslations, propertyContent[lang]);
      }
      
      // Translate innerHTML (to support strong tags etc)
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (currentTranslations[key]) {
          el.innerHTML = currentTranslations[key];
        }
      });
      
      // Translate placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (currentTranslations[key]) {
          el.placeholder = currentTranslations[key];
        }
      });
    }

    // Apply initial translation
    applyTranslations(currentLang);

    // Listen for changes
    langSelect.addEventListener("change", (e) => {
      currentLang = e.target.value;
      localStorage.setItem("preferredLang", currentLang);
      applyTranslations(currentLang);
      
      // Firebase Analytics Event
      if (window.logFirebaseEvent) {
        window.logFirebaseEvent("select_content", {
          content_type: "language_switch",
          item_id: currentLang
        });
      }
    });
  }
});
