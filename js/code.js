let boxs=document.querySelector(" .boxs ");
let num=document.querySelector(".add .num");
let cart=document.querySelector(".cart");
let Close=document.querySelector(".cart .close");
let body=document.querySelector("body");
let cart_icon=document.querySelector("header .icon ");
let cart_items=document.querySelector(".cart .ITEMS");
let header_span=document.querySelector("header .icon span")




let product=[];
let cart_pro=[];
function intial()
{
  fetch('file.json')
  .then(response=>response.json())
  .then(Data=>{
    product=Data;
    if(localStorage.getItem('cart_product'))
        {
          cart_pro=JSON.parse(localStorage.getItem('cart_product'));   
          show_cart();
        }
    show_element(product);
  })
 
}
intial();

function show_element(product)
{
    if(product.length>0)
    {
        boxs.innerHTML=''; 
        product.forEach((el,index)=>{
            
            let item=document.createElement("div");
            item.className="box col-lg-3 col-md-4 col-sm-6 col-12";
            item.dataset.id=el.id;
            item.innerHTML=`<div class="img">
                                        <img src="${el.image.thumbnail}" class="img-fluid mb-3 pro" alt="">

                                            <button class="add  rounded-pill "data-id=${index} >
                                            <i  data-n="0" class="fa-solid fa-plus plus" ></i>
                                            <div class="num"></div>
                                            <i  class="fa-solid fa-minus minus"></i>
                                            </button>

                                            <button class="add-cart rounded-pill bg-light " >
                                                <img src="images/icon-add-to-cart.svg" alt="">
                                                Add to Cart
                                            </button>
                                    </div>
                                    <h6 class="text-secondary mt-4">${el.category}</h6>
                                    <h5>${el.name}</h5>
                                    <p style="color: orange;">$${el.price}</p>
                                </div>`;
            boxs.appendChild(item);
        })
        
    }
}

Close.addEventListener('click',()=>{
    body.classList.toggle("apear");
});
cart_icon.addEventListener('click',()=>{
    body.classList.toggle("apear");
});

boxs.addEventListener('click',(el)=>{  
    if(el.target.classList.contains('add-cart'))
    {

        el.target.classList.toggle('remove');
        // body.classList.toggle("remove_add");
        
        let ID=el.target.parentElement.parentElement.dataset.id;   
        // console.log(ID);
              
        add_to_cart(ID);
        
    }
    else if(el.target.classList.contains('plus'))
               {               
                plus_pro(el.target.parentElement.parentElement.parentElement.dataset.id);
               } 
    else if(el.target.classList.contains('minus'))
                {
                    minus_pro(el.target.parentElement.parentElement.parentElement.dataset.id);
                }
    else{
        // body.classList.toggle("remove_add");
    }
})

function plus_pro(id)
{
    console.log(id);
    let find=cart_pro.findIndex((value)=>value.prod_id==id);
    console.log(find);
    
    cart_pro[find].quantity=cart_pro[find].quantity+1;

    localStorage.setItem('cart_product',JSON.stringify(cart_pro));
    show_cart();
}
function minus_pro(id)
{
    console.log(id);
    let find=cart_pro.findIndex((value)=>value.prod_id==id);
   if(cart_pro[find].quantity>=1)
   {
    cart_pro[find].quantity=cart_pro[find].quantity-1;
     if(cart_pro[find].quantity==0)
     {
        cart_pro.splice(find,1);       
     }
   }
   else if(cart_pro[find].quantity==0)
   {
    cart_pro.splice(find,1);
   }
   else{

   }
   localStorage.setItem('cart_product',JSON.stringify(cart_pro));
    show_cart();
}


function add_to_cart(id)
{

    // console.log(id);
    let find=cart_pro.findIndex((value)=>value.prod_id==id);
    // console.log(find);
    if(cart_pro.length<=0)
    {
        cart_pro=[{
            prod_id:id,
            quantity:1
        }];
        
    }
    else if(find<0)
    {
        cart_pro.push({
            prod_id:id,
            quantity:1
        })
    } 
    console.log(cart_pro); 
    localStorage.setItem('cart_product',JSON.stringify(cart_pro));
    show_cart();
         
}



function show_cart()
{    
    let totalnum=0;
    cart_items.innerHTML='';
    cart_pro.forEach(el=>{
    totalnum=totalnum+el.quantity;
    let index=product.findIndex((value)=>value.id==el.prod_id);
    let data=product[index];
     let item=document.createElement("div");
     item.className='item';
     item.dataset.id=el.prod_id;

     item.innerHTML=`<div class="img">
     <img src="${data.image.thumbnail}" class="img-fluid mb-3" alt="">
     </div>
                        <div class="text">
                            <p class="text-secondary quantity">( ${el.quantity} )</p>
                            <p style="color: orange;">$${data.price * el.quantity}</p>
                             <p class="text-secondary name">${data.category}</p>
                        </div>
                        <div class="icon">
                            <i class="fa-solid fa-x text-secondary icon" ></i> 
                        </div>    
                    </div>`;
    cart_items.appendChild(item);
    
    })
  header_span.innerHTML=totalnum;
}
//console.log(cart_pro);
cart_items.addEventListener('click',(el)=>{
    if(el.target.classList.contains('icon'))
    { 
        console.log(cart_pro);
        id=el.target.parentElement.parentElement.dataset.id;
        let find=cart_pro.findIndex((value)=>value.prod_id==id);
        cart_pro.splice(find,1);
        localStorage.setItem('cart_product',JSON.stringify(cart_pro));
        show_cart();
    }
});