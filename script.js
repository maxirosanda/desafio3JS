

let productView = (product) =>{
  let div = document.createElement("div")
  div.setAttribute("id",`${product.id}`)
  div.innerHTML = `
                        <form id="update-${product.id}" class="form">
                          <input type="hidden" name="id" value="${product.id}">
                          <input type="text" name="name" value="${product.name}" required>
                          <textarea name="desc"  required>${product.desc}</textarea>
                          <div>
                            <input type="number" name="price" value=${product.price} required>
                            <input type="number" name="stock" value=${product.stock} min="1" max="100" required>
                          </div>
                          <button type="submit">Actualizar</button>
                        </form>  
                        <form id="delete-${product.id}"  class="form">
                        <input type="hidden" name="id" value="${product.id}">
                        <button type="submit">Borrar</button>
                        </form>
                      `
  list.append(div)
}



let productUpdate = (id) =>{
  document.getElementById(`update-${id}`).addEventListener("submit",(e)=>{
    e.preventDefault()
    let products = JSON.parse(localStorage.getItem("products"))
    let index = products.findIndex(product => product.id == e.target[0].value)

    if (index != -1){
    products[index] ={id:e.target[0].value,name:e.target[1].value,desc:e.target[2].value,price:e.target[3].value,stock:e.target[4].value}
    products = JSON.stringify(products)
    localStorage.setItem("products",products)
    }
    console.log(products)
  })
}

let productDelete = (id) => {
  document.getElementById(`delete-${id}`).addEventListener("submit",(e)=>{
    e.preventDefault()
    let products = JSON.parse(localStorage.getItem("products"))
    let index = products.findIndex(product => product.id == e.target[0].value)

    if (index != -1) {
      products.splice(index,1)
      products = JSON.stringify(products)
      localStorage.setItem("products",products)
      document.getElementById(`${id}`).remove()
    }
    console.log(products)
  })
}

let productsView = () => {
     let products
     console.log(localStorage.getItem("products"))
     if(localStorage.getItem("products") == null){
      localStorage.setItem("products", "[]")
      products = localStorage.getItem("products")
     }else{
      products = localStorage.getItem("products")
     }
     
     products = JSON.parse(products)
     let list = document.getElementById("list")
     products.forEach((product) =>{
      
      productView(product)
      productUpdate(product.id)
      productDelete(product.id)
      
     })

}
let productCreate = () => {
  document.getElementById("create").addEventListener("submit",(e)=>{
    e.preventDefault()
    let products
    let product = {id:Math.round(Math.random()*100000) ,name:e.target[0].value,desc:e.target[1].value,price:e.target[2].value,stock:e.target[3].value}
    if(JSON.parse(localStorage.getItem("products")) != []){
       products = JSON.parse(localStorage.getItem("products"))
    }else{
      localStorage.setItem("products","[]")
      products = []
    }
    products.push(product)
    products = JSON.stringify(products)
    localStorage.setItem("products",products)
    productView(product)
    productUpdate(product.id)
    productDelete(product.id)
    
   
  })
}
productsView()
productCreate()






