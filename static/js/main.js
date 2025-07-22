// main.js

let cartCount = 0;
let cartItems = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');
const cartAlert = document.getElementById('cart-alert');

function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount);
    cartCountElement.textContent = cartCount;
}

window.addEventListener('DOMContentLoaded', () => {
    const storedCount = localStorage.getItem('cartCount');
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (storedCount) {
        cartCount = parseInt(storedCount);
        cartCountElement.textContent = cartCount;
    }
    if (storedItems.length) {
        cartItems = storedItems;
    }
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-text').textContent;

        cartItems.push({ title, price });
        cartCount++;
        updateCart();

        cartAlert.classList.remove('d-none');
        setTimeout(() => {
            cartAlert.classList.add('d-none');
        }, 1500);
    });
});
