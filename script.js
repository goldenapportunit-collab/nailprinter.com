"use strict";

/* =========================================================
   NAILS-LIMING PREMIUM E-COMMERCE
   COMPLETE SCRIPT
   ========================================================= */


/* =========================================================
   1. LOADER — MUST DISAPPEAR
   ========================================================= */

(function () {

    function hideLoader() {

        const loader = document.querySelector(
            "#loader, .loader, .loading-screen, .preloader, .page-loader"
        );

        if (!loader) {
            return;
        }

        loader.classList.add("loaded");

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        setTimeout(function () {

            loader.style.display = "none";

        }, 700);
    }


    // Normal page load
    window.addEventListener("load", function () {

        setTimeout(hideLoader, 300);

    });


    // Safety backup
    setTimeout(hideLoader, 4000);

})();


/* =========================================================
   2. CONFIGURATION
   ========================================================= */

const WHATSAPP_NUMBER = "86XXXXXXXXXX";

const STORE_NAME = "Nails-LiMing";


/* =========================================================
   3. PRODUCTS
   ========================================================= */

const products = [

    {
        id: 1,
        name: "LiMing Pro Nail Printer",
        category: "Nail Printer",
        price: 1299,
        oldPrice: 1599,
        image: "assets/images/product-1.webp",
        description:
            "Professional high-definition nail printer designed for modern nail salons and beauty professionals."
    },

    {
        id: 2,
        name: "LiMing Mini Nail Printer",
        category: "Nail Printer",
        price: 799,
        oldPrice: 999,
        image: "assets/images/product-2.webp",
        description:
            "Compact nail printer with a premium design, perfect for smaller studios and beauty businesses."
    },

    {
        id: 3,
        name: "LiMing Smart Printer X",
        category: "Premium Series",
        price: 1899,
        oldPrice: 2299,
        image: "assets/images/product-3.webp",
        description:
            "Advanced smart nail printing system built for professional salons and high-volume businesses."
    },

    {
        id: 4,
        name: "Professional Ink Kit",
        category: "Accessories",
        price: 149,
        oldPrice: 199,
        image: "assets/images/product-4.webp",
        description:
            "Professional replacement ink kit for compatible LiMing nail printers."
    }

];


/* =========================================================
   4. GLOBAL VARIABLES
   ========================================================= */

let cart = [];

let wishlist = [];

let currentProduct = null;


/* =========================================================
   5. START WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStorage();

        setupMobileMenu();

        setupHeader();

        setupSearch();

        setupCart();

        setupWishlist();

        setupProductModal();

        setupForms();

        setupWhatsApp();

        setupBackToTop();

        setupNewsletter();

        setupCategoryFilters();

        setupScrollAnimations();

        setupKeyboardControls();

        renderProducts();

        updateCart();

        updateWishlist();

    }
);


/* =========================================================
   6. STORAGE
   ========================================================= */

function loadStorage() {

    try {

        const savedCart =
            localStorage.getItem("limingCart");

        const savedWishlist =
            localStorage.getItem("limingWishlist");


        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {

                cart = parsedCart;

            }

        }


        if (savedWishlist) {

            const parsedWishlist =
                JSON.parse(savedWishlist);

            if (Array.isArray(parsedWishlist)) {

                wishlist = parsedWishlist;

            }

        }

    } catch (error) {

        console.warn(
            "Storage could not be loaded:",
            error
        );

        cart = [];

        wishlist = [];

    }

}


function saveCart() {

    try {

        localStorage.setItem(
            "limingCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.warn(
            "Cart could not be saved:",
            error
        );

    }

}


function saveWishlist() {

    try {

        localStorage.setItem(
            "limingWishlist",
            JSON.stringify(wishlist)
        );

    } catch (error) {

        console.warn(
            "Wishlist could not be saved:",
            error
        );

    }

}


/* =========================================================
   7. MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.querySelector(
            "#menuToggle, .menu-toggle, .hamburger"
        );


    const navbar =
        document.querySelector(
            "#navMenu, .navbar, .nav-menu"
        );


    if (!menuButton || !navbar) {

        return;

    }


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                navbar.classList.toggle(
                    "active"
                );


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    const links =
        navbar.querySelectorAll("a");


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navbar.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                navbar.classList.contains(
                    "active"
                ) &&
                !navbar.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navbar.classList.remove(
                    "active"
                );

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   8. HEADER
   ========================================================= */

function setupHeader() {

    const header =
        document.querySelector(
            "header, .header, .site-header"
        );


    if (!header) {

        return;

    }


    function updateHeader() {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   9. SEARCH
   ========================================================= */

function setupSearch() {

    const input =
        document.querySelector(
            "#searchInput, .search-input"
        );


    const button =
        document.querySelector(
            "#searchButton, .search-btn"
        );


    if (!input) {

        return;

    }


    function search() {

        const query =
            input.value
                .trim()
                .toLowerCase();


        if (!query) {

            renderProducts();

            return;

        }


        const results =
            products.filter(
                function (product) {

                    return (

                        product.name
                            .toLowerCase()
                            .includes(query)

                        ||

                        product.category
                            .toLowerCase()
                            .includes(query)

                        ||

                        product.description
                            .toLowerCase()
                            .includes(query)

                    );

                }
            );


        renderProducts(results);

    }


    input.addEventListener(
        "input",
        search
    );


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                search();

            }

        }
    );


    if (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                search();

            }
        );

    }

}


/* =========================================================
   10. PRODUCT RENDER
   ========================================================= */

function renderProducts(list) {

    const containers =
        document.querySelectorAll(
            "#productsGrid, .products-grid, .product-grid"
        );


    if (!containers.length) {

        return;

    }


    const productList =
        Array.isArray(list)
            ? list
            : products;


    containers.forEach(
        function (container) {

            container.innerHTML = "";


            if (!productList.length) {

                container.innerHTML = `

                    <div class="no-products">

                        <h3>No products found</h3>

                        <p>
                            Try another search.
                        </p>

                    </div>

                `;

                return;

            }


            productList.forEach(
                function (product) {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "product-card";


                    const liked =
                        wishlist.includes(
                            product.id
                        );


                    card.innerHTML = `

                        <div class="product-image">

                            <img
                                src="${product.image}"
                                alt="${escapeHTML(product.name)}"
                                loading="lazy"
                            >

                            <button
                                type="button"
                                class="wishlist-btn ${
                                    liked
                                        ? "active"
                                        : ""
                                }"
                                data-wishlist="${
                                    product.id
                                }"
                                aria-label="Wishlist"
                            >
                                ♥
                            </button>

                        </div>


                        <div class="product-info">

                            <span class="product-category">
                                ${escapeHTML(
                                    product.category
                                )}
                            </span>


                            <h3>
                                ${escapeHTML(
                                    product.name
                                )}
                            </h3>


                            <p>
                                ${escapeHTML(
                                    product.description
                                )}
                            </p>


                            <div class="product-price">

                                <strong>
                                    ¥${formatPrice(
                                        product.price
                                    )}
                                </strong>

                                <del>
                                    ¥${formatPrice(
                                        product.oldPrice
                                    )}
                                </del>

                            </div>


                            <div class="product-actions">

                                <button
                                    type="button"
                                    class="product-view-btn"
                                    data-view-product="${
                                        product.id
                                    }"
                                >
                                    View Details
                                </button>


                                <button
                                    type="button"
                                    class="add-cart-btn"
                                    data-add-cart="${
                                        product.id
                                    }"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    `;


                    container.appendChild(card);

                }
            );


            attachProductEvents(container);

        }
    );

}


/* =========================================================
   11. PRODUCT EVENTS
   ========================================================= */

function attachProductEvents(container) {

    container
        .querySelectorAll("[data-add-cart]")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        addToCart(
                            Number(
                                button.dataset.addCart
                            )
                        );

                    }
                );

            }
        );


    container
        .querySelectorAll("[data-view-product]")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openProductModal(
                            Number(
                                button.dataset.viewProduct
                            )
                        );

                    }
                );

            }
        );


    container
        .querySelectorAll("[data-wishlist]")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        toggleWishlist(
                            Number(
                                button.dataset.wishlist
                            )
                        );

                    }
                );

            }
        );

}


/* =========================================================
   12. CART
   ========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        return;

    }


    const existing =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showToast(
        "Added to cart ✓"
    );

}


function setupCart() {

    document
        .querySelectorAll(
            "#cartButton, .cart-btn, [data-cart-toggle]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        openCart();

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "#cartClose, .cart-close, [data-cart-close]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        closeCart();

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            const increase =
                event.target.closest(
                    "[data-cart-increase]"
                );


            const decrease =
                event.target.closest(
                    "[data-cart-decrease]"
                );


            const remove =
                event.target.closest(
                    "[data-cart-remove]"
                );


            if (increase) {

                changeQuantity(
                    Number(
                        increase.dataset.cartIncrease
                    ),
                    1
                );

            }


            if (decrease) {

                changeQuantity(
                    Number(
                        decrease.dataset.cartDecrease
                    ),
                    -1
                );

            }


            if (remove) {

                removeFromCart(
                    Number(
                        remove.dataset.cartRemove
                    )
                );

            }

        }
    );


    const overlay =
        document.querySelector(
            "#cartOverlay, .cart-overlay"
        );


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCart
        );

    }

}


function openCart() {

    const panel =
        document.querySelector(
            "#cartPanel, .cart-panel, .cart-drawer"
        );


    const overlay =
        document.querySelector(
            "#cartOverlay, .cart-overlay"
        );


    if (panel) {

        panel.classList.add(
            "active"
        );

    }


    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }


    document.body.classList.add(
        "cart-open"
    );

}


function closeCart() {

    const panel =
        document.querySelector(
            "#cartPanel, .cart-panel, .cart-drawer"
        );


    const overlay =
        document.querySelector(
            "#cartOverlay, .cart-overlay"
        );


    if (panel) {

        panel.classList.remove(
            "active"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "cart-open"
    );

}


function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            function (cartItem) {

                return cartItem.id === productId;

            }
        );


    if (!item) {

        return;

    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (cartItem) {

                    return cartItem.id !== productId;

                }
            );

    }


    saveCart();

    updateCart();

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            function (item) {

                return item.id !== productId;

            }
        );


    saveCart();

    updateCart();

    showToast(
        "Removed from cart"
    );

}


function updateCart() {

    const count =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    document
        .querySelectorAll(
            "#cartCount, .cart-count, [data-cart-count]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    count;

            }
        );


    const total =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    document
        .querySelectorAll(
            "#cartTotal, .cart-total, [data-cart-total]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    `¥${formatPrice(total)}`;

            }
        );


    document
        .querySelectorAll(
            "#cartItems, .cart-items"
        )
        .forEach(
            function (container) {

                renderCart(container);

            }
        );

}


function renderCart(container) {

    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add a product to continue.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    cart.forEach(
        function (item) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "cart-item";


            row.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${escapeHTML(
                        item.name
                    )}"
                >


                <div class="cart-item-info">

                    <h4>
                        ${escapeHTML(
                            item.name
                        )}
                    </h4>


                    <strong>
                        ¥${formatPrice(
                            item.price
                        )}
                    </strong>


                    <div class="cart-controls">

                        <button
                            type="button"
                            data-cart-decrease="${
                                item.id
                            }"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            data-cart-increase="${
                                item.id
                            }"
                        >
                            +
                        </button>


                        <button
                            type="button"
                            data-cart-remove="${
                                item.id
                            }"
                            class="remove-item"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;


            container.appendChild(row);

        }
    );

}


/* =========================================================
   13. WISHLIST
   ========================================================= */

function setupWishlist() {

    document
        .querySelectorAll(
            "#wishlistButton, .wishlist-toggle"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        showToast(
                            wishlist.length +
                            " item(s) in wishlist"
                        );

                    }
                );

            }
        );

}


function toggleWishlist(productId) {

    const index =
        wishlist.indexOf(productId);


    if (index === -1) {

        wishlist.push(productId);

        showToast(
            "Added to wishlist ♥"
        );

    } else {

        wishlist.splice(
            index,
            1
        );

        showToast(
            "Removed from wishlist"
        );

    }


    saveWishlist();

    updateWishlist();

    renderProducts();

}


function updateWishlist() {

    document
        .querySelectorAll(
            "#wishlistCount, .wishlist-count"
        )
        .forEach(
            function (element) {

                element.textContent =
                    wishlist.length;

            }
        );

}


/* =========================================================
   14. PRODUCT MODAL
   ========================================================= */

function setupProductModal() {

    document
        .querySelectorAll(
            "#modalClose, .modal-close, [data-modal-close]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    closeProductModal
                );

            }
        );


    const modal =
        document.querySelector(
            "#productModal, .product-modal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeProductModal();

                }

            }
        );

    }

}


function openProductModal(productId) {

    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        return;

    }


    currentProduct =
        product;


    const modal =
        document.querySelector(
            "#productModal, .product-modal"
        );


    if (!modal) {

        addToCart(productId);

        return;

    }


    const image =
        modal.querySelector(
            "#modalProductImage, .modal-product-image"
        );


    const title =
        modal.querySelector(
            "#modalProductTitle, .modal-product-title"
        );


    const description =
        modal.querySelector(
            "#modalProductDescription, .modal-product-description"
        );


    const price =
        modal.querySelector(
            "#modalProductPrice, .modal-product-price"
        );


    if (image) {

        image.src =
            product.image;

        image.alt =
            product.name;

    }


    if (title) {

        title.textContent =
            product.name;

    }


    if (description) {

        description.textContent =
            product.description;

    }


    if (price) {

        price.textContent =
            `¥${formatPrice(
                product.price
            )}`;

    }


    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeProductModal() {

    const modal =
        document.querySelector(
            "#productModal, .product-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "modal-open"
    );


    currentProduct =
        null;

}


/* =========================================================
   15. WHATSAPP
   ========================================================= */

function setupWhatsApp() {

    document
        .querySelectorAll(
            "#messageUs, .whatsapp-btn, .message-btn, [data-whatsapp]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const message =
                            button.dataset.whatsapp ||
                            `Hello ${STORE_NAME}, I would like to know more about your nail printers.`;


                        openWhatsApp(
                            message
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            const checkout =
                event.target.closest(
                    "#checkoutButton, .checkout-btn, [data-checkout]"
                );


            if (!checkout) {

                return;

            }


            event.preventDefault();


            checkoutWhatsApp();

        }
    );

}


function openWhatsApp(message) {

    const number =
        String(
            WHATSAPP_NUMBER
        ).replace(
            /\D/g,
            ""
        );


    if (
        !number ||
        number.includes(
            "XXXXXXXX"
        )
    ) {

        showToast(
            "Add the real WhatsApp number in script.js"
        );

        return;

    }


    const url =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


function checkoutWhatsApp() {

    if (!cart.length) {

        showToast(
            "Your cart is empty"
        );

        return;

    }


    let message =
        `Hello ${STORE_NAME}, I would like to order:%0A%0A`;


    cart.forEach(
        function (item) {

            message +=
                `• ${item.name} × ${item.quantity}%0A`;

        }
    );


    const total =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    message +=
        `%0ATotal: ¥${formatPrice(total)}`;


    openWhatsApp(
        decodeURIComponent(
            message
        )
    );

}


/* =========================================================
   16. FORMS
   ========================================================= */

function setupForms() {

    document
        .querySelectorAll("form")
        .forEach(
            function (form) {

                form.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();


                        const data =
                            new FormData(form);


                        const name =
                            data.get(
                                "name"
                            ) || "";


                        const phone =
                            data.get(
                                "phone"
                            ) || "";


                        const email =
                            data.get(
                                "email"
                            ) || "";


                        const message =
                            data.get(
                                "message"
                            ) || "";


                        let text =
                            `Hello ${STORE_NAME},%0A%0A`;


                        if (name) {

                            text +=
                                `Name: ${name}%0A`;

                        }


                        if (phone) {

                            text +=
                                `Phone: ${phone}%0A`;

                        }


                        if (email) {

                            text +=
                                `Email: ${email}%0A`;

                        }


                        if (message) {

                            text +=
                                `Message: ${message}%0A`;

                        }


                        openWhatsApp(
                            decodeURIComponent(
                                text
                            )
                        );


                        form.reset();

                    }
                );

            }
        );

}


/* =========================================================
   17. CATEGORY FILTER
   ========================================================= */

function setupCategoryFilters() {

    document
        .querySelectorAll(
            "[data-category]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const category =
                            button.dataset.category;


                        if (
                            !category ||
                            category === "all"
                        ) {

                            renderProducts();

                            return;

                        }


                        const results =
                            products.filter(
                                function (product) {

                                    return (
                                        product.category
                                            .toLowerCase() ===
                                        category
                                            .toLowerCase()
                                    );

                                }
                            );


                        renderProducts(
                            results
                        );

                    }
                );

            }
        );

}


/* =========================================================
   18. NEWSLETTER
   ========================================================= */

function setupNewsletter() {

    document
        .querySelectorAll(
            ".newsletter-form"
        )
        .forEach(
            function (form) {

                form.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();

                        showToast(
                            "Thank you for subscribing ✓"
                        );

                        form.reset();

                    }
                );

            }
        );

}


/* =========================================================
   19. BACK TO TOP
   ========================================================= */

function setupBackToTop() {

    const button =
        document.querySelector(
            "#backToTop, .back-to-top"
        );


    if (!button) {

        return;

    }


    window.addEventListener(
        "scroll",
        function () {

            button.classList.toggle(
                "visible",
                window.scrollY > 400
            );

        },
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   20. SCROLL ANIMATIONS
   ========================================================= */

function setupScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal, .fade-up, .animate-on-scroll"
        );


    if (
        !elements.length
    ) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   21. KEYBOARD
   ========================================================= */

function setupKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            closeCart();

            closeProductModal();


            const navbar =
                document.querySelector(
                    "#navMenu, .navbar, .nav-menu"
                );


            const button =
                document.querySelector(
                    "#menuToggle, .menu-toggle, .hamburger"
                );


            if (navbar) {

                navbar.classList.remove(
                    "active"
                );

            }


            if (button) {

                button.classList.remove(
                    "active"
                );

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   22. SMOOTH SCROLL
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {

            return;

        }


        const id =
            link.getAttribute(
                "href"
            );


        if (
            !id ||
            id === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(
                id
            );


        if (!target) {

            return;

        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   23. TOAST
   ========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(
            "#toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "toast";


        toast.className =
            "toast";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


/* =========================================================
   24. HELPERS
   ========================================================= */

function formatPrice(price) {

    return Number(
        price
    ).toLocaleString(
        "en-US"
    );

}


function escapeHTML(value) {

    return String(
        value
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   25. IMAGE FALLBACK
   ========================================================= */

document.addEventListener(
    "error",
    function (event) {

        const image =
            event.target;


        if (
            !image ||
            image.tagName !== "IMG"
        ) {

            return;

        }


        if (
            image.dataset.fallbackUsed
        ) {

            return;

        }


        image.dataset.fallbackUsed =
            "true";


        image.src =
            "assets/images/placeholder.webp";

    },
    true
);


/* =========================================================
   END
   ========================================================= */

   