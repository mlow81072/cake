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

window.onload =
  () => {
    const tableElement = document.querySelector("table")
    console.log("onload called")
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

