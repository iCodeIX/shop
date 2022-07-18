const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeNavIcon = document.querySelector(".close-nav-icon");
const navMenu = document.querySelector(".header-nav");
var origArray = products;
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


// search  products

var searchProductInput = document.querySelector("#productInput");
var searchBtn = document.querySelector("#searchBtn");
var paginateOrig = true;
var filteredProds;
var productsList = document.querySelector(".products-list");
var pagesCount;
var productsPage = document.querySelector(".products-pages-list");

var cart = [];


//populate products list with items
function displayProducts(products) {

    productsList.innerHTML = "";

    for (let i = 0; i < products.length; i++) {


        let productItem = document.createElement("li");
        productItem.className = "product-item";
        productItem.id = "product" + products[i].product_id;

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
}
displayProducts(products);

// when page reload, automatically apply pagination for products

function checkToPaginate() {
    if (paginateOrig) {
        // on 1st page reload , after paginate invoked, call createPages for the user interface part
        paginatedProducts = paginate(origArray, 6, 1);
        displayProducts(paginatedProducts);
        createPages(pagesCount);
        clickedPagesButton();
        incrementQuantity();
        decrementQuantity();
        addToCartBtnsFunctions();
    }
    else {
        productsPage.innerHTML = "";
        displayProducts(filteredProds);
        paginate(filteredProds, 6, 1);
        createPages(pagesCount);
        clickedPagesButton();
        incrementQuantity();
        decrementQuantity();
        addToCartBtnsFunctions();
    }

}
checkToPaginate();



//return paged  products 
function paginate(array, page_size, page_number) {
    pagesCount = Math.round(array.length / page_size);
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}



//create buttons to navigate
function createPages(pagesCount) {
    
    for (let p = 1; p <= pagesCount; p++) {
        let pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        pageItem.innerHTML = p;

        productsPage.appendChild(pageItem);
    }

}


//pages btn 
//getting the button page index
function clickedPagesButton() {
    let pagesBtn = document.querySelectorAll(".page-item");
   
        pagesBtn.forEach((item, index) => {
            item.addEventListener("click", arrow => {
                displayNewPage(index);
                addToCartBtnsFunctions();
                incrementQuantity();
                decrementQuantity();
            });

        });
}


// get the page index then call again the products display to get the appropriate page display
function displayNewPage(pageIndex) {
    let newPageProducts;
    newPageProducts = paginate(origArray, 6, pageIndex + 1);
    displayProducts(newPageProducts);
}


searchBtn.addEventListener("click", arrow => {
    productsList.innerHTML = "";
    let keyWordToSearch = "";
    keyWordToSearch = searchProductInput.value;

    filteredProds = searchProducts(origArray, keyWordToSearch);
    displayProducts(filteredProds);
    addToCartBtnsFunctions();
    incrementQuantity();
    decrementQuantity();
    paginateOrig = false;
    checkToPaginate();
});


//filterproducts , when no products to show , show the no item found message
function searchProducts(prods, keyWord) {
    keyWord = keyWord.toLowerCase();
    let newArr = [];
    for (let p = 0; p < prods.length; p++) {
        let prodName = prods[p].product_name;

        if (prodName.toLowerCase().includes(keyWord)) {
            newArr.push(prods[p]);
        }
    }
    prods = newArr;
    return prods;
}



/* CART */


//cart buttons, when click do certain calls of functions
const addedToCartMsg = document.querySelector(".added-to-cart-modal");
function addToCartBtnsFunctions() {
    let addToCartBtns = document.querySelectorAll(".product-add-cart-btn");
    addToCartBtns.forEach((item, index) => {
        item.addEventListener('click', arrow => {
            getProductInfo(index);
            showAddedToCartMsg();

        })
    })
}

//call add to cart buttons when page loaded


//getting info(product id of the clicked item) from products list  after add to cart was clicked. 
function getProductInfo(itemIndex) {
    let productItem = document.querySelectorAll(".product-item")[itemIndex];
    let productId = productItem.id;

    let quantity = parseInt(productItem.querySelector(".quantity-to-buy").value);

    productId = parseInt(productId.replace("product", ""));

    if (cart.length == 0) {
        addToCart(productId, quantity);
    }
    else {
        var existOrNot = checkItemIfExistOnCart(productId);

        if (existOrNot == false) {
            addToCart(productId, quantity);
        }
        else {
            addToCartItemQuantity(productId, quantity);
        }
    }

}

//check if product already exist on cart items

function checkItemIfExistOnCart(productId) {
    var found = 0;

    for (var x = 0; x < cart.length; x++) {
        if (cart[x].productId == productId) {
            found++;
        }
    }

    if (found == 1) {
        return true;
    }
    return false;
}

// this is adding item to cart array of objects(items)
function addToCart(prodId, productQuantity) {
    let cartItems = {};

    cartItems.userId = 1; // There is no login, so we used fake userId which is 1
    cartItems.productId = parseInt(prodId);
    cartItems.quantity = productQuantity;

    cartItems.productName = origArray[prodId - 1].product_name;
    cartItems.productPrice = origArray[prodId - 1].product_price;
    cartItems.productImg = origArray[prodId - 1].product_image;

    cart.push(cartItems);
    displayCartItems();
}


function addToCartItemQuantity(prodId, productQuantity) {

    for (let c = 0; c < cart.length; c++) {

        if (prodId == cart[c].productId) {
            let newQuantity = parseInt(cart[c].quantity) + parseInt(productQuantity);
            cart[c].quantity = newQuantity;
        }
    }

    displayCartItems();
}


var quantity = 1;

// increment and decrement of quantity to buy

function incrementQuantity() {
    //increment quantity buttons 
    let incrementBtn = document.querySelectorAll(".quantity-increase-btn");
    incrementBtn.forEach((item, index) => {
        item.addEventListener('click', arrow => {
            quantity = parseInt(incrementBtn[index].previousElementSibling.value);
            quantity++;
            incrementBtn[index].previousElementSibling.value = quantity;

        })
    })
}

function decrementQuantity() {
    let decrementBtn = document.querySelectorAll(".quantity-decrease-btn");
    //decrement quantity buttons
    decrementBtn.forEach((item, index) => {
        item.addEventListener('click', arrow => {
            quantity = parseInt(decrementBtn[index].nextElementSibling.value);
            if (quantity != 1) {
                quantity--;
                decrementBtn[index].nextElementSibling.value = quantity;
            }

        })
    })
}


//HIDE AND SHOW CART

const cartModal = document.querySelector(".cart-modal");
const cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener('click', showAndHideCart);

function showAndHideCart() {
    cartModal.classList.toggle("show-cart");
}



//displaying array of object(items) to the cart
function displayCartItems() {
    //create each item elements
    //dividers
    let cartItemList = document.querySelector(".cart-item-list");
    /* because we are appending the items elements in the cart list each time we display items, we need to
    empty the parent element first so it will not append to the prior appended (old data) 
    display items  */
    cartItemList.innerHTML = "";
    for (let c = 0; c < cart.length; c++) {

        let itemImageContainer = document.createElement("div");
        itemImageContainer.className = "item-image-container";
        let itemInfoContainer = document.createElement("div");
        itemInfoContainer.className = "item-info-container";
        let itemCheckBoxContainer = document.createElement("div");
        itemCheckBoxContainer.className = "item-checkbox-container";

        let cartItem = document.createElement("li");
        cartItem.className = "cart-item";

        let cartItemImg = document.createElement("img");
        cartItemImg.className = "cart-item-img";
        cartItemImg.src = cart[c].productImg;

        let cartItemName = document.createElement("p");
        cartItemName.className = "cart-item-name";
        cartItemName.innerText = cart[c].productName;

        let cartItemPrice = document.createElement("span");
        cartItemPrice.className = "cart-item-price";
        cartItemPrice.innerText = cart[c].productPrice;

        let timesSign = document.createElement("span");
        timesSign.innerText = " x ";
        timesSign.style.color = "#fff";


        let cartItemQuantity = document.createElement("span");
        cartItemQuantity.className = "cart-item-quantity";
        cartItemQuantity.innerText = cart[c].quantity;

        let cartItemTotal = document.createElement("p");
        cartItemTotal.className = "cart-item-total";
        cartItemTotal.innerText = "Total : " + cart[c].productPrice * cart[c].quantity;;

        let cartItemCheckBox = document.createElement("input");
        cartItemCheckBox.type = "checkbox";
        cartItemCheckBox.className = "cart-item-checkbox";

        itemImageContainer.append(cartItemImg);
        itemInfoContainer.append(cartItemName, cartItemPrice, timesSign, cartItemQuantity, cartItemTotal);
        itemCheckBoxContainer.append(cartItemCheckBox);
        cartItem.append(itemImageContainer, itemInfoContainer, itemCheckBoxContainer);
        cartItemList.append(cartItem);
    }


}


//select all checkboxes button
var selectAll = document.querySelector("#select-all-checkbox");
selectAll.addEventListener('change', (e) => {

    if (e.target.checked) {

        selectAndDeselect("select");
    }
    else {

        selectAndDeselect("deselect");
    }
})




//select or deselect checkboxes

function selectAndDeselect(checkboxAll) {
    let checkboxes = document.querySelectorAll(".cart-item-checkbox");

    if (checkboxAll == "select") {
        checkboxes.forEach((item, index) => {
            item.checked = true;
        })
    }
    else {
        checkboxes.forEach((item, index) => {
            item.checked = false;
        })
    }

}


//get selected items

function getSelectedItems() {
    let checkboxes = document.querySelectorAll(".cart-item-checkbox");
    let selectedItems = [];
    for (let s = 0; s < checkboxes.length; s++) {
        if (checkboxes[s].checked) {
            selectedItems.push(s);
        }
    }

    return selectedItems;
}

//delete item/s in the cart
var deleteBtn = document.querySelector(".delete-icon");

deleteBtn.addEventListener('click', arrow => {
    var itemsToDelete = getSelectedItems();

    const indexSet = new Set(itemsToDelete);

    //for removing data
    cart = cart.filter((value, i) => !indexSet.has(i));


    /*for removing item display in the cart
    using nested for loop , loop cartItems and itemsTodelete then each loop of cart item 
    compare it to the elements in the itemstodelete */

    let cartItems = document.querySelectorAll(".cart-item");

    for (let p = 0; p < cartItems.length; p++) {
        for (let i = 0; i < itemsToDelete.length; i++) {
            if (p == itemsToDelete[i]) {
              
                cartItems[p].remove();
            }
        }

    }



})


//adding message pop up
function showAddedToCartMsg() {

    addedToCartMsg.style.display = "block";
    setTimeout(hideAddedToCartMsg, 2500);
}

function hideAddedToCartMsg() {
    addedToCartMsg.style.display = "none";
}




