// cart functionality using localStorage

function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
}

function saveCartItems(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addToCart(product) {
    const cartItems = getCartItems();

    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ 
            id: product.id,
            title: product.title,
            price: product.discountedPrice < product.price ? product.discountedPrice : product.price,
            quantity: 1,
            image: product.image.url
        });
    }

    saveCartItems(cartItems);
}

// Calculate total price of items in the cart
function getCartTotal() {
    return getCartItems().reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderCartTotal() {
    const totalElement = document.getElementById("cart-total");
    if (!totalElement) return;

    const cartItems = getCartItems();
    const total = getCartTotal(cartItems);

    totalElement.textContent = `Total: ${total.toFixed(2)},-`;
}

// Render cart items in the cart page
function renderCart() {
    const itemTable = document.getElementById("cart-items-table");
    if (!itemTable) return;

    const cartItems = getCartItems();
    itemTable.innerHTML = "Loading cart items...";
    itemTable.innerHTML = "";
    
    if (cartItems.length === 0) {
        itemTable.innerHTML += `
            <p class="error">Your cart is empty.</p>
        `;
        renderCartTotal();
        return;
    }

    cartItems.forEach((item) => {
        itemTable.innerHTML += `
            <tr>
                <td class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </td>
                <td class="cart-item-title">
                    <h6>${item.title}</h6>
                </td>
                <td class="cart-item-quantity">
                    <button class="decrease-quantity" aria-label="Decrease quantity">-</button><h6>${item.quantity}</h6><button class="increase-quantity" aria-label="Increase quantity">+</button><img src="assets/waste-bin_7951984.png" alt="Remove icon" class="remove-item">
                </td>
                <td class="cart-item-price">
                    <h6>${(item.price * item.quantity).toFixed(2)},-</h6>
                </td>
            </tr>

        `;
    });

    // Add event listeners for quantity buttons and remove buttons
    const decreaseButtons = document.querySelectorAll(".decrease-quantity");
    const increaseButtons = document.querySelectorAll(".increase-quantity");
    const removeButtons = document.querySelectorAll(".remove-item");

    increaseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            cartItems[index].quantity += 1;

            saveCartItems(cartItems);

            renderCart();
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
            } else {
                cartItems.splice(index, 1);
            }

            saveCartItems(cartItems);

            renderCart();
        });
    });


    removeButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            cartItems.splice(index, 1);

            saveCartItems(cartItems);

            renderCart();
        });
    });

    renderCartTotal();
}

renderCart();

const checkoutButton = document.getElementById('checkout-btn');

// Handle checkout button click - check if cart is empty before navigating to checkout page
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        const cartItems = getCartItems();

        if (cartItems.length === 0) {
            showToast('Your cart is empty. Please add items to your cart before checking out.', 'error', 'Shop for products', 'index.html');
            return;
        }

        window.location.href = 'checkout.html';
    });
}