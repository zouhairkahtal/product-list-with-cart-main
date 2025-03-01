

let products = [];
let selectedProducts = [];

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    products = data.map((product) => {
      return {
        ...product,
        id: product.name.split(" ").join("-").toLowerCase(),
      };
    });

    renderProducts();
  });

function renderProducts() {
  const div = document.getElementById("div");
  let htmlContent = "";
  products.forEach((item) => {
    htmlContent += `
        <div class="w-full max-w-[250px]" >
          <div class="flex flex-col justify-center items-center">
            <figure class="bg-blue-900 rounded-[8px] overflow-hidden">
              <img src="${item.image.desktop}" alt="${item.category} image" />
            </figure>
            <div id="container-button-${item.id}" class=" hover:cursor-pointer relative bottom-[25px] flex bg-white w-[80%] justify-center items-center h-[50px] border-solid border-2 border-[hsl(14,86%,42%)] rounded-full">
              <div id="cart-button-${item.id}" class="flex justify-center items-center ">
                <img src="assets/images/icon-add-to-cart.svg" alt="add-to-cart" />
                <div class="ml-2 text-[hsl(14,65%,9%)]">Add to Cart</div>
              </div>
            </div>

            

          </div>
          <div>
            <p class='text-[hsl(12,20%,44%)]'>${item.category}</p>
            <h2 class="font-[500] text-[hsl(14,65%,9%)]">${item.name}</h2>
            <p class="font-[500] text-[hsl(14,86%,42%)]">$${item.price}</p>
          </div>
        </div>
      `;
  });
  div.innerHTML = htmlContent;
  products.forEach((item) => {
    const cartButton = document.getElementById(`cart-button-${item.id}`);
    cartButton.addEventListener("click", () => {
      selectedProducts.push({
        ...item,
        count: 1,
      });

    

      updateActionButtonToOrderControl({
        ...item,
        count: 1,
      });
      updateCartView();
    });
  });
}

function updateCartView() {
  let totalCount = 0;
  const totalCountElement = document.getElementById("total-items");
  let ProductsElement = document.getElementById("all-products-element");
  let OrderTotal = document.getElementById("order-total");
  ProductsElement.innerHTML=""
  ProductsElement.classList.remove('justify-center')
  ProductsElement.classList.add('justify-start')



  selectedProducts.forEach((x, i) => {
    totalCount += x.count;
    let totalprice = selectedProducts[i].price * selectedProducts[i].count;
    const OrTotal = selectedProducts.reduce((total, product) => total + (product.count * product.price), 0);
 
    if (totalCount !== 0) {
      ProductsElement.innerHTML += ` 
        <div
            id="products-element${x.id}"
            class="h-full  w-full bg-white flex  justify-start flex-col rounded-b-xl"
            >
      <div class=" w-full flex justify-between">
      
          <div class="ml-5">
          <h2 class="font-bold">${selectedProducts[i].name}</h2>
          <div class="flex">
          <p class="text-[hsl(14,25%,72%)]"><span class="text-[hsl(14,86%,42%)]">${selectedProducts[i].count} x</span> @$${selectedProducts[i].price}</p>
          <p class="text-[hsl(7,20%,60%)] font-bold ml-2">$${totalprice}</p>
          </div>
          </div>
          <button id="remove-${x.id}"  class="mr-5 remove flex justify-center items-center rounded-full border-solid border-[1px] border-[hsl(13,31%,94%)] h-5 w-5"> 
          <img src="assets/images/icon-remove-item.svg" alt="empty-cart" />
          </button>
          </div>
          <hr class="w-5/6 h-[2px] pb-4 bg-[hsl(13, 31%, 94%)]">
          </div>
          `;
          
          OrderTotal.innerHTML=`
          <div class="w-full h-full py-5 bg-red-600 flex justify-between">
            <p class="ml-5">Order Total</p>  <p class="mr-5 text-xl font-[600] ">$${OrTotal}</p>
            </div>
            ` 
            
            
          } else {
            
         
          }
          setTimeout(() => {
            removeFromcart(`remove-${x.id}`, x);
          }, 0);
        });
        
        if(totalCount==0){
          OrderTotal.innerHTML=""
          ProductsElement.classList.remove("justify-start");
          ProductsElement.classList.add("justify-center");
          ProductsElement.innerHTML = ` 
          <div 
          class="h-full min-h-[250px] w-full bg-white flex items-center justify-center flex-col rounded-b-xl"
          >
          
          <img
          src="assets/images/illustration-empty-cart.svg"
          alt="empty-cart"
          />
          <p class="text-[14px] text-[hsl(12,20%,44%)] font-[400]">
          Your added iteems will appear here
          </p>
          </div>
          `;
          confirmedDiv2()
        }else{
          confirmedDiv()


        }

  totalCountElement.innerHTML = `
  Your Cart (${totalCount})
  `;
}

function updateActionButtonToOrderControl(item) {

  
  const target = document.getElementById(`container-button-${item.id}`);

    target.innerHTML = `
   
              <div id='add-BTN-${item.id}' class="flex bg-[hsl(14,86%,46%)] rounded-full h-full w-full justify-around items-center">
                <button id="minus-${item.id}" class="minus border-solid border-2 border-white w-8 h-8 rounded-full text-white hover:bg-white hover:text-[hsl(14,86%,42%)]">-</button>
                <h2 class="number text-white">${item.count}</h2>
                <button id="plus-${item.id}" class="plus border-solid border-2 border-white w-8 h-8 rounded-full text-white hover:bg-white hover:text-[hsl(14,86%,42%)]">+</button>
              </div>                       
            `;
            addToOrder(`plus-${item.id}`,item)
            minusFromOrder(`minus-${item.id}`,item)

 
}
function updateActionButtonToOrderControl2(item) {

  
  const target = document.getElementById(`container-button-${item.id}`);

    target.innerHTML = `
              <div id="cart-button-${item.id}" class="flex justify-center items-center ">
                <img src="assets/images/icon-add-to-cart.svg" alt="add-to-cart" />
               <div class="ml-2 text-[hsl(14,65%,9%)]">Add to Cart</div>
              </div>                      
            `;
      
            products.forEach((item) => {
              const cartButton = document.getElementById(`cart-button-${item.id}`);
              cartButton.addEventListener("click", () => {
                selectedProducts.push({
                  ...item,
                  count: 1,
                });
          
              
          
                updateActionButtonToOrderControl({
                  ...item,
                  count: 1,
                });
                updateCartView();
              });
            });
 
}

function addToOrder(id,item) {
  const addBTN = document.getElementById(id, item);

  

  

  addBTN.addEventListener("click", () => {
  

    if (item.count>= 0) {
      selectedProducts = selectedProducts.map((product) => {
        if (product.id === item.id) {
          return {
            ...product,
            count: product.count + 1,
          };
        } else {
          return product;
        }
      });
      updateActionButtonToOrderControl({
      ...item,
      count:item.count+1  
      
      })
    } else {
      selectedProducts.push({
        ...item,
        count: 1,
      });
      updateActionButtonToOrderControl({
        ...item,
        count: 1, 
        
        })
    }
    // updateActionButtonToOrderControl(`cart-button-${i}`);

  
    updateCartView();
  });
}

function minusFromOrder(id, item) {
  const minusBTN = document.getElementById(id, item);
  


  minusBTN.addEventListener("click", () => {
  

    if (item.count>1) {
      selectedProducts = selectedProducts.map((product) => {
        if (product.id === item.id) {
          return {
            ...product,
            count: product.count - 1,
          };
        } else {
          return product;
        }
      });
      updateActionButtonToOrderControl({
      ...item,
      count:item.count-1  
      
      })
    } else {
      selectedProducts = selectedProducts.filter((el)=>el.id!=item.id)

    
      updateActionButtonToOrderControl({
        ...item,
        count: 0, 
        
        })
        updateActionButtonToOrderControl2(item)
    }

    updateCartView();
  });
}

function removeFromcart(id, x) {
  const removeBTN = document.getElementById(id);
  const allProductsElement = document.getElementById('all-products-element')
  const ProductsElement = document.getElementById(`products-element${x.id}`);

  if (removeBTN && ProductsElement) {
    removeBTN.addEventListener("click", () => {
      selectedProducts = selectedProducts.filter(item => item.id !== x.id);
      ProductsElement.remove();
      if(allProductsElement.childElementCount ===0){
    
       x.count=0
       
      }
     updateCartView()
     updateActionButtonToOrderControl2(x)
     
    })
   
    
  }

}


function confirmedDiv(){
  const confirmDIV = document.getElementById('confirm-order')
  confirmDIV.innerHTML=`
    <div class="w-full p-4 bg-red-400 flex  justify-center mt-6 items-center">
      <div class="flex justify-center items-center  bg-white p-4 w-full rounded-lg">
      <img class="mr-2 w-7" src="assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutral">
      <p> This is a <span>carbon-neutral</span> delivery</p>
      </div>
    </div>
    <div class="w-[100%] p-4 bg-white flex flex-col justify-center rounded-b-xl items-center">
       <button id="confirm-btn" class=" bg-[hsl(14,86%,42%)] text-[#fff] w-[100%] p-4 rounded-full">Confirm Order</button>
     </div>
  `
  Confirmedpage()
}
function confirmedDiv2(){
  const confirmDIV = document.getElementById('confirm-order')
  confirmDIV.innerHTML=``
}

function Confirmedpage(){
  const confirmpage = document.getElementById('confirm-page')
  const confirmBTN = document.getElementById('confirm-btn')
  confirmBTN.addEventListener('click',()=>{
    confirmpage.classList.remove('hidden')
    confirmpage.classList.add('flex')
  confirmpage.innerHTML=`
     <div class="w-[500px]  bg-white rounded-xl  flex flex-col items-center">
              <div class="w-[85%]  py-5"> 
                <img class="mb-2 w-10" src="assets/images/icon-order-confirmed.svg" alt="confirm-order">
                <h1 class="mb-1 text-[30px] font-[800]">
                  Order Confirmed
                </h1>
                <p>We hope you Enjoy your food!</p>
              </div>
              <div id="card-confirm-page" class="w-[85%]  bg-[hsl(20,50%,98%)] rounded-l mb-5 max-h-[300px] overflow-auto">
           
              </div>
              <div class="w-[85%] h-[50px]   mb-10">
                <button id="btn" class="w-full h-full text-white rounded-full  bg-[hsl(14,86%,42%)]">
                    Start New Order
                </button>
              </div>
          </div>`
          addproductsToCard()
  }
)
}
function addproductsToCard(){
  const cardConfirmPage = document.getElementById('card-confirm-page')
  selectedProducts.forEach((item)=>{
    cardConfirmPage.innerHTML+=`
      <div class=" w-full h-[80px] px-5 flex items-center justify-between">
      <div class="flex">
      <img class="h-12 mr-5 rounded" src="${item.image.thumbnail}" alt="${item.name}-image">
      <div>
      <p>${item.name}</p>
      <p class="text-[hsl(14,25%,72%)]"><span class="text-[hsl(14,86%,42%)]">${item.count} x</span> @$${item.price}</p>
      </div>
      </div>
           <p class="text-[hsl(7,20%,60%)] font-bold ml-2">$${item.count*item.price}</p>
      </div>
         <hr class="w-full  h-[2px]  bg-[hsl(13, 31%, 94%)">
    `  
    startNewOrder(item)
  }
)
}

function startNewOrder(item){
  const confirmpage = document.getElementById('confirm-page')
  const neworderBTN = document.getElementById('btn')
  neworderBTN.addEventListener('click',()=>{
    selectedProducts = []
    confirmpage.classList.remove('flex')
    confirmpage.classList.add('hidden')
    updateCartView()
    updateActionButtonToOrderControl2(item)
    console.log(selectedProducts)
  })
}



