// Form Validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const enquiryForm = document.getElementById('enquiryForm');
  
  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      
      const isValid = validateContactForm();
      
      if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      }
    });
  }
  
  // Enquiry Form
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      
      const isValid = validateEnquiryForm();
      
      if (isValid) {
        alert('Thank you for your enquiry! We will respond with detailed information soon.');
        enquiryForm.reset();
      }
    });
  }
  
  // Lightbox functionality
  initLightbox();
});

// Contact Form Validation
function validateContactForm() {
  let isValid = true;
  
  // Name validation
  const name = document.getElementById('name');
  if (!name.value.trim()) {
    showError('nameError', 'Please enter your full name');
    isValid = false;
  }
  
  // Email validation
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError('emailError', 'Please enter your email address');
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Subject validation
  const subject = document.getElementById('subject');
  if (!subject.value) {
    showError('subjectError', 'Please select a subject');
    isValid = false;
  }
  
  // Message validation
  const message = document.getElementById('message');
  if (!message.value.trim()) {
    showError('messageError', 'Please enter your message');
    isValid = false;
  }
  
  return isValid;
}

// Enquiry Form Validation
function validateEnquiryForm() {
  let isValid = true;
  
  // Enquiry Type validation
  const enquiryType = document.getElementById('enquiryType');
  if (!enquiryType.value) {
    showError('enquiryTypeError', 'Please select an enquiry type');
    isValid = false;
  }
  
  // Name validation
  const name = document.getElementById('name');
  if (!name.value.trim()) {
    showError('nameError', 'Please enter your full name');
    isValid = false;
  }
  
  // Email validation
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError('emailError', 'Please enter your email address');
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Phone validation (required for enquiries)
  const phone = document.getElementById('phone');
  if (!phone.value.trim()) {
    showError('phoneError', 'Please enter your phone number');
    isValid = false;
  }
  
  // Message validation
  const message = document.getElementById('message');
  if (!message.value.trim()) {
    showError('messageError', 'Please enter your enquiry details');
    isValid = false;
  }
  
  return isValid;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => {
    element.style.display = 'none';
  });
}

// Lightbox functionality
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  let images = [];
  
  // Get all product images on the page
  const productImages = document.querySelectorAll('.product img');
  
  // Set up image array for lightbox
  productImages.forEach((img, index) => {
    images.push({
      src: img.src,
      caption: img.nextElementSibling ? img.nextElementSibling.textContent : ''
    });
    
    // Add click event to open lightbox
    img.addEventListener('click', function() {
      currentImageIndex = index;
      openLightbox();
    });
  });
  
  // Open lightbox
  function openLightbox() {
    if (images.length > 0) {
      lightbox.style.display = 'flex';
      updateLightbox();
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Update lightbox content
  function updateLightbox() {
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].caption;
  }
  
  // Navigate to previous image
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightbox();
  }
  
  // Navigate to next image
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightbox();
  }
  
  // Event listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  
  // Close lightbox when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox && lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  });
}