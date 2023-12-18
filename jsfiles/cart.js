alert("hello")



const cartButton = document.querySelector(".fa-cart-shopping");

cartButton.addEventListener("click", ()=>{
    let cartUrl = `cart.html`
        if(window.document.title !== "Cart"){
            window.location.href = cartUrl
        }
    
})


const home = document.querySelector(".logo")

home.addEventListener("click", ()=>{
    console.log("omaiwa")
    window.location.href = "index.html"
})





// let cartHtml = ``

// cart.forEach ((cartItem)=>{
//     cartHtml += `
//     <div class="product-contain">
//                 <div class="cart-image-container"><img src="${cartItem.image}"></div>
//                 <div class="details">
//                     <p>${cartItem.name}</p>
//                     <p class="stock">In stock!!!</p>
//                     <div class="quantity">
//                     <label for="for">Qty</label>
//                     <select name="for">
//                         <option value="1">1</option>
//                         <option value="1">2</option>
//                         <option value="1">3</option>
//                         <option value="1">4</option>
//                         <option value="1">5</option>
//                         <option value="1">6</option>
//                         <option value="1">7</option>
//                         <option value="1">8</option>
//                         <option value="1">9</option>
//                         <option value="1">10</option>
//                     </select>
//                     </div>
//                     <button class="remove">Remove from cart</button>
//                 </div>
//                 <div><h4>${cartItem.price}</h4></div>
//             </div>
//     `
// })

// document.querySelector(".container1").innerHTML = cartHtml