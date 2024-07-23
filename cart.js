document.addEventListener("DOMContentLoaded", function() {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fetch products from the API
    fetch('https://dummyjson.com/products/')
        .then(response => response.json())
        .then(data => {
            products = data.products;
            displayProducts();
            displayCart();  // Display the cart on page load
        })
        .catch(error => console.error('Error fetching products:', error));

    // Function to display products
    function displayProducts() {
        const root = document.getElementById("root");
        root.innerHTML = products.map((item, index) => {
            return `
                <div class="box">
                    <div class="img-box">
                        <img class="images" src="${item.thumbnail}" alt="${item.title}">
                    </div>
                    <div class="bottom">
                        <p>${item.title}</p>
                        <h2>$${item.price}.00</h2>
                        <button onclick="addToCart(${index})">Add To Cart</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Function to add product to cart
    window.addToCart = function(index) {
        cart.push(products[index]);
        saveCart();
        displayCart();
    }

    // Function to display cart
    function displayCart() {
        const cartItem = document.getElementById("cart-item");
        document.getElementById("count").innerHTML = cart.length;
        if (cart.length === 0) {
            cartItem.innerHTML = "Your Cart Is Empty";
        } else {
            cartItem.innerHTML = cart.map((item, index) => {
                return `
                    <div class="cartItem">
                        <div class="row-img">
                            <img class="rowimg" src="${item.thumbnail}" alt="${item.title}">
                        </div>
                        <p style="font-size:12px;">${item.title}</p>
                        <h2 style="font-size:15px;">$${item.price}</h2>
                        <i class='bx bxs-trash-alt' onclick='delElement(${index})'></i>
                    </div>
                `;
            }).join('');
            calculateTotal();
        }
    }

    // Function to remove product from cart
    window.delElement = function(index) {
        cart.splice(index, 1);
        saveCart();
        displayCart();
    }

    // Function to calculate total price
    function calculateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById("total").innerHTML = `$${total.toFixed(2)}`;
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Event listeners for cart sidebar
    const cartIcon = document.getElementById("cart-icon");
    const closeCart = document.getElementById("close-cart");
    const cartSidebar = document.getElementById("cart-sidebar");

    cartIcon.addEventListener("click", () => {
        cartSidebar.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });

    // Close the cart sidebar when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === cartSidebar) {
            cartSidebar.classList.remove("active");
        }
    });
});
