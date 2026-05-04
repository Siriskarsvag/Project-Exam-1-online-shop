const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const productURL = `https://v2.api.noroff.dev/online-shop/${productId}`;

let currentProduct = null;

function getPriceHTML(product) {
    const hasDiscount = product.discountedPrice < product.price;

    if (hasDiscount) {
        return `
            <div class="price-container">
                <h6 class="old-price">${product.price},-</h6>
                <h6 class="discounted-price">${product.discountedPrice},-</h6>
            </div>
        `;
    } 
    return `
        <div class="price-container">
            <h6 class="price">${product.price},-</h6>
        </div>
    `;
}

function getStars(rating) {
    let stars = '';

    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }

    return stars;
}

async function fetchProduct() {
    const productImage = document.querySelector('.product-details-image');
    const productInfo = document.querySelector('.product-info');
    const productReviews = document.querySelector('.product-reviews');

    productInfo.textContent = "Loading product details...";
    productInfo.textContent = "";
    productReviews.textContent = "Loading reviews...";
    productReviews.textContent = "";

    try {
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const result = await response.json();
        const product = result.data;

        currentProduct = product;

        productImage.innerHTML = `<img src="${product.image.url}" alt="${product.title}">`;
        productInfo.innerHTML = `
            <h2>${product.title}</h2>
            <div class="product-description">
                <p class="description">${product.description}</p>
                <p class="tags">#${product.tags.join(', #')}</p>
            </div>
            ${getPriceHTML(product)}

            <button class="add-to-cart"><h3>Add to Cart</h3></button>
        `;

        const reviewsHTML = product.reviews.length
            ? product.reviews.map(review => `
                <div class="review">
                    <p class="reviewer-name"><span>${review.username} - </span> <span>"${review.description}"</span></p>
                    <p class="review-rating">${getStars(review.rating)}</p>
                </div>
            `).join('')
        : '<p class="error">No reviews added.</p>';

        productReviews.innerHTML = `
            <h4>Rating and Reviews</h4>
            <div class="reviewContainer">
                ${reviewsHTML}
            </div>
        `;

        const addToCartButton = document.querySelector('.add-to-cart');

        addToCartButton.addEventListener('click', () => {
            if (!currentProduct) return;
            addToCart(currentProduct);
            alert('Product added to cart!');
        });

    } catch (error) {
        productInfo.textContent = "Error loading product details.";
        productReviews.textContent = "Error loading reviews.";
        console.error(error);
    }
}

fetchProduct();