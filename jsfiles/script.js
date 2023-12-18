import { products } from "./product.js"

let productsHTML = ``


products.forEach((product)=>{
productsHTML += `
    <div class="product-container">
        <div class="img-contain"><img src="${product.image}" alt="" class="product-img"></div>
        <h2 class="product-name">${product.name}</h2>
        <div class="add">
            <p class="price">₦${product.price}</p>
            <button class="to-cart">Add to Cart</button>
        </div>
    </div>
    
`;



})

document.querySelector(".container").innerHTML = productsHTML


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