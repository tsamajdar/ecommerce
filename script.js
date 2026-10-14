const productsData = [
    {
        id: 1,
        name: "Chronos Apex Tourbillon Watch",
        category: "Accessories",
        price: 2450.00,
        rating: 4.9,
        reviewsCount: 128,
        image: "https://placehold.co/600x600/1e293b/ffffff?text=Chronos+Tourbillon",
        description: "Handcrafted Swiss masterpiece featuring a visible tourbillon escapement, sapphire crystal casing, and genuine alligator leather strap.",
        badge: "Bestseller",
        specs: ["Case: 42mm Titanium", "Movement: Manual-wind Swiss Tourbillon", "Water Resistance: 100m", "Warranty: 5 Years Global"]
    },
    {
        id: 2,
        name: "Aether SoundSphere ANC Headphones",
        category: "Electronics",
        price: 499.00,
        rating: 4.8,
        reviewsCount: 94,
        image: "https://placehold.co/600x600/334155/ffffff?text=SoundSphere+ANC",
        description: "Immersive studio-grade acoustic performance paired with industry-leading active noise cancellation and anodized aluminum earcups.",
        badge: "New",
        specs: ["Drivers: 40mm Beryllium", "Battery: 45 Hours Playtime", "Connectivity: Bluetooth 5.3 & Lossless USB-C", "Weight: 270g"]
    },
    {
        id: 3,
        name: "Vanguard Minimalist Leather Briefcase",
        category: "Fashion",
        price: 680.00,
        rating: 4.7,
        reviewsCount: 65,
        image: "https://placehold.co/600x600/475569/ffffff?text=Vanguard+Briefcase",
        description: "Full-grain Italian calfskin leather briefcase designed for the modern professional. Features dedicated padded laptop sleeve and brass hardware.",
        badge: "Popular",
        specs: ["Material: Tuscan Full-Grain Leather", "Dimensions: 15.5\" x 11\" x 3.5\"", "Laptop Pocket: Up to 15-inch", "Hardware: Solid Polished Brass"]
    },
    {
        id: 4,
        name: "Lumina Studio Ceramic Table Lamp",
        category: "Home",
        price: 320.00,
        rating: 4.6,
        reviewsCount: 42,
        image: "https://placehold.co/600x600/64748b/ffffff?text=Lumina+Lamp",
        description: "Sculptural handcrafted ceramic lamp with warm dim-to-warm LED illumination and brushed brass stem accents.",
        badge: "Sale",
        specs: ["Material: Matte Ceramic & Brass", "Bulb: Integrated 2700K LED", "Dimming: Touch Sensitive 3-Stage", "Cord Length: 2m Braided"]
    },
    {
        id: 5,
        name: "Solstice Polarized Titanium Aviators",
        category: "Accessories",
        price: 295.00,
        rating: 4.9,
        reviewsCount: 112,
        image: "https://placehold.co/600x600/0f172a/ffffff?text=Solstice+Aviators",
        description: "Ultra-lightweight Japanese titanium frames equipped with anti-reflective polarized lenses offering 100% UV400 protection.",
        badge: "Exclusive",
        specs: ["Frame: Japanese Beta-Titanium", "Lenses: TAC Polarized with AR Coating", "Hinges: Custom Spring-Loaded", "Made in: Sabae, Japan"]
    },
    {
        id: 6,
        name: "Zenith Mechanical Smart Keyboard",
        category: "Electronics",
        price: 240.00,
        rating: 4.8,
        reviewsCount: 88,
        image: "https://placehold.co/600x600/1e293b/ffffff?text=Zenith+Keyboard",
        description: "CNC-milled aluminum chassis, hot-swappable custom linear switches, and dye-sublimated PBT keycaps for an elite typing experience.",
        badge: "Trending",
        specs: ["Body: Anodized Aluminum 6063", "Switches: Custom Lubed Linear", "Connectivity: Tri-Mode (2.4G, BT, USB)", "Battery: 4000mAh"]
    },
    {
        id: 7,
        name: "Nomad Cashmere Travel Pullover",
        category: "Fashion",
        price: 350.00,
        rating: 4.7,
        reviewsCount: 53,
        image: "https://placehold.co/600x600/334155/ffffff?text=Cashmere+Pullover",
        description: "Spun from Grade-A Mongolian cashmere, offering featherlight warmth, exquisite softness, and timeless relaxed tailoring.",
        badge: "New",
        specs: ["Material: 100% Grade-A Mongolian Cashmere", "Gauge: 12-Gauge Knit", "Care: Hand Wash or Dry Clean", "Fit: Modern Relaxed"]
    },
    {
        id: 8,
        name: "Aura Ultrasonic Aroma Diffuser",
        category: "Home",
        price: 180.00,
        rating: 4.5,
        reviewsCount: 39,
        image: "https://placehold.co/600x600/475569/ffffff?text=Aura+Diffuser",
        description: "Hand-blown frosted glass essential oil diffuser featuring ambient LED breathing light and whisper-quiet ultrasonic mist technology.",
        badge: "Popular",
        specs: ["Capacity: 200ml", "Coverage: Up to 500 sq. ft.", "Runtime: 8 Hours Continuous", "Auto Shut-Off: Yes"]
    }
];

let cart = JSON.parse(localStorage.getItem('aetheria_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('aetheria_user')) || null;

function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    const bgColors = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-rose-600 text-white',
        info: 'bg-slate-900 text-white'
    };
    const icons = {
        success: 'fa-circle-check',
        error: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    toast.className = `pointer-events-auto flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl font-medium text-sm transform transition-all duration-300 translate-y-4 opacity-0 ${bgColors[type] || bgColors.success}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type]} text-lg"></i><span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-y-4', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function updateCartBadge() {
    localStorage.setItem('aetheria_cart', JSON.stringify(cart));
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = totalItems;
        if (totalItems > 0) {
            badge.classList.remove('scale-0');
            badge.classList.add('scale-100');
        } else {
            badge.classList.remove('scale-100');
            badge.classList.add('scale-0');
        }
    }
    const userLabel = document.getElementById('nav-user-label');
    if (userLabel && currentUser) {
        userLabel.innerText = currentUser.name.split(' ')[0];
    }
}

function addToCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }
    updateCartBadge();
    showToast(`Added "${product.name}" to your bag.`, 'success');
}

function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('aetheria_theme', 'light');
        if (icon) icon.className = 'fa-solid fa-moon text-lg';
    } else {
        html.classList.add('dark');
        localStorage.setItem('aetheria_theme', 'dark');
        if (icon) icon.className = 'fa-solid fa-sun text-lg';
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    if (!menu) return;
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.className = 'fa-solid fa-bars text-xl';
    } else {
        icon.className = 'fa-solid fa-xmark text-xl';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('aetheria_theme') === 'dark' || (!localStorage.getItem('aetheria_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = 'fa-solid fa-sun text-lg';
    }
    updateCartBadge();
});