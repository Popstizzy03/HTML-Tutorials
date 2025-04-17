// Product data
const products = [
  {
    id: 1,
    name: "Diamond Necklace",
    price: 999.99,
    image: "./images/001.png",
    category: "necklaces",
    gender: "female",
    material: "Gold",
    images: ["./images/001.png", "./images/002.png", "./images/003.png"],
    video: "./images/reel1.mp4",
    description: "This stunning diamond necklace features a 1.5 carat brilliant-cut diamond pendant on an 18K gold chain. Perfect for special occasions or as an elegant everyday piece.",
    specs: {
      "Material": "18K Gold",
      "Diamond Weight": "1.5 carats",
      "Chain Length": "18 inches",
      "Clasp Type": "Lobster clasp",
      "Diamond Cut": "Brilliant",
      "Diamond Color": "F",
      "Diamond Clarity": "VS1"
    },
    stock: 5,
    isNew: true,
    reviews: [
      { name: "Emma L.", rating: 5, comment: "Absolutely gorgeous! The diamond sparkles beautifully and the gold chain is sturdy.", date: "2024-05-15" },
      { name: "Michael T.", rating: 4, comment: "Purchased this for my wife's anniversary. She loves it, though the clasp is a bit difficult to manage.", date: "2024-04-20" }
    ]
  },
  {
    id: 2,
    name: "Chrome Plated Ring",
    price: 1599.99,
    image: "./images/004.png",
    category: "rings",
    gender: "female",
    material: "Platinum",
    images: ["./images/004.png", "./images/001.png", "./images/002.png"],
    video: "./images/reel5.mp4",
    description: "A sophisticated chrome-plated ring with intricate detailing. This contemporary design combines modern aesthetics with traditional craftsmanship.",
    specs: {
      "Material": "Chrome-plated Platinum",
      "Band Width": "6mm",
      "Size Range": "5-12",
      "Weight": "8g",
      "Finish": "Polished",
      "Design": "Contemporary"
    },
    stock: 12,
    isFeatured: true,
    reviews: [
      { name: "Sarah K.", rating: 5, comment: "This ring exceeded my expectations. It's comfortable to wear and looks even better in person.", date: "2024-06-01" },
      { name: "James R.", rating: 5, comment: "Perfect sizing and the chrome finish is flawless. Very happy with this purchase.", date: "2024-05-12" }
    ]
  },
  {
    id: 3,
    name: "Gold Earrings",
    price: 299.99,
    image: "./images/002.png",
    category: "earrings",
    gender: "female",
    material: "Gold",
    images: ["./images/002.png", "./images/001.png", "./images/003.png"],
    video: "./images/reel2.mp4",
    description: "Elegant gold hoop earrings with subtle diamond accents. Lightweight and comfortable for all-day wear.",
    specs: {
      "Material": "14K Gold",
      "Diameter": "25mm",
      "Diamond Accents": "0.25 carats total",
      "Backing": "Push back",
      "Weight": "3g each"
    },
    stock: 8,
    reviews: [
      { name: "Priya M.", rating: 4, comment: "These earrings are beautiful and lightweight. The gold color is rich and warm.", date: "2024-05-18" },
      { name: "Rebecca T.", rating: 5, comment: "Perfect size - not too large or small. The diamond accents catch the light beautifully.", date: "2024-04-30" }
    ]
  },
  {
    id: 4,
    name: "Silver Bracelet",
    price: 149.99,
    image: "./images/003.png",
    category: "bracelets",
    gender: "male",
    material: "Silver",
    images: ["./images/003.png", "./images/002.png", "./images/001.png"],
    video: "./images/reel3.mp4",
    description: "A handcrafted silver link bracelet with a unique toggle clasp. This versatile piece can be worn casually or dressed up for formal occasions.",
    specs: {
      "Material": "Sterling Silver 925",
      "Length": "8.5 inches",
      "Width": "10mm",
      "Clasp": "Toggle",
      "Weight": "35g",
      "Pattern": "Chain link"
    },
    stock: 15,
    onSale: true,
    originalPrice: 199.99,
    reviews: [
      { name: "David L.", rating: 5, comment: "Great quality bracelet that goes with everything. The toggle clasp is secure and easy to use.", date: "2024-06-05" },
      { name: "Thomas W.", rating: 4, comment: "Solid construction and nice weight. Looks more expensive than it is.", date: "2024-05-22" }
    ]
  },
  {
    id: 5,
    name: "Platinum Ring",
    price: 599.99,
    image: "./images/004.png",
    category: "rings",
    gender: "female",
    material: "Platinum",
    images: ["./images/004.png", "./images/001.png", "./images/003.png"],
    video: "./images/reel4.mp4",
    description: "A sleek platinum ring with a modern design. This ring features a smooth, comfortable fit and subtle engraving on the inner band.",
    specs: {
      "Material": "Pure Platinum (950)",
      "Band Width": "4mm",
      "Size Range": "4-10",
      "Weight": "6g",
      "Finish": "High polish",
      "Design": "Comfort fit"
    },
    stock: 7,
    reviews: [
      { name: "Laura J.", rating: 5, comment: "This platinum ring is stunning in its simplicity. The quality is excellent.", date: "2024-05-28" },
      { name: "Melissa H.", rating: 5, comment: "Perfect as a wedding band. Very comfortable and the platinum has a beautiful luster.", date: "2024-05-14" }
    ]
  },
  {
    id: 6,
    name: "Men's Wedding Band",
    price: 699.99,
    image: "./images/004.png",
    category: "rings",
    gender: "male",
    material: "Platinum",
    images: ["./images/004.png", "./images/001.png", "./images/002.png"],
    video: "./images/reel5.mp4",
    description: "A sophisticated men's wedding band crafted from premium platinum. Features a brushed finish with polished edges for a contemporary look.",
    specs: {
      "Material": "Platinum (950)",
      "Band Width": "7mm",
      "Size Range": "7-14",
      "Weight": "12g",
      "Finish": "Brushed with polished edges",
      "Profile": "Flat"
    },
    stock: 9,
    reviews: [
      { name: "Robert C.", rating: 5, comment: "Excellent craftsmanship and comfortable fit. The brushed finish is subtle and masculine.", date: "2024-06-10" },
      { name: "John M.", rating: 4, comment: "Great quality ring. Slightly heavier than expected but feels substantial and well-made.", date: "2024-05-25" }
    ]
  },
  {
    id: 7,
    name: "Luxury Chronograph Watch",
    price: 1299.99,
    image: "./images/004.png",
    category: "watches",
    gender: "male",
    material: "Stainless Steel",
    images: ["./images/004.png", "./images/001.png", "./images/003.png"],
    video: "./images/reel5.mp4",
    description: "A premium chronograph watch with a sophisticated design. Features a stainless steel case and bracelet, sapphire crystal, and automatic movement.",
    specs: {
      "Case Material": "316L Stainless Steel",
      "Case Diameter": "42mm",
      "Movement": "Automatic",
      "Water Resistance": "100m",
      "Crystal": "Sapphire",
      "Bracelet": "Stainless Steel",
      "Functions": "Chronograph, Date"
    },
    stock: 4,
    isNew: true,
    reviews: [
      { name: "Alex T.", rating: 5, comment: "Exceptional timepiece. The movement is accurate and the design is timeless.", date: "2024-06-15" },
      { name: "William P.", rating: 4, comment: "Beautiful watch with great attention to detail. The chronograph functions work smoothly.", date: "2024-05-30" }
    ]
  },
  {
    id: 8,
    name: "Designer Wedding Dress",
    price: 2499.99,
    image: "./images/004.png",
    category: "wedding-dresses",
    gender: "female",
    material: "Silk & Lace",
    images: ["./images/004.png", "./images/001.png", "./images/002.png"],
    video: "./images/reel5.mp4",
    description: "An exquisite designer wedding dress featuring delicate lace detailing and hand-sewn pearl embellishments. The flowing silk skirt creates a romantic silhouette.",
    specs: {
      "Material": "Silk, Lace, Tulle",
      "Embellishments": "Pearls, Crystal beading",
      "Closure": "Hidden zipper with covered buttons",
      "Train Length": "Cathedral (6-8 feet)",
      "Silhouette": "A-line",
      "Available Sizes": "2-20",
      "Color Options": "White, Ivory, Champagne"
    },
    stock: 3,
    isFeatured: true,
    reviews: [
      { name: "Jennifer B.", rating: 5, comment: "The most beautiful dress I could have imagined. The lace detailing is exquisite.", date: "2024-06-12" },
      { name: "Sophia L.", rating: 5, comment: "Worth every penny. The craftsmanship is exceptional and it fit like a dream after alterations.", date: "2024-05-28" }
    ]
  }
];

// ============= DOM Elements =============

// Header & Navigation
const header = document.querySelector('.header');
const hamburgerBtn = document.getElementById('hamburger');
const navPopup = document.getElementById('popup-menu');
const navPopupClose = document.querySelector('.nav-popup-close');
const searchToggle = document.getElementById('search-toggle');
const searchPopup = document.getElementById('search-popup');
const searchPopupClose = document.querySelector('.search-popup-close');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const searchResultsList = document.getElementById('search-results-list');
const mainNavLinks = document.querySelectorAll('.main-nav-list a');

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');

// Cart
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartPopup = document.getElementById('cart-popup');
const closeCartBtn = document.querySelector('.close-cart');
const cartItems = document.getElementById('cart-items');
const subtotalValue = document.querySelector('.subtotal-value');
const totalValue = document.querySelector('.total-value');
const checkoutBtn = document.getElementById('checkout-btn');

// Wishlist
const wishlistBtn = document.getElementById('wishlist-btn');
const wishlistPopup = document.getElementById('wishlist-popup');
const closeWishlistBtn = document.querySelector('.close-wishlist');
const wishlistItems = document.getElementById('wishlist-items');

// Compare
const compareBtn = document.getElementById('compare-btn');
const compareCount = document.getElementById('compare-count');
const comparisonPopup = document.getElementById('comparison-popup');
const comparisonClose = document.querySelector('.comparison-close');
const comparisonItems = document.getElementById('comparison-items');
const clearComparisonBtn = document.getElementById('clear-comparison');
const compareNowBtn = document.getElementById('compare-button');

// Product Popups
const overlay = document.getElementById('overlay');
const productPopup = document.getElementById('product-popup');
const quickViewPopup = document.getElementById('quick-view-popup');
const closePopupBtn = document.querySelector('.close-popup');
const closeQuickViewBtn = document.querySelector('#quick-view-popup .close-popup');

// Image Zoom
const zoomedImageContainer = document.getElementById('zoomed-image-container');
const zoomedImage = document.querySelector('.zoomed-image');
const zoomedImageClose = document.querySelector('.zoomed-image-close');

// Product Filters
const categoryButtons = document.querySelectorAll('.category-button');
const genderButtons = document.querySelectorAll('.gender-button');
const minPriceInput = document.getElementById('min-price-input');
const maxPriceInput = document.getElementById('max-price-input');
const minPriceDisplay = document.getElementById('min-price-display');
const maxPriceDisplay = document.getElementById('max-price-display');
const sliderMinHandle = document.getElementById('slider-min-handle');
const sliderMaxHandle = document.getElementById('slider-max-handle');
const sliderTrack = document.getElementById('price-slider-track');
const applyPriceFilterBtn = document.getElementById('apply-price-filter');

// Product Display
const productsContainer = document.getElementById('products-container');
const productsLoading = document.getElementById('products-loading');
const noProductsMessage = document.getElementById('no-products');
const recentlyViewedCarousel = document.getElementById('recently-viewed-carousel');
const carouselPrevBtn = document.querySelector('.carousel-controls .prev');
const carouselNextBtn = document.querySelector('.carousel-controls .next');

// Hero Slider
const prevSlide = document.querySelector('.prev');
const nextSlide = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

// Notification
const notification = document.getElementById('notification');
const notificationTitle = document.querySelector('.notification-title');
const notificationMessage = document.querySelector('.notification-message');
const notificationIcon = document.querySelector('.notification-icon');
const notificationClose = document.querySelector('.notification-close');

// Form Elements
const newsletterForm = document.querySelector('.newsletter-form');

// ============= State =============
let cart = [];
let wishlist = [];
let compareList = [];
let recentlyViewed = [];
let currentSlide = 0;
let slideInterval;
let selectedCategory = 'all';
let selectedGender = 'all';
let priceRange = {
  min: 0,
  max: 3000
};
let isDragging = false;
let currentHandle = null;
let activeSection = 'home';
let popupProduct = null;
let quickViewProduct = null;

// ============= Initialize =============
function init() {
  // Simulate loading
  setTimeout(() => {
    productsLoading.style.display = 'none';
    productsContainer.style.display = 'grid';
    renderProducts();
  }, 1000);
  
  setupEventListeners();
  setupSlider();
  setupPriceSlider();
  checkPreferredTheme();
  updateCartCount();
  updateWishlistCount();
  updateCompareCount();
  
  // Initialize active navigation
  updateActiveNavLink();
}

// ============= Setup Event Listeners =============
function setupEventListeners() {
  // Header scroll effects
  window.addEventListener('scroll', handleScroll);
  
  // Navigation
  hamburgerBtn.addEventListener('click', toggleNav);
  navPopupClose.addEventListener('click', closeNav);
  
  document.querySelectorAll('.nav-list a, .main-nav-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      closeNav();
      
      if (target.startsWith('#')) {
        const section = document.querySelector(target);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Search
  searchToggle.addEventListener('click', toggleSearch);
  searchPopupClose.addEventListener('click', closeSearch);
  searchInput.addEventListener('input', handleSearchInput);
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') performSearch();
  });
  
  // Theme Toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Cart
  cartBtn.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', closeCart);
  
  // Wishlist
  wishlistBtn.addEventListener('click', toggleWishlist);
  closeWishlistBtn.addEventListener('click', closeWishlist);
  
  // Compare
  compareBtn?.addEventListener('click', toggleCompare);
  comparisonClose?.addEventListener('click', closeCompare);
  clearComparisonBtn?.addEventListener('click', clearCompare);
  
  // Overlays
  overlay.addEventListener('click', closeAllPopups);
  
  // Product Popup
  closePopupBtn.addEventListener('click', closeProductPopup);
  closeQuickViewBtn.addEventListener('click', closeQuickView);
  
  // Image Zoom
  zoomedImageClose.addEventListener('click', closeZoom);
  zoomedImageContainer.addEventListener('click', e => {
    if (e.target === zoomedImageContainer) closeZoom();
  });
  
  // Product Filters
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedCategory = button.dataset.category;
      renderProducts();
    });
  });
  
  genderButtons.forEach(button => {
    button.addEventListener('click', () => {
      genderButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedGender = button.dataset.gender;
      renderProducts();
    });
  });
  
  applyPriceFilterBtn.addEventListener('click', () => {
    priceRange.min = parseInt(minPriceInput.value) || 0;
    priceRange.max = parseInt(maxPriceInput.value) || 3000;
    updatePriceSlider();
    renderProducts();
  });
  
  // Price range inputs
  minPriceInput.addEventListener('change', () => {
    const value = parseInt(minPriceInput.value) || 0;
    priceRange.min = Math.min(value, priceRange.max - 100);
    minPriceInput.value = priceRange.min;
    updatePriceSlider();
  });
  
  maxPriceInput.addEventListener('change', () => {
    const value = parseInt(maxPriceInput.value) || 3000;
    priceRange.max = Math.max(value, priceRange.min + 100);
    maxPriceInput.value = priceRange.max;
    updatePriceSlider();
  });
  
  // Hero Slider
  prevSlide.addEventListener('click', () => changeSlide(-1));
  nextSlide.addEventListener('click', () => changeSlide(1));
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide();
    });
  });
  
  // Carousel controls
  carouselPrevBtn.addEventListener('click', scrollCarouselLeft);
  carouselNextBtn.addEventListener('click', scrollCarouselRight);
  
  // Back to Top
  backToTopBtn.addEventListener('click', scrollToTop);
  
  // Notification
  notificationClose.addEventListener('click', hideNotification);
  
  // Forms
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
      newsletterForm.reset();
      showNotification('success', 'Subscription Successful', 'Thank you for subscribing to our newsletter!');
    }
  });
  
  // Intersection Observer for sections
  setupIntersectionObserver();
}

// ============= Theme Management =============
function checkPreferredTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      document.documentElement.classList.add('dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  
  if (document.documentElement.classList.contains('dark')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// ============= Navigation & Header =============
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
  
  // Update active nav links
  updateActiveNavLink();
}

function updateActiveNavLink() {
  // Get current scroll position
  const scrollPosition = window.scrollY + 100;
  
  // Get all sections
  const sections = document.querySelectorAll('section[id]');
  
  // Find current section
  let currentSection = 'home';
  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section.id;
    }
  });
  
  // Update active class
  if (currentSection !== activeSection) {
    activeSection = currentSection;
    
    // Update desktop nav
    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
    
    // Update mobile nav
    document.querySelectorAll('.nav-list a').forEach(link => {
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.style.color = 'var(--primary-color)';
      } else {
        link.style.color = '';
      }
    });
  }
}

function toggleNav() {
  navPopup.classList.toggle('show');
  closeSearch();
}

function closeNav() {
  navPopup.classList.remove('show');
}

function toggleSearch() {
  searchPopup.classList.toggle('show');
  closeNav();
  
  if (searchPopup.classList.contains('show')) {
    searchInput.focus();
  }
}

function closeSearch() {
  searchPopup.classList.remove('show');
}

function handleSearchInput() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query.length < 2) {
    searchResults.classList.remove('show');
    return;
  }
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.material.toLowerCase().includes(query)
  );
  
  if (filteredProducts.length === 0) {
    searchResultsList.innerHTML = `
      <div class="search-no-results">
        <p>No results found for "${query}"</p>
      </div>
    `;
  } else {
    searchResultsList.innerHTML = '';
    
    filteredProducts.slice(0, 5).forEach(product => {
      const item = document.createElement('li');
      item.className = 'search-result-item';
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="search-result-image">
        <div class="search-result-info">
          <div class="search-result-name">${product.name}</div>
          <div class="search-result-price">K${product.price.toFixed(2)}</div>
          <div class="search-result-category">${product.category}</div>
        </div>
      `;
      
      item.addEventListener('click', () => {
        closeSearch();
        showProductDetails(product);
      });
      
      searchResultsList.appendChild(item);
    });
  }
  
  searchResults.classList.add('show');
}

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query.length < 2) return;
  
  closeSearch();
  
  // Scroll to shop section
  const shopSection = document.getElementById('shop');
  window.scrollTo({
    top: shopSection.offsetTop - 80,
    behavior: 'smooth'
  });
  
  // Find the most relevant category for the search
  let matchedCategory = 'all';
  categoryButtons.forEach(button => {
    const category = button.dataset.category;
    if (query.includes(category)) {
      matchedCategory = category;
    }
  });
  
  // Update category buttons
  categoryButtons.forEach(button => {
    button.classList.remove('active');
    if (button.dataset.category === matchedCategory) {
      button.classList.add('active');
    }
  });
  
  selectedCategory = matchedCategory;
  
  // Update UI
  setTimeout(() => {
    showNotification('info', 'Search Results', `Showing results for "${query}"`);
    
    // Filter and render products
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.material.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    
    renderFilteredProducts(filteredProducts);
  }, 300);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ============= Hero Slider =============
function setupSlider() {
  showSlide();
  startSlideshow();
}

function showSlide() {
  const slides = document.querySelectorAll('.slide');
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide();
  resetSlideshow();
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 6000);
}

function resetSlideshow() {
  clearInterval(slideInterval);
  startSlideshow();
}

// ============= Price Slider =============
function setupPriceSlider() {
  // Initial setup
  updatePriceSlider();
  
  // Min handle events
  sliderMinHandle.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    currentHandle = 'min';
    document.addEventListener('mousemove', handleSliderDrag);
    document.addEventListener('mouseup', stopSliderDrag);
  });
  
  sliderMinHandle.addEventListener('touchstart', e => {
    isDragging = true;
    currentHandle = 'min';
    document.addEventListener('touchmove', handleSliderDrag);
    document.addEventListener('touchend', stopSliderDrag);
  });
  
  // Max handle events
  sliderMaxHandle.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    currentHandle = 'max';
    document.addEventListener('mousemove', handleSliderDrag);
    document.addEventListener('mouseup', stopSliderDrag);
  });
  
  sliderMaxHandle.addEventListener('touchstart', e => {
    isDragging = true;
    currentHandle = 'max';
    document.addEventListener('touchmove', handleSliderDrag);
    document.addEventListener('touchend', stopSliderDrag);
  });
}

function handleSliderDrag(e) {
  if (!isDragging) return;
  
  const sliderRect = document.querySelector('.slider-container').getBoundingClientRect();
  const sliderWidth = sliderRect.width;
  
  // Get position
  let clientX;
  if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX;
  } else {
    clientX = e.clientX;
  }
  
  // Calculate position percent
  let percent = Math.min(Math.max(0, (clientX - sliderRect.left) / sliderWidth), 1);
  
  // Update correct handle
  if (currentHandle === 'min') {
    // Ensure min doesn't go beyond max
    const maxPercent = (priceRange.max - 0) / 3000;
    percent = Math.min(percent, maxPercent - 0.05);
    
    // Update value
    priceRange.min = Math.round(percent * 3000);
    minPriceInput.value = priceRange.min;
  } else {
    // Ensure max doesn't go below min
    const minPercent = (priceRange.min - 0) / 3000;
    percent = Math.max(percent, minPercent + 0.05);
    
    // Update value
    priceRange.max = Math.round(percent * 3000);
    maxPriceInput.value = priceRange.max;
  }
  
  updatePriceSlider();
}

function stopSliderDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', handleSliderDrag);
  document.removeEventListener('mouseup', stopSliderDrag);
  document.removeEventListener('touchmove', handleSliderDrag);
  document.removeEventListener('touchend', stopSliderDrag);
}

function updatePriceSlider() {
  // Update input values
  minPriceInput.value = priceRange.min;
  maxPriceInput.value = priceRange.max;
  
  // Update display values
  minPriceDisplay.textContent = `K${priceRange.min}`;
  maxPriceDisplay.textContent = `K${priceRange.max}`;
  
  // Calculate percents
  const minPercent = (priceRange.min / 3000) * 100;
  const maxPercent = (priceRange.max / 3000) * 100;
  
  // Update handle positions
  sliderMinHandle.style.left = `${minPercent}%`;
  sliderMaxHandle.style.left = `${maxPercent}%`;
  
  // Update track
  sliderTrack.style.left = `${minPercent}%`;
  sliderTrack.style.width = `${maxPercent - minPercent}%`;
}

// ============= Product Rendering =============
function renderProducts() {
  // Filter products
  const filteredProducts = products.filter(product => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Gender filter
    const genderMatch = selectedGender === 'all' || product.gender === selectedGender;
    
    // Price filter
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return categoryMatch && genderMatch && priceMatch;
  });
  
  // Display message if no products match filters
  if (filteredProducts.length === 0) {
    productsContainer.style.display = 'none';
    noProductsMessage.style.display = 'block';
    return;
  }
  
  // Show products container, hide no products message
  productsContainer.style.display = 'grid';
  noProductsMessage.style.display = 'none';
  
  // Create product cards
  productsContainer.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
  
  // Render recently viewed
  renderRecentlyViewed();
}

function renderFilteredProducts(filteredProducts) {
  // Display message if no products match filters
  if (filteredProducts.length === 0) {
    productsContainer.style.display = 'none';
    noProductsMessage.style.display = 'block';
    return;
  }
  
  // Show products container, hide no products message
  productsContainer.style.display = 'grid';
  noProductsMessage.style.display = 'none';
  
  // Create product cards
  productsContainer.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCompare = compareList.some(item => item.id === product.id);
  
  const card = document.createElement('div');
  card.className = 'product-card animate-fade';
  
  // Add badge if product is new, on sale, or featured
  let badgeHTML = '';
  if (product.isNew) {
    badgeHTML = '<span class="product-badge new">New</span>';
  } else if (product.onSale) {
    badgeHTML = '<span class="product-badge sale">Sale</span>';
  } else if (product.isFeatured) {
    badgeHTML = '<span class="product-badge featured">Featured</span>';
  }
  
  // Calculate average rating
  const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
  
  card.innerHTML = `
    <div class="product-image-container">
      ${badgeHTML}
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <button class="wishlist-button ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}" aria-label="Add to wishlist">
        <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
      </button>
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        ${getStarRating(avgRating)}
      </div>
      <p class="product-price">
        ${product.onSale 
          ? `<span class="original-price">K${product.originalPrice.toFixed(2)}</span> K${product.price.toFixed(2)}`
          : `K${product.price.toFixed(2)}`
        }
      </p>
      <p class="product-material">${product.material}</p>
      <div class="product-actions">
        <button class="view-button" data-product-id="${product.id}">
          <i class="fas fa-shopping-cart"></i> View Details
        </button>
        <button class="quick-view-button" data-product-id="${product.id}">
          <i class="fas fa-eye"></i> Quick View
        </button>
      </div>
    </div>
  `;
  
  // Event listeners
  card.querySelector('.view-button').addEventListener('click', () => {
    const product = products.find(p => p.id === parseInt(card.querySelector('.view-button').dataset.productId));
    addToRecentlyViewed(product);
    showProductDetails(product);
  });
  
  card.querySelector('.quick-view-button').addEventListener('click', (e) => {
    e.stopPropagation();
    const product = products.find(p => p.id === parseInt(card.querySelector('.quick-view-button').dataset.productId));
    addToRecentlyViewed(product);
    showQuickView(product);
  });
  
  card.querySelector('.wishlist-button').addEventListener('click', (e) => {
    e.stopPropagation();
    const productId = parseInt(e.currentTarget.dataset.productId);
    const product = products.find(p => p.id === productId);
    
    toggleWishlistItem(product);
    
    // Update button state
    const isInWishlist = wishlist.some(item => item.id === productId);
    e.currentTarget.classList.toggle('active', isInWishlist);
    e.currentTarget.querySelector('i').className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
    
    updateWishlistCount();
  });
  
  return card;
}

function renderRecentlyViewed() {
  if (recentlyViewed.length === 0) {
    document.querySelector('.recently-viewed').style.display = 'none';
    return;
  }
  
  document.querySelector('.recently-viewed').style.display = 'block';
  recentlyViewedCarousel.innerHTML = '';
  
  recentlyViewed.forEach(product => {
    const item = document.createElement('div');
    item.className = 'recently-viewed-card product-card';
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    item.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <button class="wishlist-button ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}" aria-label="Add to wishlist">
          <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">K${product.price.toFixed(2)}</p>
        <button class="view-button" data-product-id="${product.id}">View Details</button>
      </div>
    `;
    
    // Event listeners
    item.querySelector('.view-button').addEventListener('click', () => {
      showProductDetails(product);
    });
    
    item.querySelector('.wishlist-button').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlistItem(product);
      
      // Update button state
      const isInWishlist = wishlist.some(item => item.id === product.id);
      e.currentTarget.classList.toggle('active', isInWishlist);
      e.currentTarget.querySelector('i').className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
      
      updateWishlistCount();
    });
    
    recentlyViewedCarousel.appendChild(item);
  });
}

function scrollCarouselLeft() {
  recentlyViewedCarousel.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

function scrollCarouselRight() {
  recentlyViewedCarousel.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}

// ============= Product Popups =============
function showProductDetails(product) {
  popupProduct = product;
  
  const gallery = document.querySelector('.product-gallery-main');
  const thumbs = document.querySelector('.product-gallery-thumbs');
  const title = document.querySelector('.product-title');
  const category = document.querySelector('.product-category');
  const rating = document.querySelector('.product-rating');
  const price = document.querySelector('.product-price-display');
  const availability = document.querySelector('.product-availability');
  const description = document.querySelector('.product-description');
  const specsTab = document.getElementById('specs-tab');
  const aboutTab = document.getElementById('about-tab');
  const reviewsTab = document.getElementById('reviews-tab');
  const relatedContainer = document.querySelector('.related-container');
  
  // Set product data
  title.textContent = product.name;
  category.textContent = product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  description.textContent = product.description;
  
  // Price display with sale price if applicable
  if (product.onSale) {
    price.innerHTML = `
      <span class="original-price">K${product.originalPrice.toFixed(2)}</span>
      K${product.price.toFixed(2)}
      <span class="discount-badge">
        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
      </span>
    `;
  } else {
    price.textContent = `K${product.price.toFixed(2)}`;
  }
  
  // Set availability
  if (product.stock > 5) {
    availability.className = 'product-availability in-stock';
    availability.innerHTML = '<i class="fas fa-check-circle"></i> In Stock';
  } else if (product.stock > 0) {
    availability.className = 'product-availability low-stock';
    availability.innerHTML = `<i class="fas fa-exclamation-circle"></i> Low Stock (${product.stock} left)`;
  } else {
    availability.className = 'product-availability out-of-stock';
    availability.innerHTML = '<i class="fas fa-times-circle"></i> Out of Stock';
  }
  
  // Set rating
  const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
  rating.innerHTML = getStarRating(avgRating) + ` <span class="rating-count">(${product.reviews.length} reviews)</span>`;
  
  // Clear existing gallery
  gallery.innerHTML = '';
  thumbs.innerHTML = '';
  
  // Add gallery controls
  gallery.innerHTML = `
    <div class="gallery-controls">
      <button class="gallery-control gallery-prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="gallery-control gallery-next">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;
  
  // Populate gallery
  product.images.forEach((img, index) => {
    // Add main image
    const mainImg = document.createElement('img');
    mainImg.src = img;
    mainImg.alt = `${product.name} - Image ${index + 1}`;
    mainImg.className = `gallery-main-image ${index === 0 ? 'active' : ''}`;
    mainImg.setAttribute('data-index', index);
    
    // Add zoom functionality
    mainImg.addEventListener('click', () => {
      zoomedImage.src = img;
      zoomedImageContainer.classList.add('show');
    });
    
    gallery.appendChild(mainImg);
    
    // Add thumbnail
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.alt = `Thumbnail ${index + 1}`;
    thumb.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
    thumb.dataset.index = index;
    thumb.dataset.type = 'image';
    thumbs.appendChild(thumb);
  });
  
  // Add video if available
  if (product.video) {
    // Add main video
    const mainVideo = document.createElement('video');
    mainVideo.src = product.video;
    mainVideo.controls = true;
    mainVideo.className = 'gallery-main-video';
    mainVideo.setAttribute('data-index', product.images.length);
    gallery.appendChild(mainVideo);
    
    // Create video thumbnail (use first frame or a placeholder)
    const videoThumb = document.createElement('div');
    videoThumb.style.backgroundImage = `url('${product.images[0]}')`;
    videoThumb.style.width = '80px';
    videoThumb.style.height = '80px';
    videoThumb.style.backgroundSize = 'cover';
    videoThumb.style.position = 'relative';
    videoThumb.style.borderRadius = 'calc(var(--border-radius) - 2px)';
    videoThumb.style.cursor = 'pointer';
    videoThumb.dataset.index = product.images.length;
    videoThumb.dataset.type = 'video';
    videoThumb.className = 'gallery-thumb';
    
    // Add play icon overlay
    videoThumb.innerHTML = `
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.3); border-radius: calc(var(--border-radius) - 2px);">
        <i class="fas fa-play" style="color: white; font-size: 1.5rem;"></i>
      </div>
    `;
    thumbs.appendChild(videoThumb);
  }
  
  // Setup gallery controls
  setupGalleryControls();
  
  // Thumbnail click handlers
  thumbs.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index);
      const type = thumb.dataset.type;
      
      // Update active thumbnail
      thumbs.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      // Hide all media
      gallery.querySelectorAll('.gallery-main-image, .gallery-main-video').forEach(item => {
        item.classList.remove('active');
        if (item.tagName === 'VIDEO') {
          item.pause();
        }
      });
      
      // Show selected media
      if (type === 'image') {
        gallery.querySelectorAll('.gallery-main-image')[index].classList.add('active');
      } else if (type === 'video') {
        const video = gallery.querySelector('.gallery-main-video');
        video.classList.add('active');
        video.play();
      }
    });
  });
  
  // Set specifications
  specsTab.innerHTML = '<div class="product-specs">';
  for (const [key, value] of Object.entries(product.specs)) {
    specsTab.innerHTML += `
      <div class="spec-item">
        <span class="spec-label">${key}:</span>
        <span class="spec-value">${value}</span>
      </div>
    `;
  }
  specsTab.innerHTML += '</div>';
  
  // Set about (description)
  aboutTab.innerHTML = `<p>${product.description}</p>`;
  
  // Set reviews
  reviewsTab.innerHTML = '<div class="product-reviews">';
  if (product.reviews.length === 0) {
    reviewsTab.innerHTML += '<p>No reviews yet. Be the first to review this product!</p>';
  } else {
    product.reviews.forEach(review => {
      reviewsTab.innerHTML += `
        <div class="review-item">
          <div class="review-header">
            <span class="review-author">${review.name}</span>
            <span class="review-date">${formatDate(review.date)}</span>
          </div>
          <div class="review-rating">${getStarRating(review.rating)}</div>
          <p>${review.comment}</p>
        </div>
      `;
    });
  }
  reviewsTab.innerHTML += '</div>';
  
  // Setup quantity
  setupQuantityControl();
  
  // Setup buttons
  setupProductButtons(product);
  
  // Display related products
  displayRelatedProducts(product, relatedContainer);
  
  // Reset tab selection to first tab
  document.querySelectorAll('.tab-button').forEach((btn, index) => {
    btn.classList.toggle('active', index === 0);
  });
  
  document.querySelectorAll('.tab-panel').forEach((panel, index) => {
    panel.classList.toggle('active', index === 0);
  });
  
  // Show popup
  overlay.classList.add('show');
  productPopup.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function setupGalleryControls() {
  const gallery = document.querySelector('.product-gallery-main');
  const thumbs = document.querySelector('.product-gallery-thumbs');
  const prevBtn = gallery.querySelector('.gallery-prev');
  const nextBtn = gallery.querySelector('.gallery-next');
  
  prevBtn.addEventListener('click', () => {
    const activeItem = gallery.querySelector('.gallery-main-image.active, .gallery-main-video.active');
    let currentIndex = parseInt(activeItem.dataset.index);
    const totalItems = gallery.querySelectorAll('.gallery-main-image, .gallery-main-video').length;
    
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    const nextItem = gallery.querySelector(`[data-index="${currentIndex}"]`);
    
    // Update active items
    gallery.querySelectorAll('.gallery-main-image, .gallery-main-video').forEach(item => {
      item.classList.remove('active');
      if (item.tagName === 'VIDEO') {
        item.pause();
      }
    });
    
    nextItem.classList.add('active');
    if (nextItem.tagName === 'VIDEO') {
      nextItem.play();
    }
    
    // Update thumbnails
    thumbs.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.classList.toggle('active', parseInt(thumb.dataset.index) === currentIndex);
    });
  });
  
  nextBtn.addEventListener('click', () => {
    const activeItem = gallery.querySelector('.gallery-main-image.active, .gallery-main-video.active');
    let currentIndex = parseInt(activeItem.dataset.index);
    const totalItems = gallery.querySelectorAll('.gallery-main-image, .gallery-main-video').length;
    
    currentIndex = (currentIndex + 1) % totalItems;
    const nextItem = gallery.querySelector(`[data-index="${currentIndex}"]`);
    
    // Update active items
    gallery.querySelectorAll('.gallery-main-image, .gallery-main-video').forEach(item => {
      item.classList.remove('active');
      if (item.tagName === 'VIDEO') {
        item.pause();
      }
    });
    
    nextItem.classList.add('active');
    if (nextItem.tagName === 'VIDEO') {
      nextItem.play();
    }
    
    // Update thumbnails
    thumbs.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.classList.toggle('active', parseInt(thumb.dataset.index) === currentIndex);
    });
  });
}

function setupQuantityControl() {
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('quantity-input');
  
  // Reset to 1
  quantityInput.value = 1;
  
  decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
  
  quantityInput.addEventListener('change', () => {
    if (quantityInput.value < 1) {
      quantityInput.value = 1;
    }
  });
}

function setupProductButtons(product) {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const buyNowBtn = document.querySelector('.buy-now-btn');
  const wishlistBtn = document.querySelector('.product-popup .wishlist-btn');
  const quantityInput = document.getElementById('quantity-input');
  
  // Reset wishlist button state
  const isInWishlist = wishlist.some(item => item.id === product.id);
  wishlistBtn.classList.toggle('active', isInWishlist);
  wishlistBtn.innerHTML = isInWishlist ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
  
  // Remove existing event listeners
  const newAddToCartBtn = addToCartBtn.cloneNode(true);
  addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);
  
  const newBuyNowBtn = buyNowBtn.cloneNode(true);
  buyNowBtn.parentNode.replaceChild(newBuyNowBtn, buyNowBtn);
  
  const newWishlistBtn = wishlistBtn.cloneNode(true);
  wishlistBtn.parentNode.replaceChild(newWishlistBtn, wishlistBtn);
  
  // Add new event listeners
  newAddToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    addToCart(product, quantity);
    showNotification('success', 'Added to Cart', `${product.name} has been added to your cart.`);
  });
  
  newBuyNowBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    addToCart(product, quantity);
    closeProductPopup();
    toggleCart();
  });
  
  newWishlistBtn.addEventListener('click', () => {
    toggleWishlistItem(product);
    
    // Update button state
    const isInWishlist = wishlist.some(item => item.id === product.id);
    newWishlistBtn.classList.toggle('active', isInWishlist);
    newWishlistBtn.innerHTML = isInWishlist ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    if (isInWishlist) {
      showNotification('info', 'Added to Wishlist', `${product.name} has been added to your wishlist.`);
    } else {
      showNotification('info', 'Removed from Wishlist', `${product.name} has been removed from your wishlist.`);
    }
  });
  
  // Social share links
  const shareLinks = document.querySelectorAll('.share-option');
  shareLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const url = window.location.href;
      const text = `Check out this ${product.name} from Deaujo Jewellery!`;
      
      if (link.classList.contains('share-facebook')) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      } else if (link.classList.contains('share-twitter')) {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
      } else if (link.classList.contains('share-pinterest')) {
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(text)}`, '_blank');
      } else if (link.classList.contains('share-email')) {
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
      } else if (link.classList.contains('share-whatsapp')) {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
      }
    });
  });
  
  // Setup size options
  document.querySelectorAll('.size-option').forEach(option => {
    if (!option.classList.contains('disabled')) {
      option.addEventListener('click', () => {
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    }
  });
  
  // Setup color options
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}

function displayRelatedProducts(product, container) {
  // Find related products (same category or gender)
  const related = products.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);
  
  container.innerHTML = '';
  
  if (related.length === 0) {
    container.innerHTML = '<p>No related products found.</p>';
    return;
  }
  
  related.forEach(p => {
    const item = document.createElement('div');
    item.className = 'related-product';
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="related-image">
      <div class="related-info">
        <h4 class="related-name">${p.name}</h4>
        <div class="related-price">K${p.price.toFixed(2)}</div>
      </div>
    `;
    
    item.addEventListener('click', () => {
      closeProductPopup();
      setTimeout(() => {
        showProductDetails(p);
      }, 300);
    });
    
    container.appendChild(item);
  });
}

function showQuickView(product) {
  quickViewProduct = product;
  
  const image = document.querySelector('.quick-view-image');
  const title = document.querySelector('.quick-view-title');
  const price = document.querySelector('.quick-view-price');
  const description = document.querySelector('.quick-view-description');
  const rating = document.querySelector('#quick-view-popup .product-rating');
  const viewDetailsBtn = document.querySelector('.view-details-btn');
  const addToCartBtn = document.querySelector('.quick-add-to-cart-btn');
  
  // Set product data
  image.src = product.image;
  image.alt = product.name;
  title.textContent = product.name;
  
  // Price display with sale price if applicable
  if (product.onSale) {
    price.innerHTML = `
      <span style="text-decoration: line-through; color: #888; margin-right: 8px;">K${product.originalPrice.toFixed(2)}</span>
      K${product.price.toFixed(2)}
    `;
  } else {
    price.textContent = `K${product.price.toFixed(2)}`;
  }
  
  description.textContent = product.description;
  
  // Set rating
  const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
  rating.innerHTML = getStarRating(avgRating);
  
  // Setup buttons
  viewDetailsBtn.addEventListener('click', () => {
    closeQuickView();
    setTimeout(() => {
      showProductDetails(product);
    }, 300);
  });
  
  addToCartBtn.addEventListener('click', () => {
    addToCart(product, 1);
    showNotification('success', 'Added to Cart', `${product.name} has been added to your cart.`);
    closeQuickView();
  });
  
  // Show popup
  overlay.classList.add('show');
  quickViewPopup.classList.add('show');
}

function closeProductPopup() {
  popupProduct = null;
  overlay.classList.remove('show');
  productPopup.classList.remove('show');
  document.body.style.overflow = ''; // Restore background scrolling
  
  // Pause any videos
  const videos = productPopup.querySelectorAll('video');
  videos.forEach(video => video.pause());
}

function closeQuickView() {
  quickViewProduct = null;
  overlay.classList.remove('show');
  quickViewPopup.classList.remove('show');
}

function closeZoom() {
  zoomedImageContainer.classList.remove('show');
}

function closeAllPopups() {
  closeProductPopup();
  closeQuickView();
  closeZoom();
}

// ============= Cart Management =============
function addToCart(product, quantity = 1) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      onSale: product.onSale,
      image: product.image,
      quantity: quantity
    });
  }
  
  updateCartCount();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  cartCount.textContent = totalItems;
  document.querySelector('.cart-title .cart-count-badge').textContent = totalItems;
  
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function toggleCart() {
  cartPopup.classList.toggle('show');
  closeWishlist();
  closeCompare();
  renderCart();
}

function closeCart() {
  cartPopup.classList.remove('show');
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <a href="#shop" class="btn btn-primary btn-small" style="margin-top: 0;">Shop Now</a>
      </div>
    `;
    subtotalValue.textContent = 'K0.00';
    totalValue.textContent = 'K0.00';
    checkoutBtn.disabled = true;
    return;
  }
  
  cartItems.innerHTML = '';
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    // Show original price if on sale
    const priceDisplay = item.onSale 
      ? `<div class="cart-item-price">
          K${item.price.toFixed(2)}
          <span class="cart-item-original-price">K${item.originalPrice.toFixed(2)}</span>
        </div>`
      : `<div class="cart-item-price">K${item.price.toFixed(2)}</div>`;
    
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        ${priceDisplay}
        <div class="cart-item-quantity">
          <button class="cart-quantity-btn decrease" data-id="${item.id}">-</button>
          <span class="cart-quantity-display">${item.quantity}</span>
          <button class="cart-quantity-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    
    cartItems.appendChild(cartItem);
  });
  
  // Add event listeners
  cartItems.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQuantity(btn.dataset.id, -1));
  });
  
  cartItems.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQuantity(btn.dataset.id, 1));
  });
  
  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.id));
      showNotification('info', 'Removed from Cart', 'Item has been removed from your cart.');
    });
  });
  
  // Calculate shipping (example: free shipping over K500)
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;
  
  subtotalValue.textContent = `K${subtotal.toFixed(2)}`;
  totalValue.textContent = `K${total.toFixed(2)}`;
  checkoutBtn.disabled = false;
}

function updateCartItemQuantity(productId, change) {
  const item = cart.find(item => item.id === parseInt(productId));
  
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity < 1) {
    removeFromCart(parseInt(productId));
  }
  
  updateCartCount();
  renderCart();
}

// ============= Wishlist Management =============
function toggleWishlistItem(product) {
  const existingIndex = wishlist.findIndex(item => item.id === product.id);
  
  if (existingIndex >= 0) {
    wishlist.splice(existingIndex, 1);
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  }
  
  updateWishlistCount();
  renderWishlist();
}

function updateWishlistCount() {
  document.querySelector('.wishlist-popup .cart-count-badge').textContent = wishlist.length;
}

function toggleWishlist() {
  wishlistPopup.classList.toggle('show');
  closeCart();
  closeCompare();
  renderWishlist();
}

function closeWishlist() {
  wishlistPopup.classList.remove('show');
}

function renderWishlist() {
  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-heart"></i>
        <p>Your wishlist is empty</p>
        <a href="#shop" class="btn btn-primary btn-small" style="margin-top: 0;">Explore Products</a>
      </div>
    `;
    return;
  }
  
  wishlistItems.innerHTML = '';
  
  wishlist.forEach(item => {
    const wishlistItem = document.createElement('div');
    wishlistItem.className = 'cart-item';
    wishlistItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">K${item.price.toFixed(2)}</p>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button class="btn btn-primary btn-small add-to-cart-btn-small" data-id="${item.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn btn-secondary btn-small view-details-btn-small" data-id="${item.id}">
            <i class="fas fa-eye"></i> View
          </button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    wishlistItems.appendChild(wishlistItem);
  });
  
  // Add event listeners
  wishlistItems.querySelectorAll('.add-to-cart-btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        addToCart(product);
        showNotification('success', 'Added to Cart', `${product.name} has been added to your cart.`);
      }
    });
  });
  
  wishlistItems.querySelectorAll('.view-details-btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        closeWishlist();
        showProductDetails(product);
      }
    });
  });
  
  wishlistItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        toggleWishlistItem(product);
        showNotification('info', 'Removed from Wishlist', `Item has been removed from your wishlist.`);
      }
    });
  });
}

// ============= Compare Management =============
function toggleCompareItem(product) {
  const existingIndex = compareList.findIndex(item => item.id === product.id);
  
  if (existingIndex >= 0) {
    compareList.splice(existingIndex, 1);
  } else {
    if (compareList.length >= 4) {
      showNotification('warning', 'Compare Limit Reached', 'You can compare up to 4 products at a time. Please remove an item first.');
      return;
    }
    compareList.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      material: product.material
    });
  }
  
  updateCompareCount();
  renderCompare();
}

function updateCompareCount() {
  if (compareCount) {
    compareCount.textContent = compareList.length;
    compareCount.style.display = compareList.length > 0 ? 'flex' : 'none';
  }
}

function toggleCompare() {
  comparisonPopup.classList.toggle('show');
  closeCart();
  closeWishlist();
  renderCompare();
}

function closeCompare() {
  comparisonPopup.classList.remove('show');
}

function clearCompare() {
  compareList = [];
  updateCompareCount();
  renderCompare();
  showNotification('info', 'Compare Cleared', 'All products have been removed from the comparison.');
}

function renderCompare() {
  if (!comparisonItems) return;
  
  if (compareList.length === 0) {
    comparisonItems.innerHTML = `
      <div class="comparison-empty">
        <i class="fas fa-exchange-alt"></i>
        <p>Your comparison list is empty</p>
      </div>
    `;
    compareNowBtn.disabled = true;
    return;
  }
  
  comparisonItems.innerHTML = '';
  
  compareList.forEach(item => {
    const compareItem = document.createElement('div');
    compareItem.className = 'comparison-item';
    compareItem.innerHTML = `
      <button class="comparison-item-remove" data-id="${item.id}">
        <i class="fas fa-times"></i>
      </button>
      <img src="${item.image}" alt="${item.name}" class="comparison-item-image">
      <h4 class="comparison-item-name">${item.name}</h4>
      <div class="comparison-item-price">K${item.price.toFixed(2)}</div>
      <p style="font-size: 12px; color: #888;">${item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
      <button class="btn btn-primary btn-small" style="width: 100%; margin-top: 10px;" data-id="${item.id}">
        View Details
      </button>
    `;
    
    comparisonItems.appendChild(compareItem);
  });
  
  // Add event listeners
  comparisonItems.querySelectorAll('.comparison-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        toggleCompareItem(product);
      }
    });
  });
  
  comparisonItems.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        closeCompare();
        showProductDetails(product);
      }
    });
  });
  
  compareNowBtn.disabled = compareList.length < 2;
}

// ============= Recently Viewed Management =============
function addToRecentlyViewed(product) {
  // Remove if already exists
  recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);
  
  // Add to start of array
  recentlyViewed.unshift({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  });
  
  // Limit to 10 items
  if (recentlyViewed.length > 10) {
    recentlyViewed = recentlyViewed.slice(0, 10);
  }
  
  renderRecentlyViewed();
}

// ============= Notification =============
function showNotification(type, title, message) {
  // Set notification type and content
  notification.className = 'notification';
  notification.classList.add(`notification-${type}`);
  
  notificationTitle.textContent = title;
  notificationMessage.textContent = message;
  
  switch (type) {
    case 'success':
      notificationIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
      break;
    case 'error':
      notificationIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
      break;
    case 'info':
      notificationIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
      break;
    case 'warning':
      notificationIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      break;
    default:
      notificationIcon.innerHTML = '<i class="fas fa-bell"></i>';
  }
  
  // Show notification
  notification.classList.add('show');
  
  // Hide after 4 seconds
  setTimeout(() => {
    hideNotification();
  }, 4000);
}

function hideNotification() {
  notification.classList.remove('show');
}

// ============= Intersection Observer =============
function setupIntersectionObserver() {
  const options = {
    threshold: 0.2,
    rootMargin: '-100px 0px 0px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade');
      }
    });
  }, options);
  
  // Observe elements
  document.querySelectorAll('.testimonial-card, .article-card, .product-card').forEach(item => {
    observer.observe(item);
  });
}

// ============= Utility Functions =============
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return `
    ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
    ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
    ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
  `;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);
