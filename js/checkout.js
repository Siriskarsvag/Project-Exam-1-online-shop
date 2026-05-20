const shippingStep = document.getElementById('shipping-step');
const paymentStep = document.getElementById('payment-step');
const summaryStep = document.getElementById('summary-step');

const shippingForm = document.getElementById('shipping-form');
const paymentForm = document.getElementById('payment-form');

let shippingInfo = {};
let paymentInfo = {};

const user = JSON.parse(localStorage.getItem('user'));

// Check out forms shown in steps, only one step is visible at a time

shippingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postal-code').value;
    const town = document.getElementById('town').value;

    if (!address || !postalCode || !town) {
        alert('Please fill in all shipping details.');
        return;
    }

    shippingInfo = {
        address: address,
        postalCode: postalCode,
        town: town,
    };

    shippingStep.classList.add('hidden');
    paymentStep.classList.remove('hidden');
});

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById ('expiration-date').value;
    const cvv = document.getElementById('cvv').value;

    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (!cardName || !cardNumber || !expirationDate || !cvv) {
        alert('Please fill in all payment details.');
        return;
    }

    paymentInfo = {
        method: selectedPaymentMethod ? selectedPaymentMethod.value : 'Unknown',
    };

    
    document.getElementById('summary-user').textContent = `User: ${user.name}`;
    document.getElementById('summary-address').textContent = `Shipping address: ${shippingInfo.address}, ${shippingInfo.postalCode} ${shippingInfo.town}`;
    document.getElementById('summary-payment').textContent = `Payment method: ${paymentInfo.method}`;

    paymentStep.classList.add('hidden');
    summaryStep.classList.remove('hidden');
});

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const summaryItemsContainer = document.querySelector('.summary-items');

// Render summary of items in the cart
function renderSummaryItems() {
    summaryItemsContainer.innerHTML = 'Loading cart items...';
    summaryItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        window.location.href = 'cart.html';
    }

    cartItems.forEach(item => {
        const itemPrice = item.discountPrice || item.price;
        const totalItemPrice = itemPrice * item.quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}">
            </td>
            <td>
                <h6>${item.quantity}x</h6>
            </td>
            <td>
                <h6>${item.title}</h6>
            </td>
            <td>
                <h6>${totalItemPrice.toFixed(2)},-</h6>
            </td>
        `;
        summaryItemsContainer.appendChild(row);
    });
}
renderSummaryItems();

const editUserBtn = document.getElementById('edit-user');
const editAddressBtn = document.getElementById('edit-address');
const editPaymentBtn = document.getElementById('edit-payment');

// Edit buttons to go back to previous steps and edit information

editAddressBtn.addEventListener('click', () => {
    summaryStep.classList.add('hidden');
    shippingStep.classList.remove('hidden');
});

editPaymentBtn.addEventListener('click', () => {
    summaryStep.classList.add('hidden');
    paymentStep.classList.remove('hidden');
});

editUserBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
});

const completePurchaseBtn = document.getElementById('complete-purchase');

// Complete purchase button clears cart and redirects to success page
if (completePurchaseBtn) {
    completePurchaseBtn.addEventListener('click', () => {
        localStorage.removeItem('cartItems');

        window.location.href = 'success.html';
    });
}