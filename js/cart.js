const cartName = "cart"
const deduplicate = (arr) => arr.forEach((el)=>{})

const toast =
  (message, imageSrc = "") => {
    Toastify(
    { text: message || ""
    , duration: 5000
    , destination: "https://github.com/apvarun/toastify-js"
    , newWindow: true
    , avatar: imageSrc
    , close: true
    , gravity: "top"
    , position: "right"
    , stopOnFocus: true
    , style: { }
    , onClick: function(){} 
    }).showToast()
  }

const cart = {}

cart.set = 
  (wholeCart) => localStorage.setItem(cartName, canonicalize(wholeCart))

cart.get =
    () => JSON.parse(localStorage.getItem(cartName)) || {};
 
cart.clear =
    () => localStorage.removeItem(cartName);

cart.add = 
    (item) => {
      const canonicalJson = canonicalize(item)
      const digest = generateJsonDigest(canonicalJson)
      const currentCart = cart.get()
      if(currentCart[digest]) {
        if(currentCart[digest].quantity && parseInt(currentCart[digest].quantity)){
          currentCart[digest].quantity = currentCart[digest].quantity + 1
        } else {
          currentCart[digest].quantity = 2
        }
      } else {
        currentCart[digest] = { ...item, quantity: 1 }
      }
      cart.set(currentCart)
      toast(`Added ${item.description} to cart`, item.image)
    }
 
/*
var helpers = {
 
    getHtml: function (id) {
 
        return document.getElementById(id).innerHTML;
 
    },
    setHtml: function (id, html) {
 
        document.getElementById(id).innerHTML = html;
        return true;
 
    },
    itemData: function (object) {
 
        var count = object.querySelector(".count"),
            patt = new RegExp("^[1-9]([0-9]+)?$");
        count.value = (patt.test(count.value) === true) ? parseInt(count.value) : 1;
 
        var item = {
 
            name: object.getAttribute('data-name'),
            price: object.getAttribute('data-price'),
            id: object.getAttribute('data-id'),
            count: count.value,
            total: parseInt(object.getAttribute('data-price')) * parseInt(count.value)
 
        };
        return item;
 
    },
    updateView: function () {
 
        var items = cart.getItems(),
            template = this.getHtml('cartT'),
            compiled = _.template(template, {
                items: items
            });
        this.setHtml('cartItems', compiled);
        this.updateTotal();
 
    },
    emptyView: function () {
 
        this.setHtml('cartItems', '<p>Add some items to see</p>');
        this.updateTotal();
 
    },
    updateTotal: function () {
 
        this.setHtml('totalPrice', '₱' + cart.total );
 
    }
 
};
 
var cart = {
 
    count: 0,
    total: 0,
    items: [],
    getItems: function () {
 
        return this.items;
 
    },
    setItems: function (items) {
 
        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            this.total += _item.total;
        }
 
    },
    clearItems: function () {
 
        this.items = [];
        this.total = 0;
        storage.clearCart();
        helpers.emptyView();
 
    },
    addItem: function (item) {
 
        if (this.containsItem(item.id) === false) {
 
            this.items.push({
                id: item.id,
                name: item.name,
                price: item.price,
                count: item.count,
                total: item.price * item.count
            });
 
            storage.saveCart(this.items);
 
 
        } else {
 
            this.updateItem(item);
 
        }
        this.total += item.price * item.count;
        this.count += item.count;
        helpers.updateView();
 
    },
    containsItem: function (id) {
 
        if (this.items === undefined) {
            return false;
        }
 
        for (var i = 0; i < this.items.length; i++) {
 
            var _item = this.items[i];
 
            if (id == _item.id) {
                return true;
            }
 
        }
        return false;
 
    },
    updateItem: function (object) {
 
        for (var i = 0; i < this.items.length; i++) {
 
            var _item = this.items[i];
 
            if (object.id === _item.id) {
 
                _item.count = parseInt(object.count) + parseInt(_item.count);
                _item.total = parseInt(object.total) + parseInt(_item.total);
                this.items[i] = _item;
                storage.saveCart(this.items);
 
            }
 
        }
 
    }
 
};
 
document.addEventListener('DOMContentLoaded', function () {
 
    if (storage.getCart()) {
 
        cart.setItems(storage.getCart());
        helpers.updateView();
 
    } else {
 
        helpers.emptyView();
 
    }
    var products = document.querySelectorAll('.product button');
    [].forEach.call(products, function (product) {
 
        product.addEventListener('click', function (e) {
 
            var item = helpers.itemData(this.parentNode);
            cart.addItem(item);
 
 
        });
 
    });
 
    document.querySelector('#clear').addEventListener('click', function (e) {
 
        cart.clearItems();
 
    });
 
 
});
*/
