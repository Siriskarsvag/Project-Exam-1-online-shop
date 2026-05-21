// fetching correct product based on URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (!productId) {
    window.location.href = "index.html";
}

const productURL = `https://v2.api.noroff.dev/online-shop/${productId}`;

let currentProduct = null;

// Helper function to generate price HTML with discount handling

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

// Helper function to generate star rating HTML

function getStars(rating) {
    let stars = '';

    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }

    return stars;
}

// Fetch product details and reviews, then update the page content

async function fetchProduct() {
    const productImage = document.querySelector('.product-details-image');
    const productInfo = document.querySelector('.product-info');
    const productReviews = document.querySelector('.product-reviews');

    productInfo.innerHTML = '<p>Loading product details...</p>';
    productInfo.innerHTML = "";
    productReviews.innerHTML = '<p>Loading reviews...</p>';
    productReviews.innerHTML = "";

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
            <div class="title-row">
                <h2>${product.title}</h2> 
                <button id="share-button" class="share-button" type="button" aria-label="Share product">
                    <img src="assets/share_1828959.png" alt="Share Icon">
                </button>
            </div>
            <div class="product-description">
                <p class="description">${product.description}</p>
                <p class="tags">#${product.tags.join(', #')}</p>
            </div>
            ${getPriceHTML(product)}

            <button class="CTA">Add to Cart</button>
        `;

        // Share button functionality

        const shareButton = document.getElementById('share-button');

        if (shareButton) {
            shareButton.addEventListener('click', async () => {
                const shareUrl = window.location.href;

                if (navigator.share) {
                    await navigator.share({
                        title: currentProduct.title,
                        text: `Check out this product: ${currentProduct.title}`,
                        url: shareUrl,
                    });
                } else {
                    await navigator.clipboard.writeText(shareUrl);
                    showToast('Product URL copied to clipboard!', 'success');
                }
            });
        }

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

        const addToCartButton = document.querySelector('.CTA');
        const token = localStorage.getItem('token');

        // Disable add to cart button if user is not logged in

        if (!token) {
            addToCartButton.style.opacity = '0.6';
            addToCartButton.style.cursor = 'not-allowed';
        }

        addToCartButton.addEventListener('click', () => {

            const token = localStorage.getItem('token');

            if (!token) {
                showToast('Please log in to add products to your cart.', 'error', 'Go to Login', 'login.html');
                return;
            }

            if (!currentProduct) return;

            addToCart(currentProduct);

            showToast('Product added to cart!', 'success', 'View Cart', 'cart.html');
        });

    } catch (error) {
        productInfo.innerHTML = '<p class="error">Error loading product details.</p>';
        productReviews.innerHTML = '<p class="error">Error loading reviews.</p>';
    }
}

fetchProduct();