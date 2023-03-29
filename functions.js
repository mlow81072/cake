const search =
  (searchTerm) => {
    const fuse = new Fuse(products, { keys: Object.keys(products[0]), threshold: 0.2})
    return fuse.search(searchTerm)
  }

const jsonToHTML =
  (json) => `
  <article itemscope itemtype="https://schema.org/Product" class="product-card masonry-css-item">

    <div class="product-card-thumbnail">
      <a href="#"><img itemprop="image" src=${json.image} alt="Picture of ${json.description}" /></a>
    </div>
 
    <p itemprop="description" class="product-card-desc">${json.description}</p>
 
    <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      <span itemprop="price" content="${json.price}" class="product-card-price">${json.price} Pesos</span>
    </p>
      
    <div>
        <input name="filter" type="text" placeholder="Type customization here">
    </div>
    <div>
        <button id="button-customize-${generateJsonDigest(json)}" type="submit" class="button-customize">Customize</button>
        <button id="button-add-to-cart-${generateJsonDigest(json)}" type="submit" class="button-add-to-cart">Add to cart</button>
    </div>

  </article>
  `

const displayFilteredProducts =
        (products, searchTerm) => {
          document.querySelector("#products").innerHTML = 
            search(searchTerm)
            .map(x=>x.item)
            .map(jsonToHTML)
            .join('')
  }
 
const generateJsonDigest =
  (json) => nacl.util.encodeBase64(nacl.hash(nacl.util.decodeUTF8(canonicalize(json))))
 
 
const fetchImage =
  async (prompt) => {
    var response = await fetch("./api/image/generate?prompt=" + prompt)
    return response.ok ? (await response.json())[0] : "failed"
  }
