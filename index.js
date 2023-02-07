const data = [
    {
        id: 0,
        title: "Invicta Men's Pro Diver 2",
        img: 'https://content1.rozetka.com.ua/goods/images/big_tile/279974409.jpg',
        category: 'Sport',
        price: 100
    },
    {
        id: 1,
        title: "Invicta Men's Pro Diver",
        img: 'https://content.rozetka.com.ua/goods/images/big_tile/285055000.jpg',
        category: 'Luxury',
        price: 190
    },
    {
        id: 2,
        title: "Timex Men's Expedition Scout",
        img: 'https://content2.rozetka.com.ua/goods/images/big_tile/283343858.jpg',
        category: 'Casual',
        price: 85
    },
    {
        id: 3,
        title: "Breitling Superocean Heritage",
        img: 'https://content2.rozetka.com.ua/goods/images/big_tile/201796932.jpg',
        category: 'Sport',
        price: 50
    },
    {
        id: 4,
        title: 'Casio Classic Resin Strap',
        img: 'https://content2.rozetka.com.ua/goods/images/big_tile/284995075.jpg',
        category: 'Dress',
        price: 370
    },
    {
        id: 5,
        title: "Invicta Men's Pro Diver 2",
        img: 'https://content2.rozetka.com.ua/goods/images/big_tile/279974454.jpg',
        category: 'Sport',
        price: 90
    },
    {
        id: 6,
        title: "Invicta Men's Pro Diver",
        img: 'https://content.rozetka.com.ua/goods/images/big_tile/285055000.jpg',
        category: 'Luxury',
        price: 265
    },
    {
        id: 7,
        title: "Timex Men's Expedition Scout",
        img: 'https://content2.rozetka.com.ua/goods/images/big_tile/283343858.jpg',
        category: 'Casual',
        price: 500
    },
    {
        id: 8,
        title: "Breitling Superocean Heritage",
        img: 'https://content2.rozetka.com.ua/goods/images/big_tile/201796932.jpg',
        category: 'Sport',
        price: 135
    },
    {
        id: 9,
        title: 'Casio Classic Resin Strap',
        img: 'https://content1.rozetka.com.ua/goods/images/big_tile/279974409.jpg',
        category: 'Dress',
        price: 250
    }
]

const categoriesContainer = document.querySelector('.categories')
const products = document.querySelector('.products')
const searchInput = document.querySelector('.search')
const priceRange = document.querySelector('.price-range')
priceRange.setAttribute('step', 20);
const priceValue = document.querySelector('.price-value')
const quantity = document.querySelector('.quantity')


const showProducts = (filteredProducts) => {
    let i = 0;
    products.innerHTML = filteredProducts.map(product => 
        `<li class="product">
            <img src=${product.img} alt="">
            <h4 class="product-title">${product.title}</h4>
            <span>${product.price}$</span>
            <button onclick='addToCart(${product.id})'; class="btn btn-add">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span>Add</span>
            </button>
        </li>`
    ).join("");
}

showProducts(data)


searchInput.addEventListener('keyup', (e)=> {
    const value = e.target.value.toLowerCase();
    if (value) {
        showProducts(data.filter(item => item.title.toLowerCase().indexOf(value) !== -1))
    } else {
        showProducts(data);
    }
})


const setCategories = () => {
    const allCategories = data.map(item => item.category)
    
    const categories = [
        'All products',
        ...allCategories.filter((item, i) => {
            return allCategories.indexOf(item) === i       
    })
    ]
    
    categoriesContainer.innerHTML = categories.map(category => 
        `<li class="category">${category}</li>`
    ).join("");

    categoriesContainer.addEventListener('click', (e) => {
        const selectedCategory = e.target.textContent;

        selectedCategory === 'All products' 
        ? showProducts(data) 
        : showProducts(data.filter((product) => product.category === selectedCategory))
    })
}

setCategories(data)


const setPrice = () => {
    const allPrice = data.map(item => item.price)
    const minPrice = Math.min(...allPrice);
    const maxPrice = Math.max(...allPrice);


    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = '$' + maxPrice;


    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = '$' + e.target.value;
        showProducts(data.filter(product => product.price <= e.target.value));
    })

}

setPrice(data)

//===Cart===//

const categories = [...new Set(data.map((item)=>{
    return item
}))]

let i = 0;

let cart = [];

const addToCart = (item) => {
    let isInArray = false;
    cart.forEach(product => {
        if (product.id === item) {
            isInArray = true;
        }
    })
    if (!isInArray) {
        cart.push({...categories[item]});
        displayCart();
    } else {
        alert('This product is added in the cart');
    } 
}

const deleteProduct = (item) => {
    cart.splice(item, 1);
    displayCart();
}



const displayCart = () => {
    let j = 0; total = 0;
    document.querySelector(".quantity").innerHTML = cart.length;

    if (cart.length == 0){
        document.querySelector(".cart-list").innerHTML = "Your cart is empty";
        document.querySelector(".total").innerHTML = "$ "+0+".00";
        console.log(cart)
    } else {
        document.querySelector(".cart-list").innerHTML = cart.map((items)=>
        {
            const {img, title, price} = items;


            total = total + price;
            document.querySelector(".total").innerHTML = `$ ${total}.00`;
            return(
                    
                `   <div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src=${img}>
                        </div>
                        <p style='font-size:12px;'>${title}</p>
                        <h3 style='font-size: 12px;'>$ ${price}.00</h3>`+
                        `<input type="number" min="1" value="1" class="count" />`+
                        "<div class='delete' onclick='deleteProduct("+ (j++) +")'>❌</div></div>"
            );
        }).join('');
    }
}











