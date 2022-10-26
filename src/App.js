import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Pedido from "./views/Pedido";
import Carrito from "./views/Carrito";
import './bootstrap.min.css';
import Context from "./Context";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaCarrito, setPizzaCarrito] = useState([]);
  const globalStatePizzas = { pizzas, setPizzas };
  const globalStatePizzaCarrito = { pizzaCarrito, setPizzaCarrito };

  const getData = () => {
    fetch('pizzas.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    ).then(function (response) {
      return response.json();

    })
      .then(function (myJson) {
        setPizzas(myJson);
      });
  }
  useEffect(() => {
    getData();
  }, []);



  return (
    <div className="App">
      <Context.Provider value={{ pizzas, setPizzas, pizzaCarrito, setPizzaCarrito }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedido/:id" element={<Pedido />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
