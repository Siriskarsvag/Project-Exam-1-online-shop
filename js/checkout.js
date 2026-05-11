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
