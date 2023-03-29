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
* Generate Image
*
**/
const generateCustomImage = 
  async (event) => {
    const eventElement = event.target
    if(eventElement.nodeName === "BUTTON" && Array.from(eventElement.classList).includes("button-customize")) {
      const productElement = event.target.closest("[itemtype='https://schema.org/Product']")
      const originalDescription = productElement.querySelector("[itemprop='description']").textContent
      const prompt = (originalDescription + ", " + productElement.querySelector("input").value).replace(/, ,/,",")
      const price = productElement.querySelector("[itemprop='price']").getAttribute("content")
      const url = await fetchImage(prompt)
      products.push(
        { description: prompt
        , price: price
        , image: url
        })
      displayFilteredProducts(products, originalDescription)
    }
  }
 
const productSection = document.querySelector("#products")
productSection.addEventListener("click",generateCustomImage)

/**
*
* Initial Load
*
**/

window.onload =
  () => { displayFilteredProducts(products,"chocolate") }
