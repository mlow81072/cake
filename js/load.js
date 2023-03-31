/**
*
* Filter products
*
**/
const displayFilteredProductsButton = 
  (event) => {
    const searchTerm = document.querySelector("#filterForm input").value;
    displayFilteredProducts(products, searchTerm)
    event.preventDefault()
  }
const filterForm = document.querySelector("#filterForm")
if(filterForm) filterForm.addEventListener( "submit", displayFilteredProductsButton )
 

/**
*
* Card Buttons
*
**/
const cardButtons = 
  async (event) => {
    const eventElement = event.target
    if (eventElement.nodeName === "BUTTON"){
      const productElement = event.target.closest("[itemtype='https://schema.org/Product']")
      const elementClasses = Array.from(eventElement.classList)
      const originalDescription = productElement.querySelector("[itemprop='description']").textContent
      const price = productElement.querySelector("[itemprop='price']").getAttribute("content")
      const currentImageUrl = productElement.querySelector("img").getAttribute("src")
      const currentProduct = 
          { description: originalDescription
          , price: parseInt(price)
          , image: currentImageUrl
          }

      if ( elementClasses.includes("button-customize")) {
        const prompt = (originalDescription + ", " + productElement.querySelector("input").value).replace(/, ,/,",")
        const url = await fetchImage(prompt)
        const newProduct = 
          { description: prompt
          , price: parseInt(price)
          , image: url
          }
        products.push(newProduct)
        displayFilteredProducts(products, originalDescription)
      } else if(elementClasses.includes("button-add-to-cart")) {
        cart.add(currentProduct)
      }

    }
  }
 
const productSection = document.querySelector("#products")
if (productSection) productSection.addEventListener("click",cardButtons)

/**
*
* Cart Section
*
**/

const updateCart =
  (event) => {
    const eventElement = event.target
    if (eventElement.nodeName === "INPUT"){
      const productElementRow = event.target.closest("tr")

      const description = productElementRow.querySelector("[itemprop='description']").textContent
      const price = parseInt(productElementRow.querySelector("[itemprop='price']").getAttribute("content"))
      const image = productElementRow.querySelector("[itemprop='image']").getAttribute("src")
      cart.setQuantity({ description, price, image }, eventElement.value )
      cart.updateTotals()
      currentCart = cart.get()
      document.querySelector("tfoot").outerHTML = tfootHTML(currentCart.totalQuantity, currentCart.totalPrice)

      /*
      const quantityOfProducts  = Object.values(cart.get()).reduce((a,c)=>a+parseInt(c.quantity),0)
      const totalPrice = Object.values(cart.get()).reduce((a,c)=>a+parseInt(c.price),0)

      document.querySelector("tfoot [itemtype='https://schema.org/Quantity']").innerHTML = quantityOfProducts
      document.querySelector("tfoot [itemprop='price']").innerHTML = totalPrice
      document.querySelector("tfoot [itemprop='price']").setAttribute("content",totalPrice)
      */
    }


  }
const cartTable = document.querySelector("table")
if (cartTable) cartTable.addEventListener("change",updateCart)
/*
*/

const tfootHTML = (quantity, price) =>`
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td itemscope itemtype="https://schema.org/Quantity">${quantity}</td>
            <td itemscope itemtype="https://schema.org/Offer">
              <span itemprop="price" content=${price}>${price}</span>
              <meta itemprop="priceCurrency" content="PHP" />
            </td>
          </tr>
        </tfoot>`

/**
*
* Initial Load
*
**/


const renderAppbar =
  (user) => {
    var html = `
  <label for="input-checkbox" id="label-login" class="button">
      ${user.username ? "Welcome " + user.username + "!": "Login" }
  </label>
  <input id="input-checkbox" type="checkbox">
  <div id="login-form">
  `
    if(!user.username) {
      html = html +  `
    <label>
      <input type="text" placeholder="username">
    </label>
    <label>
      <input type="password" placeholder="password">
    </label>`
    }
    html = html +   `
    <label>
      <button>${user.username ? "Logout" : "Login"}</button>
    </label>
  </div>
`
      appbar.innerHTML =  html
  } 
const login =
  async (event) => {
    const eventElement = event.target
    const loginFormElement = event.target.closest("#login-form")
    if (eventElement.nodeName === "BUTTON"){
      const user = 
        { username: loginFormElement.querySelector("[placeholder='username']").value 
        , password: loginFormElement.querySelector("[placeholder='password']").value
        }
      console.log(user)
      const response = await fetch("https://other-two.vercel.app/api/user/authenticate",
        { method: "POST"
        , mode: "cors"
        , cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
        , credentials: "same-origin" // include, *same-origin, omit
        , headers:
          { "Content-Type": "application/json",
          }
        , body: JSON.stringify(user)
        })
      console.log(response)
      if(response.status !== 200 ){
        console.log(user)
      const response2 = await fetch("https://other-two.vercel.app/api/user/register",
        { method: "POST"
        , mode: "cors"
        , cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
        , credentials: "same-origin" // include, *same-origin, omit
        , headers:
          { "Content-Type": "application/json",
          }
        , body: JSON.stringify(user)
        })

      console.log(response2)
      }
      localStorage.setItem("user",JSON.stringify(user))
      renderAppbar(user)

    }

  }

/*
const buttonLogin= document.querySelector("#button-login")
if(buttonLogin) buttonLogin.addEventListener("click",cardButtons)
*/
const appbar = document.querySelector("#appbar")
if(appbar) appbar.addEventListener("click",login)
  

/**
*
* Initial Load
*
**/
var user = JSON.parse(localStorage.getItem("user")) || {}

window.onload =
  () => {
    const tableElement = document.querySelector("table")
    console.log("onload called")
    if(appbar) {
      renderAppbar(user)
    }
    if(tableElement) {
      console.log("table element found")
      const currentCart = cart.get()
      const tbodyHTML = Object.values(currentCart.items).map( itemToHTMLRow ).join("")
      tableElement.querySelector("tbody").innerHTML = tbodyHTML
      tableElement.querySelector("tfoot").outerHTML = tfootHTML(currentCart.totalQuantity, currentCart.totalPrice)
    } else {
      console.log("table element not found")
      displayFilteredProducts(products,"chocolate")
    }
  }

