let aboutItem = document.querySelector(".about-item");
let itemEndirim = document.querySelector(".item-endirim");
let itemImg = document.querySelector(".item-img");
let itemName = document.querySelector(".item-name");
let itemPrice = document.querySelector(".item-price");
let cardsSection = document.querySelector(".cards-section");

fetch('src/js/db.json')
.then(response => response.json())
.then(cavab => {
    let arr = cavab.products
    arr.forEach(element => {
        
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
    
        let newCard = `<div class="card">
        <div class="card-sections">
            <div class="card-img-sec">
                <p class="about-item">${newOld(element.isNew)}</p>
                <p class="item-endirim">${endirim(element.endirim,element.itemPrice)}</p>
                <img class="item-img" src="${element.img[0]}" alt="${element.itemName}">
                <div class="img-hover-item">
                    <p id="quick-look">QUICK LOOK</p>
                    <span>&#9825;</span>
                </div>

            </div>
            <div class="card-text-sec">
                <p class="item-name">${element.itemName}</p>
                <div class="hover-text">
                    <p class="add-to-cart-text">ADD TO CART</p>
                    <p class="item-price">${"$"+element.itemPrice} ${endirim(element.endirim,element.itemPrice)}</p>
                </div>
              
            </div>
        </div>
    </div>
  `

  cardsSection.innerHTML += newCard


    });
})