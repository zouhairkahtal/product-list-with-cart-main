// fetch("./data.json")
//   .then((res) => res.json())
//   .then((data) => {
//     for (let i = 0; i < data.length; i++) {
//       div.innerHTML += `

//      <div class="w-full max-w-[250px]">

//                 <div class=" flex flex-col justify-center items-center">
//                   <figure class="bg-blue-900 rounded-[8px] overflow-hidden">
//                     <img
//                       src="${data[i].image.desktop}"
//                       alt="${data[i].category} image"
//                     />
//                   </figure>
//                   <button
//                     class="on${
//                       i + 1
//                     } relative bottom-[25px] flex bg-white w-[80%] justify-center items-center h-[50px] border-solid border-2 border-[hsl(14,86%,42%)] rounded-full"
//                   >
//                     <img
//                       src="assets/images/icon-add-to-cart.svg"
//                       alt="add-to-cart"
//                     />
//                     <div class="ml-2">Add to Cart</div>
//                   </button>
//                 </div>
//                 <div>
//                   <p >${data[i].category}</p>
//                   <h2 class="font-[500]">${data[i].name}</h2>
//                   <p class="font-[500] text-[hsl(14,86%,42%)]">$${
//                     data[i].price
//                   }</p>
//                 </div>
//               </div>
//        `;

//       //    document.querySelectorAll('.on').forEach(button => {
//       //        button.addEventListener('click', () => {
//       //            console.log('1')
//       //         });
//       //     });
//     }
//     const desser1 = document.querySelector(".on1");
//     const desser2 = document.querySelector(".on2");
//     const desser3 = document.querySelector(".on3");
//     const desser4 = document.querySelector(".on4");
//     const desser5 = document.querySelector(".on5");
//     const desser6 = document.querySelector(".on6");
//     const desser7 = document.querySelector(".on7");
//     const desser8 = document.querySelector(".on8");
//     const desser9 = document.querySelector(".on9");

//     const desserList = [
//       desser1,
//       desser2,
//       desser3,
//       desser4,
//       desser5,
//       desser6,
//       desser7,
//       desser8,
//       desser9,
//     ];
//     desserList.forEach((button, index) => {
//       button.addEventListener("click", function () {
//         button.innerHTML = `
//           <div class="flex bg-[hsl(14,86%,46%)] rounded-full h-full w-full justify-around items-center">
//             <button class="minus border-solid border-2 border-white w-8 h-8 rounded-full text-white hover:bg-white hover:text-[hsl(14,86%,42%)]">-</button>
//             <h2 class="number text-white"></h2>
//             <button class="plus border-solid border-2 border-white w-8 h-8 rounded-full text-white hover:bg-white hover:text-[hsl(14,86%,42%)]">+</button>
//           </div>
//         `;

//         const num = button.querySelector(".number");
//         const minus = button.querySelector(".minus");
//         const plus = button.querySelector(".plus");

//         let x = 80;
//         num.innerHTML = x
//         plus.addEventListener("click", () => {
//           x++;
//           num.innerHTML = x

//           console.log( x+`+`+index);
//         });

//         minus.addEventListener("click", () => {
           
//           if (x > 0) {
//             x -= 1;
            
            
//             num.innerHTML = x

//             console.log(x+`-`+index);
//           }
//         });
//       });
//     });
//   });

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const div = document.getElementById("div");
    const cartR = document.querySelector(".cart");
    let cart = {}; 

    
    data.forEach((item, i) => {
      div.innerHTML += `
        <div class="w-full max-w-[250px]" id="card-${i}">
          <div class="flex flex-col justify-center items-center">
            <figure class="bg-blue-900 rounded-[8px] overflow-hidden">
              <img src="${item.image.desktop}" alt="${item.category} image" />
            </figure>
            <div class="on relative bottom-[25px] flex bg-white w-[80%] justify-center items-center h-[50px] border-solid border-2 border-[hsl(14,86%,42%)] rounded-full">
              <img src="assets/images/icon-add-to-cart.svg" alt="add-to-cart" />
              <div class="ml-2 text-[hsl(14,65%,9%)]">Add to Cart</div>
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

    function updateCartView() {
      const cartContainer = document.querySelector(".cart-items");
      const orders = document.querySelector('.orders'); 
      cartContainer.innerHTML = ""; 

      orders.innerHTML = ''; 
      Object.keys(cart).forEach((index) => {
        if (cart[index] > 0) {
          const item = data[index];
          const totalPrice = (item.price * cart[index]).toFixed(2);

          const cartItem = document.createElement("div");
          cartItem.className = "cart-item flex justify-between items-center p-2 border-b";
          cartItem.innerHTML = `
            <div>
              <h2 class="font-bold">${item.name}</h2>
              <div class="flex">
                <p class="text-[hsl(14,25%,72%)]"><span class="text-[hsl(14,86%,42%)]">${cart[index]} x</span> @$${item.price}</p>
                <p class="text-[hsl(7,20%,60%)] font-bold ml-2">$${totalPrice}</p>
              </div>
            </div>
            <button class="remove-btn flex justify-center items-center rounded-full border-solid border-[1px] border-[hsl(13,31%,94%)] h-5 w-5"> 
              <img src="assets/images/icon-remove-item.svg" alt="empty-cart" />
            </button>
          `;

        
          orders.innerHTML += `
            <div>
              <h2 class="font-bold">${item.name}</h2>
              <div class="flex justify-between">
                <p class="text-[hsl(14,25%,72%)]"><span class="text-[hsl(14,86%,42%)]">${cart[index]} x</span> @$${item.price}</p>
                <p class="text-[#000] font-bold ml-2 pr-5 pb-4">$${totalPrice}</p>
              </div>
            </div>
          `;

          cartItem.querySelector(".remove-btn").addEventListener("click", () => {
            cart[index] = 0;
            updateCartView();
            updateTotal();
          });

          cartContainer.appendChild(cartItem);
        }
      });

      addOrderEventListener();
    }

    function updateTotal() {
      const totalItems = Object.values(cart).reduce((sum, value) => sum + value, 0);
      const totalPrice = Object.keys(cart).reduce((sum, index) => {
        if (cart[index] > 0) {
          const item = data[index];
          return sum + (item.price * cart[index]);
        }
        return sum;
      }, 0).toFixed(2);
    
      if (totalItems === 0) {
        cartR.innerHTML = ` 
          <h1 class="bg-white text-[hsl(14,86%,42%)] h-[40px] pl-5 flex items-end font-[600]">
            Your Cart (0)
          </h1>
          <div class="h-[100%] min-h-[260px] w-full bg-white rounded-b-xl pb-4 flex items-center justify-center flex-col">
            <img src="assets/images/illustration-empty-cart.svg" alt="empty-cart" />
            <p class="text-[14px] text-[hsl(12,20%,44%)] font-[400]">Your added items will appear here</p>
          </div>
        `;
      } else {
        cartR.innerHTML = `
          <h1 class="bg-white px-10 text-[hsl(14,86%,42%)] h-[40px] pl-5 flex items-end font-[600]">
            Your Cart (${totalItems})
          </h1>
          <div class="h-[100%] py-2 overflow-hidden w-full px-10 bg-white cart-items flex flex-col"></div>
          <div class="order-total flex justify-between items-center p-4 bg-white border-t">
            <h3 class="font-[400] text-[hsl(14,65%,9%)]">Order Total</h3>
            <p class="font-[800] text-[hsl(14,65%,9%)]">$${totalPrice}</p>
          </div>
          <div class="w-[100%] p-4 bg-white flex flex-col justify-center rounded-b-xl items-center">
            <button class="order bg-[hsl(14,86%,42%)] text-[#fff] w-[100%] p-4 rounded-full">Confirm Order</button>
          </div>
        `;

        updateCartView();
      }
    }

    function addOrderEventListener() {
      const orderBTN = document.querySelector(".order");
      if (orderBTN) {
        orderBTN.addEventListener('click', () => {
          const orderConfirmed = document.querySelector('.orderConfirmed');
          if (orderConfirmed) {
            orderConfirmed.classList.remove("hidden");
            orderConfirmed.classList.add("flex");
          }
          
          cart = {};
          updateTotal();
        });
      }
    }

    document.querySelectorAll(".on").forEach((button, index) => {
      cart[index] = 0;

      button.addEventListener("click", function () {
        if (!button.classList.contains("active")) {
          button.classList.add("active");
          button.innerHTML = `
            <div class="flex bg-[hsl(14,86%,46%)] rounded-full h-full w-full justify-around items-center">
              <button class="minus border-solid border-2 border-white w-8 h-8 rounded-full text-white hover:bg-white hover:text-[hsl(14,86%,42%)]">-</button>
              <h2 class="number text-white">${cart[index]}</h2>
              <button class="plus border-solid border-2 border-white w-8 h-8 rounded-full text-white hover:bg-white hover:text-[hsl(14,86%,42%)]">+</button>
            </div>
          `;

          const num = button.querySelector(".number");
          button.querySelector(".plus").addEventListener("click", () => {
            cart[index]++;
            num.innerHTML = cart[index];
            updateTotal();
          });

          button.querySelector(".minus").addEventListener("click", () => {
            if (cart[index] > 0) {
              cart[index]--;
              num.innerHTML = cart[index];
              updateTotal();
            }
          });
        }
      });
    });
  });
