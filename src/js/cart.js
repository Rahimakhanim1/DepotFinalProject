// header js start
let menuBar = document.querySelector("#menu-bar");
let rightHoverSection = document.querySelector(".right-hover-section");
let rightHoverSectionContainerExit = document.querySelector("#right-hover-section-container-exit");
let loginSection = document.querySelector("#login-section");
let loginSectionContainer = document.querySelector(".login-section-container");
let registerCart = document.querySelector("#register-cart");
let loginCart = document.querySelector("#login-cart");
let navMenu = document.querySelector(".nav-menu");
let crossHoverMenu = document.querySelector("#cross-hover-menu");
let aboutItem = document.querySelector(".about-item");
let itemEndirim = document.querySelector(".item-endirim");
let itemImg = document.querySelector(".item-img");
let itemName = document.querySelector(".item-name");
let itemPrice = document.querySelector(".item-price");
let cardsSection = document.querySelector(".cards-section");
let count = 0;
let loginSectionContainerID = document.querySelector("#login-section-container");
let quickLookContainer = document.querySelector(".quick-look-container");
let cartInlineItems = document.querySelector(".cart-inline-items");
let woocommerce = document.querySelector(".woocommerce");
let shoppingCartProduct = document.querySelector(".cart-inner-container");
let tBody = document.querySelector("tbody");

loginSection.addEventListener("click",function(){
    loginSectionContainer.style.display = "flex";
});
registerCart.addEventListener("click",function(){
    registerCart.style.backgroundColor = "#e7e7e7";
    loginCart.style.backgroundColor = "white";
    document.getElementById("email").style.display = "block";
    document.getElementById("repeat-password").style.display = "block";
    document.getElementById("register-a").style.display = "block";
    document.querySelector(".checkbox-section").style.display="none";
    document.getElementById("login-a").style.display = "none";
    document.getElementById("register-text").style.display = "block";

});
loginCart.addEventListener("click",function(){
    registerCart.style.backgroundColor = "white";
    loginCart.style.backgroundColor = "#e7e7e7";
    document.getElementById("email").style.display = "none";
    document.getElementById("repeat-password").style.display = "none";
    document.getElementById("register-a").style.display = "none";
    document.querySelector(".checkbox-section").style.display="block";
    document.getElementById("login-a").style.display = "block";
    document.getElementById("register-text").style.display = "none";
});
menuBar.addEventListener("click",function(){
    rightHoverSection.style.right="0";
    rightHoverSection.style.visibility="visible";
    navMenu.style.visibility = "visible";
    navMenu.style.right = "0";
});
rightHoverSectionContainerExit.addEventListener("click",function(){
    rightHoverSection.style.right="-607px";
    rightHoverSection.style.visibility="hidden"
});
crossHoverMenu.addEventListener('click',function(){
    navMenu.style.right = "-475px";
    navMenu.style.visibility = "hidden";
});
window.addEventListener("click",function(event){
    if(event.target===loginSectionContainerID){
        loginSectionContainer.style.display = "none"; 
    }  
})

// header js end


//get quick modal element start

function quickLookModal(element){
    let elementId = element.parentNode.parentNode.parentNode.parentNode.dataset.id
    fetch('src/js/db.json')
.then(response => response.json())
.then(cavab => {
    let arr = cavab.products;
    arr.forEach(element=>{
        function newOld(e){
            if(e==="true"){
                return "NEW"
            }else{
                return ""
            }
     
        }
       
        function endirim(e,price){
            if(e==""){
                return '$'+price
            }else{
                let newPrice =  parseInt(price) - (parseInt(price)*parseInt(e))/100
                newPrice =  Math.floor(newPrice)
                // price.style.textDecoration = "line-through";
                return '$'+newPrice
                
            }
    
        }
        function ifEndirim(e,price){
            if(e===""){
                return ""
            }else{
                return "$"+price
            }
    
        }
    
        function hasDiscount(e){
            if(e==""){
                return ""
            }else{
                return e+"%"
            }
    
        }
        if(element.id==elementId){
         let modal = `<div class="quick-look-inline-container" data-id="${element.id}">
         <div class="quick-look-close" onclick="closeQuickModal(this)" style="z-index:4444;">
             <img src="src/img/icons8-close-501.png">
         </div>
         <div class="quick-look-image-slider">
             <span id="qk-left-arrow">&#8592;</span>
             <img class="qk-slider-image" src="${element.img[0]}">
             <span id="qk-right-arrow">&#8594;</span>
         </div>


         <div class="quick-look-description">
            
             <h1 class="quick-look-name">${element.itemName}</h1>
             <span class="quick-look-price">${endirim(element.endirim,element.itemPrice)}</span>
             <span class="qk-stars">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
             <p class="qk-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
             <div class="quick-look-quantity-cart">
                     <form>
                         <input type="number" id="quantity" class="quick-look-quantity" name="quantity" min="1" placeholder="Quantity">
                         
                     </form>                 
                 <button class="quantity-btn" href="#" onclick="addToCartQuickLook(this)" data-id="${element.id}">ADD TO CART</button>
             </div>       
             <span class="wishlist-heart-span">&#9829; BROWSE WISHLIST</span>
             
         </div>
     </div>`
         quickLookContainer.innerHTML = modal;
        }
     
quickLookContainer.style.visibility = "visible";

    });
})

}
//get quick modal element end
function closeQuickModal(e){
    quickLookContainer.style.visibility = "hidden";
}
   
// quick look js end


//Card add to cart
function addToCartCardItem(item){
   
    if(localStorage.getItem("basket") === null){
        localStorage.setItem("basket",JSON.stringify([]))
    }
    let basket = JSON.parse(localStorage.getItem("basket"));
fetch('src/js/db.json')
.then(response => response.json())
.then(cavab => {
    let arr = cavab.products;
    arr.forEach(element => {
        if(element.id==item.dataset.id){
                let data_id = element.id
                let exsist = basket.find(p => p.id == data_id);
                if(exsist){
                        exsist.count++                  
                }else{
                        basket.push({
                            id: data_id,
                            count:1
                        })
                    
                    
             
                }
                localStorage.setItem("basket",JSON.stringify(basket));
                quantityInput.value=""
               
            
           
          
        }
    });
})

location.reload()
}






//Quick look Add to Cart
function addToCartQuickLook(item){
    let quantityInput = document.querySelector("#quantity")
   
    if(localStorage.getItem("basket") === null){
        localStorage.setItem("basket",JSON.stringify([]))
    }
    let basket = JSON.parse(localStorage.getItem("basket"));
fetch('src/js/db.json')
.then(response => response.json())
.then(cavab => {
    let arr = cavab.products;
    arr.forEach(element => {
        if(element.id==item.dataset.id){
            // price += parseFloat(itemPrice)
            if(quantityInput.value){
                var elementCount = parseInt(quantityInput.value);}
                let data_id = element.id
                let exsist = basket.find(p => p.id == data_id);
                if(exsist){
                    if(elementCount>0){
                        exsist.count+=elementCount
                    }else if(elementCount==0){
                        console.log(elementCount)
                        exsist.count+=0
                    }
                    else{
                        exsist.count++
                    }
                    
                }else{
                    if(elementCount>0){
                        basket.push({
                            id: data_id,
                            count:elementCount
                        })
                    }else{
                        basket.push({
                            id: data_id,
                            count:1
                        })
                    }
                    
             
                }
                localStorage.setItem("basket",JSON.stringify(basket));
                quantityInput.value=""
               
                
           
          
        }
    });
})
location.reload()
}

// elements to cart
let basket = JSON.parse(localStorage.getItem("basket"));
if(basket){
    document.querySelector(".item-in-cart").style.display = "none";
    document.querySelector(".cart-description").style.display="flex";
    
    let totalPrice = 0 ;
    fetch('src/js/db.json').then(response => response.json()).then(cavab => {
        let arr = cavab.products;
       
        
            arr.forEach(element =>{
                for(let i = 0; i < basket.length; i++){
                if(element.id == basket[i].id){
                    totalPrice += element.itemPrice*basket[i].count
                    let selectedItem = `   
                    <li class="cart-li-item" data-id="${element.id}">
                    <a href="#" class="selected-item">
                        <img src="${element.img[0]}">
                    </a>
                    <div class="selected-item-info">
                        <a href="#" class="selected-item selected-item-name">
                            <h5> ${element.itemName} </h5>
                        </a>
                        <span class="remove-item-from-cart" data-id="${element.id}" onclick="removeItemFromCart(this)"
                            style="color:white;padding-left:30px;">x</span>
                        <span class="item-count-price"><span class="item-count"
                                style="margin-right:3px;">${basket[i].count}</span>x<span class="item-price"
                                style="margin-left:3px;">$${element.itemPrice}</span></span>
                    </div>
                </li>`
                cartInlineItems.innerHTML += selectedItem;
                document.querySelector(".inline-total-price").innerHTML = "$"+totalPrice
                document.querySelector(".total-price").innerHTML = "($"+totalPrice+")"
                // inlineTotalPrice = "$"+totalPrice

                }
            }
    
            })
        
    
    })

    

}
//remove item from cart
function removeItemFromCart(element){
    let elementId = element.dataset.id
    if(basket.length==1){
        localStorage.removeItem("basket");
    }else{
        for (let i = 0; i <basket.length; i++){ 
            if(basket[i].id==elementId){
                basket.splice(basket.indexOf(basket[i]),1);
            }}
        localStorage.setItem("basket",JSON.stringify(basket));
    }
   
    location.reload()
}
       
           
          
        

if(localStorage.getItem("basket") === null){
    document.querySelector(".item-in-cart").style.display = "block";
    document.querySelector(".cart-description").style.display="none";
}

const ifCartIsEmpty = function(){
    let basket = JSON.parse(localStorage.getItem("basket"));
    if(basket !== null){
        woocommerce.style.display = "none";
        shoppingCartProduct.style.display = "flex";

    }else{
        woocommerce.style.display = "flex";
        shoppingCartProduct.style.display = "none";
    }
 
}
ifCartIsEmpty()

function quantityPrice(element){
    let basket = JSON.parse(localStorage.getItem("basket"));
    for(let i = 0;i < basket.length; i++){
        if (element.dataset.id == basket[i].id){
             basket[i].count = element.value
        }
    }
    if(element.value)
    localStorage.setItem("basket",JSON.stringify(basket));
}

fetch("src/js/db.json").then(response => response.json()).then(
    cavab =>{
        let arr = cavab.products;
        let basket = JSON.parse(localStorage.getItem("basket"));
        if(basket!==null){          
                arr.forEach(element =>{
                for(let i = 0; i<basket.length;i++){
                    if(element.id === basket[i].id){
                        let shoppingElement = `  <tr class="shopping-item">
                        <td><img class="remove-item-icon" src="src/img/icons8-close-501.png" onclick="removeItemFromCart(this)" data-id="${element.id}"></td>
                        <td class="shopping-item-image"><a href="#"><img src="${element.img[0]}"></a></td>
                        <td class="shopping-item-name"><a href="#">${element.itemName}</a></td>
                        <td class="shopping-item-price">$${element.itemPrice}</td>
                        <td class="shopping-quantity">
                            <form>
                                <input type="number" data-id="${element.id}" onclick="quantityPrice(this)" class="quick-look-quantity" name="quantity" min="0" value = "${basket[i].count}">                          
                            </form> </td>
                        <td class="shopping-item-total-price">$${element.itemPrice*basket[i].count}</td>
                    </tr>`
                     tBody.innerHTML += shoppingElement;
                    }
                   
                }
            })
        }
      
    }
)
// `<div class="quick-look-inline-container">
//             <div class="quick-look-close">
//                 <img src="${dbElement.img}">
//             </div>
//             <div class="quick-look-image-slider">
//                 <span id="qk-left-arrow">&#8592;</span>
//                 <img class="qk-slider-image" src="src/h1-product-8-600x728.jpg">
//                 <span id="qk-right-arrow">&#8594;</span>
//             </div>


//             <div class="quick-look-description">
               
//                 <h1 class="quick-look-name">WALL CLOCK</h1>
//                 <span class="quick-look-price">$100</span>
//                 <span class="qk-stars">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
//                 <p class="qk-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
//                 <div class="quick-look-quantity-cart">
//                         <form>
//                             <input type="number" id="quantity" class="quick-look-quantity" name="quantity" min="0" placeholder="Quantity">
                            
//                         </form>                 
//                     <button class="quantity-btn" href="#">ADD TO CART</button>
//                 </div>       
//                 <span class="wishlist-heart-span">&#9829; BROWSE WISHLIST</span>
                
//             </div>
//         </div>`

// // slider 

// let sliderh1 = document.querySelector(".slider-item h1");
// let sliderP = document.querySelector(".slider-item p");
// let sliderImg= document.querySelector(".slider-item .bg-img");

// let sliderNumber;



// sliderObj = {
//     firstObj:{
//         id:1,
//         img: "src/img/slider-imgs/h1-slide1-img.png",
//         h1: "Think Different",
//         p: "",
//         class:"first"
//     },
//     secondObj:{
//         id:2,
//         img: "src/img/slider-imgs/h1-slide2-img1.png",
//         h1: "THE UNCON QUERED",
//         p: "That is not dead which can eternal lie, and with strange eons even death may die. In his house at R'lyeh , dead Cthulhu walts dreaming",
//         class:"second"
//     },
//     thirdObj:{
//         id:3,
//         img: "src/img/slider-imgs/h1-slide3-img.jpg",
//         h1: "A NEW HERO RISES",
//         p: "That is not dead which can eternal lie, and with strange eons even death may die. In his house at R'lyeh , dead Cthulhu walts dreaming",
//         class:"third"
//     }
// }
// sliderImg.src = sliderObj.firstObj.img;
// // sliderh1.innerText = sliderObj.firstObj.h1;
// sliderP.innerText = sliderObj.firstObj.p;
// sliderNumber = sliderObj.firstObj.id;
// sliderImg.classList.add("first");
// checkSpan()
// function checkSpan(){
//     if(sliderImg.classList.contains("first")){
//         document.getElementById("first").style.backgroundColor = "black";
//         document.getElementById("second").style.backgroundColor = "transparent";
//         document.getElementById("third").style.backgroundColor = "transparent";
//     }else if(sliderImg.classList.contains("second")){
//         document.getElementById("second").style.backgroundColor = "black";
//         document.getElementById("first").style.backgroundColor = "transparent";
//         document.getElementById("third").style.backgroundColor = "transparent";
//     }else{
//         document.getElementById("third").style.backgroundColor = "black";
//         document.getElementById("second").style.backgroundColor = "transparent";
//         document.getElementById("first").style.backgroundColor = "transparent";
//     }
// }
// function checkClass(className){
//     sliderImg.classList.add(className);
//     if(className == sliderObj.firstObj.class){
        
//         if(sliderImg.classList.contains("second")){
//             sliderImg.classList.remove("second")
//         }
//         if(sliderImg.classList.contains("third")){
//             sliderImg.classList.remove("third")
//         }
//     }else if(className == sliderObj.secondObj.class){
        
//         if(sliderImg.classList.contains("third")){
//             sliderImg.classList.remove("third")
//         }
//         if(sliderImg.classList.contains("first")){
//             sliderImg.classList.remove("first")
//         }
//     }else{
//         if(sliderImg.classList.contains("first")){
//             sliderImg.classList.remove("first")
//         }
//         if(sliderImg.classList.contains("second")){
//             sliderImg.classList.remove("second")
//         }
       
//     }
// }
// function firstItem(){
//     sliderImg.src = sliderObj.firstObj.img;
//     checkClass(sliderObj.firstObj.class);
//     sliderImg.classList.add(sliderObj.firstObj.class);
//     sliderh1.innerText = sliderObj.firstObj.h1;
//     sliderP.innerText = sliderObj.firstObj.p;
//     sliderNumber = sliderObj.firstObj.id;
//     checkSpan()
  
   

// }

// function secondItem(){
//     sliderImg.src = sliderObj.secondObj.img;
//     checkClass(sliderObj.secondObj.class);
//     sliderImg.classList.add(sliderObj.secondObj.class);
//     sliderh1.innerText = sliderObj.secondObj.h1;
//     sliderP.innerText = sliderObj.secondObj.p;
//     sliderNumber = sliderObj.secondObj.id;
//     checkSpan()
  

// }

// function thirdItem(){
//     sliderImg.src = sliderObj.thirdObj.img;
//     checkClass(sliderObj.thirdObj.class);
//     sliderImg.classList.add(sliderObj.thirdObj.class);
//     sliderh1.innerText = sliderObj.thirdObj.h1;
//     sliderP.innerText = sliderObj.thirdObj.p;
//     sliderNumber = sliderObj.thirdObj.id;
//     checkSpan()
    
// }

// function next2(){
//     if(sliderNumber==1){
//         sliderImg.src = sliderObj.secondObj.img;
//         checkClass(sliderObj.secondObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.secondObj.h1;
//         sliderP.innerText = sliderObj.secondObj.p;
//         sliderNumber = sliderObj.secondObj.id;
//         checkSpan()

//     }else if(sliderNumber==2){
//         sliderImg.src = sliderObj.thirdObj.img;
//         checkClass(sliderObj.thirdObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.thirdObj.h1;
//         sliderP.innerText = sliderObj.thirdObj.p;
//         sliderNumber = sliderObj.thirdObj.id;
//         checkSpan()
//     }else{
//         sliderImg.src = sliderObj.firstObj.img;
//         checkClass(sliderObj.firstObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.firstObj.h1;
//         sliderP.innerText = sliderObj.firstObj.p;
//         sliderNumber = sliderObj.firstObj.id;
//         checkSpan()
//     }
// }
// function next(){
//     if(sliderNumber==1){
//         sliderImg.src = sliderObj.thirdObj.img;
//         checkClass(sliderObj.thirdObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.thirdObj.h1;
//         sliderP.innerText = sliderObj.thirdObj.p;
//         sliderNumber = sliderObj.thirdObj.id;
//         checkSpan()

//     }else if(sliderNumber==2){
//         sliderImg.src = sliderObj.firstObj.img;
//         checkClass(sliderObj.firstObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.firstObj.h1;
//         sliderP.innerText = sliderObj.firstObj.p;
//         sliderNumber = sliderObj.firstObj.id;
//         checkSpan()
//     }else{
//         sliderImg.src = sliderObj.secondObj.img;
//         checkClass(sliderObj.secondObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.secondObj.h1;
//         sliderP.innerText = sliderObj.secondObj.p;
//         sliderNumber = sliderObj.secondObj.id;
//         checkSpan()
//     }
// }

// function come(){

//     if(sliderNumber==1){
//         sliderImg.src = sliderObj.secondObj.img;
//         checkClass(sliderObj.secondObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.secondObj.h1;
//         sliderP.innerText = sliderObj.secondObj.p;
//         sliderNumber = sliderObj.secondObj.id;
//         checkSpan()
//     }else if(sliderNumber==2){
//         sliderImg.src = sliderObj.thirdObj.img;
//         checkClass(sliderObj.thirdObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.thirdObj.h1;
//         sliderP.innerText = sliderObj.thirdObj.p;
//         sliderNumber = sliderObj.thirdObj.id;
//         checkSpan()
//     }else if(sliderNumber==3){
//         sliderImg.src = sliderObj.firstObj.img;
//         checkClass(sliderObj.firstObj.class);
//         sliderImg.classList.add("img-transform");
//         sliderh1.innerText = sliderObj.firstObj.h1;
//         sliderP.innerText = sliderObj.firstObj.p;
//         sliderNumber = sliderObj.firstObj.id;
//         checkSpan()
//     }
// }


// setInterval(come,5000)

// let auto = setInterval(function(){
//     index++;
//     slider();
// },1000);

// img.addEventListener("mouseover",function(){
//     clearInterval(auto);
// });
// img.addEventListener("mouseout",function(){
//      auto = setInterval(function(){
//         index++;
//         slider();
//     },1000);
// });