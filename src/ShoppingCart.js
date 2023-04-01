import React, { useState } from 'react';
import products from './data';
import { useLocalStorage } from 'usehooks-ts';

const ShoppingCart = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useLocalStorage('cart', []);

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex >= 0) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += 1;
      setCart(newCart);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex >= 0) {
      const newCart = [...cart];
      if (newCart[existingProductIndex].quantity === 1) {
        newCart.splice(existingProductIndex, 1);
      } else {
        newCart[existingProductIndex].quantity -= 1;
      }
      setCart(newCart);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || product.category === category)
  );

  return (
    <div>
      <div>
        <input type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
        </select>
      </div>
      <div>
        <h2>Products</h2>
        <div> 
          {filteredProducts.map((product) => (
            <div key={product.id} className="card text-center" style={{width: '18rem',display:'inline-block', margin:'10px', height: '30rem'}}>
              <img class="card-img-top" src={product.image} alt="Card image cap" style={{ height:'18rem' }}></img>
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">Category: {product.category}</p>
                <p class="card-text">Price: ₱{product.price}</p>
              <button onClick={() => handleAddToCart(product)} class="btn btn-primary btn-lg">+</button>
            </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Checkout</h2>
        <div></div>
        {cart.map((product) => (
            <div key={product.id} className="card text-center" style={{width: '18rem',display:'inline-block', margin:'10px',}}>
              <img class="card-img-top" src={product.image} alt="Card image cap" style={{ height:'18rem' }}></img>
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">Category: {product.category}</p>
                <p class="card-text">Quantity: {product.quantity}</p>
                <p class="card-text">Price: ₱{product.price * product.quantity}</p>
                <button onClick={() => handleRemoveFromCart(product)} class="btn btn-danger btn-lg">-</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};
export default ShoppingCart;
