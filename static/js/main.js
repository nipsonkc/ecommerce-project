// main.js

// Initialize cart count and cart items array
let cartCount = 0;
let cartItems = [];

// Select all 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Select the cart count badge element
const cartCountElement = document.getElementById('cart-count');

// Select the Bootstrap alert element
const cartAlert = document.getElementById('cart-alert');

// Function to update localStorage and cart badge
function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount);
    cartCountElement.textContent = cartCount;
}

// Load cart count on page load (from localStorage)
window.addEventListener('DOMContentLoaded', () => {
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount) {
        cartCount = parseInt(storedCount);
        cartCountElement.textContent = cartCount;
    }
});

// Add event listeners to each Add to Cart button
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-text').textContent;

        // Add item to cart array
        cartItems.push({ title, price });

        cartCount++; // Increment count
        updateCart(); // Save to localStorage

        // Show success alert
        cartAlert.classList.remove('d-none');
        setTimeout(() => {
            cartAlert.classList.add('d-none');
        }, 1500);
    });
});
