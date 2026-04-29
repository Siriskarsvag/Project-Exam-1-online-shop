const url = "https://v2.api.noroff.dev/online-shop";

// Carousel variables
let carouselProducts = [];
let currentIndex = 0;

const carouselImages = document.querySelector(".carousel-images");
const leftButton = document.querySelector(".carousel-button-left");
const rightButton = document.querySelector(".carousel-button-right");

//Fetch products 

async function fetchProducts() {
    try {
        const response = await fetch(url);
        const results = await response.json();

        const products = results.data;

        // Carousel setup
        carouselProducts = products.slice(0, 3);

        renderCarousel();

        rightButton.addEventListener("click", showNextProduct);
        leftButton.addEventListener("click", showPreviousProduct);

        // Product grid setup

        const productGrid = document.querySelector(".product-grid");

        productGrid.innerHTML = "";

        products.forEach((product) => {
            const hasDiscount = product.discountedPrice < product.price;

            productGrid.innerHTML += `
                <article class="product-card">
                    <a class="product-link" href="product-page.html?id=${product.id}">
                        <img src="${product.image.url}" alt="${product.image.alt}" class="product-image" />
                        <div class="product-card-info">
                            <h5>${product.title}</h5>
                            ${hasDiscount ? `<h6 class="price-row"><span class="old-price">${product.price},-</span> <span class="discounted-price">${product.discountedPrice},-</span></h6>` : `<h6>${product.price},-</h6>`}
                        </div>
                    </a>
                </article>
            `;
        });

    } catch (error) {
        console.log("Error fetching products:", error);
    }
}

fetchProducts();

// carousel functions

function renderCarousel() {
    if (!carouselImages) return;

    const product = carouselProducts[currentIndex];

    carouselImages.innerHTML = `
        <a href="product-page.html?id=${product.id}">
            <img src="${product.image.url}" alt="${product.image.alt}" class="carousel-image active" />
        </a>
    `;
}

function showNextProduct() {
    currentIndex++;

    if (currentIndex >= carouselProducts.length) {
        currentIndex = 0;
    }

    renderCarousel();
}

function showPreviousProduct() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = carouselProducts.length - 1;
    }

    renderCarousel();
}

setInterval(showNextProduct, 5000);