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
    productItem.id = "product" + (1 + i);

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


/* CART */


//HIDE AND SHOW CART

const cartModal = document.querySelector(".cart-modal");
const cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener('click', showAndHideCart);

function showAndHideCart(){
    cartModal.classList.toggle("show-cart");
}

//add item to cart 

const addToCartBtns = document.querySelectorAll(".product-add-cart-btn");
const addedToCartMsg = document.querySelector(".added-to-cart-modal");

addToCartBtns.forEach((item, index) => {
    item.addEventListener('click', arrow => {
        getProductInfo(index);
       
        showAddedToCartMsg();
    })
})


function getProductInfo(itemIndex){
    let productItem = document.querySelectorAll(".product-item")[itemIndex];
    let productId = productItem.id;
    let quantity = parseInt(productItem.querySelector(".quantity-to-buy").value);

    productId = productId.replace("product"," ");

    addToCart(productId, quantity);
}


var cart = [];
var cartItemNoCount = 0;

function addToCart(prodId,productQuantity) {
    let cartItemList = document.querySelector(".cart-item-list");
    var cartItems = {};
    cartItemNoCount++;
    cartItems.userId = 1; // There is no login, so we used fake userId which is 1
    cartItems.itemNo = cartItemNoCount;
    cartItems.productId = parseInt(prodId);
    cartItems.quantity = productQuantity;

    cartItems.productName = products[prodId-1].product_name;
    cartItems.productPrice = products[prodId-1].product_price;
    cartItems.productImg = products[prodId-1].product_image;

    cart.push(cartItems);


    //create each item elements
    //dividers
    let itemNoContainer = document.createElement("div");
    itemNoContainer .className = "item-no-container";
    let itemImageContainer = document.createElement("div");
    itemImageContainer .className = "item-image-container";
    let itemInfoContainer = document.createElement("div");
    itemInfoContainer .className = "item-image-container";

    let cartItem = document.createElement("li");
    cartItem.className = "cart-item";
    
    let cartItemNo = document.createElement("p");
    cartItemNo.className = "cart-item-no";
    cartItemNo.innerText = cartItems.itemNo;

    let cartItemImg = document.createElement("img");
    cartItemImg.className = "cart-item-img";
    cartItemImg.src = cartItems.productImg;

    let cartItemName = document.createElement("p");
    cartItemName.className = "cart-item-name";
    cartItemName.innerText = cartItems.productName;

    let cartItemPrice= document.createElement("span");
    cartItemPrice.className = "cart-item-price";
    cartItemPrice.innerText = cartItems.productPrice;

    let cartItemQuantity= document.createElement("span");
    cartItemQuantity.className = "cart-item-quantity";
    cartItemQuantity.innerText = cartItems.quantity;

    itemImageContainer.append(cartItemImg);
    itemNoContainer.append(cartItemNo);
    itemInfoContainer.append(cartItemName,cartItemPrice,cartItemQuantity);
    cartItem.append(itemNoContainer,itemImageContainer,itemInfoContainer);
    cartItemList.append(cartItem);
}

function showAddedToCartMsg() {

    addedToCartMsg.style.display = "block";
    setTimeout(hideAddedToCartMsg, 2500);
}

function hideAddedToCartMsg() {
    addedToCartMsg.style.display = "none";
}




