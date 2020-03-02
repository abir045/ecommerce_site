if(document.readyState =='loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}




function ready(){


    const removeCartItemButtons=  document.querySelectorAll('.btn-danger');

    for ( let i=0; i< removeCartItemButtons.length; i++ ){
    
        const button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
             
        }

        const quantityInputs = document.querySelectorAll('.cart-quantity-input')
        for ( let i=0; i< quantityInputs.length; i++ ) {
                      const  input = quantityInputs[i]
                      input.addEventListener('change', quantityInputChanged)
        }

        

        const addToCart = document.querySelectorAll('.shop-item-button')
        for  ( let i=0; i< addToCart.length; i++ ){

            const button = addToCart[i]
            button.addEventListener('click', addToCartClicked)
        }


        document.querySelectorAll('.btn-purchase')[0].addEventListener('click', purchaseClicked)
        
             


    }


    function purchaseClicked(){
        alert('thank you for your purchase')
        const cartItems = document.querySelectorAll('.cart-items')[0]
        while(cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }

        updateCartTotal()
    }






function removeCartItem(){

    const buttonClicked = event.target
    
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}


function addToCartClicked(event){
    const button = event.target
     const shopItem = button.parentElement.parentElement
     const title = shopItem.querySelectorAll('.shop-item-title')[0].innerText
     const price = shopItem.querySelectorAll('.shop-item-price')[0].innerText
     const imageSrc = shopItem.querySelectorAll('.shop-item-image')[0].src

     console.log(title, price, imageSrc);
     addItemToCart(title,price,imageSrc);
     updateCartTotal();

}


function addItemToCart (title, price,imageSrc){
        const cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
         cartItems = document.querySelectorAll('.cart-items')[0]
        const cartItemNames = cartItems.querySelectorAll('.cart-item-title')
        for (let i=0; i<cartItemNames.length ; i++){
            if (cartItemNames[i].innerText == title){
                alert('this item has been added to the cart')
                return  //stops executing 
            }
        }

        const cartRowContents = `
        
        <div class="cart-item cart-column">

        <img  class="cart-item-image" src="${imageSrc}" >
        <span class="cart-item-title">${title}</span>
         </div>
    
        <span class="cart-price cart-column">${price}</span>
    
        <div class="cart-quantity cart-column">     
            <input class="cart-quantity-input" type="number" value= "2">
            <button class="btn btn-danger " role="button">REMOVE</button>
        </div>
        `
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        
        cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change',quantityInputChanged )


}





function quantityInputChanged(event){
       
          const input = event.target
          if( isNaN(input.value) || input.value <=0) {
              input.value = 1;

          }

           updateCartTotal();
}





function updateCartTotal(){
    const cartItemConatiner = document.querySelectorAll('.cart-items')[0]
    const cartRows = cartItemConatiner.querySelectorAll('.cart-row')
    let  total =0;
    for ( let i=0; i< cartRows.length; i++ ){
        
        const cartRow = cartRows[i];
        const priceElement = cartRow.querySelectorAll(".cart-price")[0]
        const quantityElement = cartRow.querySelectorAll(".cart-quantity-input")[0]

          const price = parseFloat(priceElement.innerText.replace('$', ''))
          const quantity = quantityElement.value
          //var quantity =10;
          total = total + (price * quantity);

         
    
    }

    total = Math.round(total*100)/100
    
    document.querySelectorAll('.cart-total-price')[0].innerText = '$' + total;
     

} 