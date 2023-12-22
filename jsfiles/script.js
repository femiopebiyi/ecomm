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




console.log(cart)

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
                <div><h4 class="new-price" data-new-price="${cartItem.name}">${cartItem.price}</h4></div>
            </div>
    `
})



if(window.document.title === "Cart"){
    document.querySelector(".container1").innerHTML = cartHtml
}


const removeFromCart = document.querySelectorAll(".js-remove")

removeFromCart.forEach((item)=>{
    
    item.addEventListener("click", function(){
        checkIfEmpty()
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
            console.log(cart)
}

    updateTotalPrice()
    })
})



const newPrice = document.querySelectorAll(".new-price")


function updateTotalPrice (){
    let totalPrice = document.querySelector(".total-price")
let totalItems = document.querySelector(".total-item")
    const length = document.querySelectorAll(".product-contain")
    const totalLength = length.length
    totalItems.innerHTML = `Total(${totalLength} items)`

    let total = 0;

    newPrice.forEach((item)=>{
        let number = parseFloat(item.innerHTML, 10)
        total+= number
        console.log(total)
    })

    totalPrice.innerHTML = `₦${total}`
}


updateTotalPrice()

const quantity = document.querySelectorAll(".item-quantity");


quantity.forEach((item)=>{
    item.addEventListener("change", function(){
        const dataQuantity = item.dataset.quantity
        let quantity = item.value;
        let initial = cart.find(item => item.name === dataQuantity);
        let initialPrice = initial.price
        console.log(initialPrice)
        cart.forEach((item2)=>{
            
            if(item2.name === dataQuantity){
                let newQuantity = initialPrice * quantity
                newPrice.forEach((item3)=>{
                    const newPr = item3.dataset.newPrice
                    if(newPr === item2.name){
                        item3.innerHTML = newQuantity;
                        const anotherNew = cart.find(item => item.name === newPr)
                        if(anotherNew){
                            updateTotalPrice()
                        }
                    }
                })
            }
        })
    })
})


function checkIfEmpty(){
    const page = document.querySelector(".cart-contain");
const length = document.querySelectorAll(".product-contain")
if(length.length < 1){
    document.body.innerHTML = `
    <div class="empty-cart">
    <img src="./empty-cart.png" class="empty">
    <h4>Your Cart is empty <a href="index.html">Go to Store</a></h4>
    </div>
    `
    const emptyCart = document.querySelector(".empty-cart")
    emptyCart.style.height = "100vh"
}
}

checkIfEmpty()


