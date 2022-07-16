const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    /* récupérer l'url de l'image et le txt dans le storage */
    let imgUrl, altText
}

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => getproductinfo(res))
/* afficher le prix en local storage, récupère le prix de l'api et le colle dans la variable */


function getproductinfo(kanap) {
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image) /* faire apparaitre élément */
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    document.querySelector("#title").textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    document.querySelector("#price").textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function makeColors(colors) {
    const select = document.querySelector("#colors")
    for (let i = 0; i < colors.length; i++) {
        console.log(i, colors.length)

        let option = document.createElement("option")
        option.value = colors[i]
        option.textContent = colors[i]
        select.appendChild(option)
    }
}

const button = document.querySelector("#addToCart") /* (e) = e de Event */
if (button != null) {
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        if (color == null || color == "" || quantity == null || quantity == 0) {
            alert("Sélectionnez une couleur et une quantité")
            return /* en cas de message d'erreur n'execute pas l'action d'ouvrir le panier */
        }
        saveCommande(color, quantity)
        /* faire en sorte que la commande renvoie vers le panier dès la validation du produit/quantité/couleur */
        /* trouver le bon url: window.location.href = "cart.html" */
        window.location.href = "cart.html"
    })
}

/* objet pour storer dans le local storage */
function saveCommande(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText
    }
    localStorage.setItem(id, JSON.stringify(data))
}
