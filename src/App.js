import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCart from './ShoppingCart';

function App() {
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1"><h3>Shopping Cart</h3></span>
      </nav>
      <ShoppingCart />
    </div>
  );
}

export default App;
