/* identifier combien d'items sont stockés dans le storage */
const cart = []

retrieveItemsFromCache()
console.log(cart)
cart.forEach((item) => displayItem(item))
// -> "item"
// altTxt: "Photo d'un canapé rose, trois places"
// color: "Pink"
// id: "a6ec5b49bd164d7fbe10f37b6363f9fb"
// imageUrl: "http://localhost:3000/images/kanap08.jpeg"
// name: "Kanap orthosie"
// price: 3999
// quantity: 8

/* permet de récupérer les objets */
function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem("products")
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

// fabriquer l'article de cart.html
function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    // afficher la div dans la page html
    article.appendChild(imageDiv)

    // fabriquer le card__item__content
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)

    //afficher l'article
    displayArticle(article)
}

function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    // y ajouter la description
    const description = makeDescription(item)
    // y ajouter les settings
    const settings = makeSettings(item)


    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

// créer les settings
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    // ajouter la quantité aux settings
    addQuantityToSettings(settings, item)
    /* !! faire la fonction "delete" */
    return settings
}

function addQuantityToSettings(settings, item) {
    // créer la div quantity du html
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    // intégrer le bouton avec ses éléments
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    settings.appendChild(input)
}

// créer la description
function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    // y ajouter le h2/couleur/prix du parent "description"
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color;
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €" /* rajouter le logo €*/

    description.append(h2, p, p2)
    return description
}

// afficher l'article dans la page
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}


function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    // récupere les data du code html ->
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    // créer la div du html
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    // créer la div du html
    div.appendChild(image)
    return div
}

/* calcule quantité total d'éléments */ 

function getTotals() {
    let articleQte = document.getElementsByClassName("itemQuantity");
    let articleQteLength = articleQte.length;
    quantityTotal = 0;
    for (let i = 0; i < articleQteLength; ++i) {
        quantityTotal += articleQte[i].valueAsNumber;
    }
}
