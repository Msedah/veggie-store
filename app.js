let cart = [];

const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutSection = document.querySelector('.checkout');
const checkoutForm = document.getElementById('checkout-form');

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        cart.push({ name, price });
        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    totalPrice.textContent = total.toFixed(2);
}

// Proceed to checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    checkoutSection.style.display = 'block';
});

// Send to WhatsApp on submit
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let message = 'Hello! I would like to order the following:\n\n';
    
    cart.forEach(item => {
        message += `- ${item.name}: R${item.price}\n`;
    });
    message += `\nTotal: R${total.toFixed(2)}\n`;

    if (location) {
        message += `\nDelivery Location: ${location}\n`;
    }

    if (total >= 35) {
        message += "\nDelivery is available ✅";
    } else {
        message += "\nDelivery only available for orders R35 and above.";
    }

    const whatsappUrl = `https://wa.me/27793174086?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

