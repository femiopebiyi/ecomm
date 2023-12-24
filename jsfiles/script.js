// alert("hello")
import { products } from "./product.js"
// import { cart } from "./cartItems.js"

let cart = JSON.parse(localStorage.getItem("carts")) || []
console.log("cart", cart)

let productsHTML = ``


products.forEach((product)=>{
productsHTML += `
    <div class="product-container">
        <div class="img-contain"><img src="${product.image}" alt="" class="product-img"></div>
        <h2 class="product-name">${product.name}</h2>
        <div class="add">
            <p class="price">₦${product.price}</p> 
            <button class="to-cart js-add" data-product-name="${product.name}">Add to Cart</button>
        </div>
    </div>
    
`;



})

if(window.document.title === "Femi Store"){
    document.querySelector(".container").innerHTML = productsHTML
}



const cartButton = document.querySelector(".fa-cart-shopping");

cartButton.addEventListener("click", ()=>{
    let cartUrl = `cart.html`

    window.location.href = cartUrl
})



const home = document.querySelector(".logo")

home.addEventListener("click", ()=>{
    console.log("omaiwa")
    window.location.href = "index.html"
})

const addToCart = document.querySelectorAll(".js-add")

addToCart.forEach((button)=>{
        button.addEventListener ("click", ()=>{
        const productName = button.dataset.productName
        const existingItem = cart.find(item => item.name === productName)

        if(existingItem){
            const buttons = document.querySelectorAll(".to-cart")
            buttons.forEach((button)=>{
                if(existingItem.name === button.dataset.productName){
                    console.log("alreadyyy")
                    button.innerHTML = "already in cart"
                }
            })
        } else {
            products.forEach((item)=>{
            
            if (item.name === productName){
            
            cart.push({
            name: productName,
            price: item.price,
            quantity: 1,
            image: item.image
        })
        }
        localStorage.setItem("carts", JSON.stringify(cart))
        })
        }
        
    })


})






let cartHtml = ``

cart.forEach ((cartItem)=>{
    cartHtml += `
    <div class="product-contain" data-product="${cartItem.name}">
                <div class="cart-image-container"><img src="${cartItem.image}"></div>
                <div class="details">
                    <p>${cartItem.name}</p>
                    <p class="stock">In stock!!!</p>
                    <div class="quantity">
                    <label for="for">Qty</label>
                    <select name="for"class="item-quantity" data-quantity="${cartItem.name}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    </div>
                    <button class="remove js-remove" data-item-name="${cartItem.name}">Remove from cart</button>
                </div>
                <div><h4 class="new-price" data-new-price="${cartItem.name}">₦${cartItem.price}</h4></div>
            </div>
    `
})



if(window.document.title === "Cart"){
    document.querySelector(".container1").innerHTML = cartHtml
}


const removeFromCart = document.querySelectorAll(".js-remove")

removeFromCart.forEach((item)=>{
    
    item.addEventListener("click", function(){
    
        const cartItemName = item.dataset.itemName;
        let objectToRemoveIndex = cart.findIndex(item => item.name === cartItemName)
        let objectToRemoveName = cart.find(item => item.name === cartItemName)
        

        if (objectToRemoveIndex !== -1) {
            cart.splice(objectToRemoveIndex, 1);
            localStorage.setItem("carts", JSON.stringify(cart));
        const allProduts = document.querySelectorAll(".product-contain")
            allProduts.forEach((all)=>{
                if(all.dataset.product === objectToRemoveName.name){
                    all.remove()
                    
                    
                }
            })
            // console.log(cart)
}

    updateTotalPrice()
    })
})




let totalPrice = document.querySelector(".total-price")

function updateTotalPrice (){
    
let totalItems = document.querySelector(".total-item")
    const length = document.querySelectorAll(".product-contain")
    const totalLength = length.length
    totalItems.innerHTML = `Total(${totalLength} items)`

    let total = 0;

    cart.forEach((item)=>{
        total += item.price

    })
    
    totalPrice.innerHTML = `₦${total}`

    if(total === 0){
        checkIfEmpty()
    }
}


updateTotalPrice()







function checkIfEmpty(){
    document.body.innerHTML = `
    <div class="empty-cart">
    <img src="./empty-cart.png" class="empty">
    <h4>Your Cart is empty <a href="index.html">Go to Store</a></h4>
    </div>
    `
    const emptyCart = document.querySelector(".empty-cart")
    // emptyCart.style.height = "100vh"

}


const productContain = document.querySelectorAll(".product-contain")
if(productContain.length < 1){
checkIfEmpty()

}


const newprice = document.querySelectorAll(".new-price")

const quantity = document.querySelectorAll(".item-quantity");

quantity.forEach((item)=>{
    item.addEventListener("change", function(){
        const quantityData = item.dataset.quantity;
        const match =  cart.find(item => item.name === quantityData)
        const stagnantPrice = match.price;
        let newPrice = match.price * item.value;
        match.price = newPrice;
        newprice.forEach((price)=>{
            const newPriceData = price.dataset.newPrice;
            const pricetag = cart.find(item => item.name === newPriceData)
            price.innerHTML = `₦${pricetag.price}`
        })
        updateTotalPrice()
        match.price = stagnantPrice
    })
})