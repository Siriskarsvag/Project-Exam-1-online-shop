const shippingStep = document.getElementById('shipping-step');
const paymentStep = document.getElementById('payment-step');
const summaryStep = document.getElementById('summary-step');

const shippingForm = document.getElementById('shipping-form');

shippingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postal-code').value;
    const town = document.getElementById('town').value;

    if (!address || !postalCode || !town) {
        alert('Please fill in all shipping details.');
        return;
    }

    shippingStep.classList.add('hidden');
    paymentStep.classList.remove('hidden');
});

const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById ('expiration-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardName || !cardNumber || !expirationDate || !cvv) {
        alert('Please fill in all payment details.');
        return;
    }

    paymentStep.classList.add('hidden');
    summaryStep.classList.remove('hidden');
});

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const summaryItemsContainer = document.querySelector('.summary-items');

function renderSummaryItems() {
    summaryItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}" width="100" height="100">
            </td>
            <td>
                <h6>${item.quantity}x</h6>
            </td>
            <td>
                <h6>${item.title}</h6>
            </td>
            <td>
                <h6>${item.price},-</h6>
            </td>
        `;
        summaryItemsContainer.appendChild(row);
    });
}
renderSummaryItems();