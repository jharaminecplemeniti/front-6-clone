import React, { useEffect, useState } from 'react'

function Products() {

    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => setProducts(data.products))
    }, [])

    console.log(products)

  return (
    <div className="container">
    <h2> Products </h2>
    {
        products.map(product => {
            return (
                <div>
                    <img src={product.thumbnail} alt="https://placehold.co/200x200" />
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                </div>
            )
        })
    }
    </div>
  )
}

export default Products