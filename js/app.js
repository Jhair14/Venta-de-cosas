// Simulated database
let users = [];
let products = [];
let currentUser = null;

// DOM Elements
const homeLink = document.getElementById('home-link');
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const addProductLink = document.getElementById('add-product-link');
const catalogLink = document.getElementById('catalog-link');

const home = document.getElementById('home');
const signup = document.getElementById('signup');
const login = document.getElementById('login');
const addProduct = document.getElementById('add-product');
const catalog = document.getElementById('catalog');

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const addProductForm = document.getElementById('add-product-form');

const productGrid = document.getElementById('product-grid');

// Navigation functions
function showSection(section) {
    [home, signup, login, addProduct, catalog].forEach(s => s.classList.add('hidden'));
    section.classList.remove('hidden');
}

homeLink.addEventListener('click', () => showSection(home));
signupLink.addEventListener('click', () => showSection(signup));
loginLink.addEventListener('click', () => showSection(login));
addProductLink.addEventListener('click', () => showSection(addProduct));
catalogLink.addEventListener('click', () => {
    showSection(catalog);
    displayProducts();
});

// User registration
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (users.some(user => user.email === email)) {
        alert('Este correo electrónico ya está registrado');
        return;
    }
    
    users.push({ name, email, password });
    alert('Registro exitoso. Por favor, inicia sesión.');
    showSection(login);
});

// User login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        addProductLink.classList.remove('hidden');
        alert(`Bienvenido, ${user.name}!`);
        showSection(catalog);
        displayProducts();
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
});

// Add product
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser) {
        alert('Debes iniciar sesión para agregar productos');
        return;
    }
    
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const imageInput = document.getElementById('product-image');
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        products.push({ name, description, price, image: imageData, seller: currentUser.email });
        alert('Producto agregado exitosamente');
        showSection(catalog);
        displayProducts();
    };
    reader.readAsDataURL(imageInput.files[0]);
});

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <button onclick="buyProduct('${product.name}')">Comprar</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Buy product
function buyProduct(productName) {
    if (!currentUser) {
        alert('Debes iniciar sesión para comprar productos');
        return;
    }
    
    const product = products.find(p => p.name === productName);
    if (product) {
        alert(`Has comprado "${product.name}" por $${product.price}. ¡Gracias por tu compra!`);
    }
}

// Initial setup
showSection(home);