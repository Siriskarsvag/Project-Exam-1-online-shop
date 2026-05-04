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
