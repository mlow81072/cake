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
filterForm.addEventListener( "submit", displayFilteredProductsButton )
 

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
          , price: price
          , image: currentImageUrl
          }

      if ( elementClasses.includes("button-customize")) {
        const prompt = (originalDescription + ", " + productElement.querySelector("input").value).replace(/, ,/,",")
        const url = await fetchImage(prompt)
        const newProduct = 
          { description: prompt
          , price: price
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
productSection.addEventListener("click",cardButtons)

/**
*
* Initial Load
*
**/

window.onload =
  () => { displayFilteredProducts(products,"chocolate") }
