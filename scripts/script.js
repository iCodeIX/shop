const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeNavIcon = document.querySelector(".close-nav-icon");
const navMenu = document.querySelector(".header-nav");

/*products variables */


/* HEADER AND NAVIGATION */

hamburgerIcon.addEventListener("click", showNavMenu);
closeNavIcon.addEventListener("click", closeNavMenu);

function showNavMenu() {
    navMenu.style.display = "block";
}

function closeNavMenu() {
    navMenu.style.display = "none";
}

/* PRODUCTS SECTION */

//populate products list with items

const productsList = document.querySelector(".products-list");

for (let i = 0; i < products.length; i++) {

    let productItem = document.createElement("li");
    productItem.className = "product-item";

    let productImage = document.createElement("img");
    productImage.className = "product-image";
    productImage.src = products[i].product_image;


    let productName = document.createElement("p");
    productName.className = "product-name";
    productName.innerText = products[i].product_name;

    let productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productPrice.innerText = products[i].product_price;

    let productQuantityToBuy = document.createElement("input");
    productQuantityToBuy.type = "number";
    productQuantityToBuy.className = "quantity-to-buy";
    productQuantityToBuy.value = 1;

    let productDecrementQuantityToBuyBtn = document.createElement("button");
    productDecrementQuantityToBuyBtn.className = "quantity-decrease-btn";
    productDecrementQuantityToBuyBtn.innerText = "-";

    let productIncrementQuantityToBuyBtn = document.createElement("button");
    productIncrementQuantityToBuyBtn.className = "quantity-increase-btn";
    productIncrementQuantityToBuyBtn.innerText = "+";

    let addToCartBtn = document.createElement("button");
    addToCartBtn.className = "product-add-cart-btn";
    addToCartBtn.innerText = "Add to cart";

    productItem.append(productImage, productName, productPrice, productDecrementQuantityToBuyBtn
        , productQuantityToBuy, productIncrementQuantityToBuyBtn, addToCartBtn);
    productsList.append(productItem);

}

// increment and decrement of quantity to buy

const incrementBtn = document.querySelectorAll(".quantity-increase-btn");
var quantity = 1;

//increment buttons 
incrementBtn.forEach((item, index) => {
    item.addEventListener('click', arrow => {
        quantity = parseInt(incrementBtn[index].previousElementSibling.value);
        quantity++;
        incrementBtn[index].previousElementSibling.value = quantity;

    })
})

const decrementBtn = document.querySelectorAll(".quantity-decrease-btn");

//decrement buttons
decrementBtn.forEach((item, index) => {
    item.addEventListener('click', arrow => {
        quantity = parseInt(decrementBtn[index].nextElementSibling.value);
        if (quantity != 1) {
            quantity--;
            decrementBtn[index].nextElementSibling.value = quantity;
        }

    })
})

