let boxs=document.querySelector(".product .boxs ");
let button_1=document.querySelector(".box .click .add-cart");
let button_2=document.querySelector(".box .add");
let inc=document.querySelector(".add .fa-plus");
let min=document.querySelector(".add .fa-minus");
let num=document.querySelector(".add .num");
let cart=document.querySelector(".cart");

let Span=document.querySelector(".box .click ");
// console.log(button_1);
// console.log(button_2);
// console.log(Span);
console.log(inc.dataset);
// console.log(min);


let total=0;

getproduct();
function getproduct()
{
    let product=new XMLHttpRequest();
    product.open("GET","../data.json",true);
    product.send();
    product.onreadystatechange=function()
    {
        if(this.status===200 && this.readyState===4)
        {
             let prohuct_js=JSON.parse(this.responseText);
             add_product(prohuct_js,prohuct_js.length);
        }
    }
}

function add_product(cont,num)
{
    for(let i=0 ; i<num ;i++)
    {
        // let parent=document.createElement("div");
        // parent.className="box col-lg-4 col-md-5 col-sm-6";

        // let img=document.createElement("div");
        // img.className="img";

        // let product_img=document.createElement("img");
        // product_img.src=`${cont[i].image.thumbnail}`;
        // product_img.className="img-fluid mb-3";

        // let click=document.createElement("div");
        // click.className="click";


        // let button_1=document.createElement("button");
        // button_1.className="add-cart rounded-pill bg-light";
        // button_1.innerHTML=`<img src="images/icon-add-to-cart.svg" alt=""> Add to Cart`;
        
        // let button_2=document.createElement("button");
        // button_2.className="add  rounded-pill";
        // button_2.innerHTML=`<i onclick=increment() class="fa-solid fa-plus"></i>
        //                         <div class="num">0</div>
        //                         <i class="fa-solid fa-minus"></i>`;

        // img.appendChild(product_img);
        // click.appendChild(button_1);
        // img.appendChild(click);
        // img.appendChild(button_2);
    
        // parent.appendChild(img);
        // boxs.appendChild(parent);
 
        // let h_6=document.createElement("h6");
        // h_6.className="text-secondary mt-4";
        // h_6.innerHTML=`${cont[i].category}`;
        // parent.appendChild(h_6);

        // let h_5=document.createElement("h5");
        // h_5.innerHTML=`${cont[i].name}`;
        // parent.appendChild(h_5);

        // let p=document.createElement("p");
        // p.innerHTML=`$${cont[i].price}`;
        // parent.appendChild(p);
        // p.style="color: orange;";

   
    }
}


function increment(e)
{
    let item=e.dataset.n;
    num.innerHTML++;
    total++;
    apear(item);
}

function decrement()
{
    if(num.innerHTML !=0)
    {
        num.innerHTML--;
    }
    if(total!=0)
    {
        total--;
    }
    apear();
}


function apear(current)
{
    document.querySelector(".cart h3").innerHTML=`Your Cart (${total})`;
    document.querySelector(".cart img").remove();
    document.querySelector(".cart p").remove();
    
}



//in html
Span.onclick=function()
{
    // Span.style.display = "none";
    Span.className="cliked";
}
document.body.onclick=function(el)
{
    if(el.target!==button_1 && el.target!==button_2 && el.target!=min && el.target!==inc )
    {
        // Span.style.display = "block";
        Span.className="clik";
        // console.log("hello");
    }
}