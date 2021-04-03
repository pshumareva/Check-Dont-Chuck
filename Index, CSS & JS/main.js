let carts = document.querySelectorAll('.add-to-cart');
let items = [
    {
        image: '',
        title: "Mcdonalds",
        tag: "mcdonalds",
        type: "fast-food",
        description: "Menu usually includes: burgers, sandwiches, french fries, desserts, milkshakes.",
        quantity: 1,
        price: 3,
        inCart: 0
    },
    {
        image: '',
        title: "Subway",
        tag: "subway",
        type: "fast-food",
        description: "Menu usually includes: A large variety of sandwiches, salads and desserts.",
        quantity: 2,
        price: 3,
        inCart: 0
    },
    {
        image: '',
        title: "Verdi",
        tag: "verdi",
        type: 'pizzeria',
        description: "Menu usually includes: Pizza, salads, chicken wings, risotto, traditional main dishes, desserts.",
        quantity: 4,
        price: 8,
        inCart: 0
    },
    {
        image: '',
        title: "Veggic",
        tag: "veggic",
        type: 'vegetarian-restaurant',
        description: "Menu usually includes: Varieties of soups, traditional meals, salads, pastries and desserts.",
        quantity: 3,
        price: 5,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(items[i]);
        totalCost(items[i]);
    })
}

function cartNumbers(items) {

    let itemNumbers = localStorage.getItem('cartNumbers');

    itemNumbers = Number(itemNumbers);

    if (itemNumbers) {
        localStorage.setItem('cartNumbers', itemNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(items);

}

function setItems(items) {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);


    if (cartItems != null) {

        if (cartItems[items.tag] == undefined){
            cartItems = {
                ...cartItems,
                [items.tag]: items
            }
        }
        cartItems[items.tag].inCart += 1;
    } else {
        items.inCart = 1;
        cartItems = {
            [items.tag]: items
        }
    }



    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

function totalCost(items){
    let cartCost = localStorage.getItem('totalCost');
    

    if (cartCost != null){
        cartCost = Number(cartCost);
        localStorage.setItem("totalCost", cartCost + items.price)
    }else {
        localStorage.setItem("totalCost", items.price); 
    }
}
function displayCart() {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    let itemContainer = document.querySelector(".items");
    let cartCost = localStorage.getItem('totalCost')
    

    if(cartItems && itemContainer){
        itemContainer.innerHTML = '';
        
        Object.values(cartItems).map(item => {
            itemContainer.innerHTML += `
            <div class="item">
                
                <div class="logoAndName">
                    <img src="../images/${item.tag}.jpg" class="itemLogo">
                    <span><b> ${item.title}</b></span>
                    
                </div>
                <div class="itemPrice">${item.price}lv</div>
                <div class="itemsInCart">
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    ${item.inCart}
                    <ion-icon name="add-circle-outline"></ion-icon>
                </div>
                <div class="itemTotal1">
                    ${item.inCart * item.price}lv
                </div>
                <div class="trashIcon">
                    <ion-icon name="trash-outline"></ion-icon>
                </div>
            </div> 
            `
        });

        itemContainer.innerHTML += `
        <div class="basketTotalContainer>
        <h4 class="basketTotalTitle">
        Total:
        </h4>
        <h4 class="basketTotal">
            <b>Total:</b> ${cartCost}lv
        </h4>
        `
    } else {
        itemContainer.innerHTML = '';
        itemContainer.innerHTML += `
            <h1> Your basket is empty! </h1>
        `

    }
}
displayCart();


//const itemsList = document.querySelectorAll('.shopping-cart')
//const itemsTemplate = document.querySelectorAll('.itemInCart');

//function renderItems(itemsArray) {
  //  itemsList.innerHTML;

   // itemsArray.forEach(item => {
     //   const templateClone = itemsTemplate.clone();
       // templateClone.attr('class', '');
      //  templateClone.find('.itemPic').attr('src',item.image);
      //  templateClone.find('.itemDesc')//.text(item.description);
      //  templateClone.find('.itemQuantity').text(item.quantity);
       // templateClone.find('.price').text(item.price + 'lv');
       // itemsList.append(templateClone)
   // });
//}
//renderItems(items);


