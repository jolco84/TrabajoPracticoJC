import React from 'react'
import Navbar from '../components/Navbar'
import '../App.css';
import { useState, useContext, useEffect } from 'react';
import Context from "../Context";
import { Button } from 'react-bootstrap';

export default function Carrito() {

  const { pizzas, pizzaCarrito, setPizzaCarrito } = useContext(Context);
  const [contador, setContador] = useState(1);
  const [total, setTotal] = useState(0);
  const [totales, setTotales] = useState(0);

  const aumentar = (item) => {

    const nuevasCart = [...pizzaCarrito] // Copiamos las tareas anteriores
    const index = nuevasCart.findIndex(el => el.id === item.id)
    // Buscamos la tarea a modificar en la lista
    nuevasCart[index].cant += 1;
    nuevasCart[index].total = (nuevasCart[index].cant * nuevasCart[index].price);
    setPizzaCarrito(nuevasCart);
    calcTotal(nuevasCart[index].total);
  }

  const disminuir = (item) => {

    const nuevasCart = [...pizzaCarrito] // Copiamos las tareas anteriores
    const index = nuevasCart.findIndex(el => el.id === item.id)
    // Buscamos la tarea a modificar en la lista
    nuevasCart[index].cant -= 1;
    nuevasCart[index].total = (nuevasCart[index].cant * nuevasCart[index].price);
    setPizzaCarrito(nuevasCart);
    calcTotal(nuevasCart[index].total);
  }

  const calcTotal = (totals) => {
    let Total = 0;

    pizzaCarrito.forEach(element => {
      Total = Total + element.total
    });

    setTotal(Total);
  }
  
  useEffect(() => {
    calcTotal(0);
  }, []);

  return (
    <div>
      <Navbar />

      <div className='carrito'>
        <p>Detalles del Pedido:</p>
        <div className='carro'>
          {pizzaCarrito.map((item) => (

            <div className='item' key={item.id}>
              <img src={item.img} alt={item.name} className='imgCarro' />
              <p>{item.name}</p>
              <div className='monto' >
                <label className='cantidad' key={item.id} >${item.price * item.cant}</label>
                <Button variant="primary" className='aumentar' onClick={() => aumentar(item)}>+</Button>
                <input className='cantidad' type="number" value={item.cant} readOnly />
                <Button variant='danger' className='disminuir' onClick={() => disminuir(item)}>-</Button>
              </div>
            </div>

          ))}
        </div>
        <>
          <p>Total: ${total}</p>
          <Button variant="success" className='btnPagar'>Ir a Pagar</Button>
        </>
      </div>
    </div>
  )
}