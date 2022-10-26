import React from 'react'
import '../App.css';
import Navbar from '../components/Navbar'
import {  useContext } from 'react'
import Context from "../Context";
import { useParams } from "react-router-dom";
import { Button, ListGroup } from 'react-bootstrap';

export default function Pedido() {

  const { pizzas } = useContext(Context);

  const { id } = useParams();

  /** Filtrar array info obtenedio del consumo de objeto pizzas apartir del input busqueda */


  const filtrar = !id
    ? pizzas
    : pizzas.filter((lista) =>
      lista.id.toLowerCase().includes(id.toLowerCase()))

  
  return (
    <><Navbar />
    <div className='detallePizza'>  


      <div className='descPizza'>
        {filtrar.map((item) => (
          <>
          <div className='foto'>
            <img src={item.img} alt={item.name} />
            </div>
          <div className='desc'>
            <p>{item.name}</p>
            <hr></hr>
            <p>{item.desc}</p>
            <p>Ingredientes:</p>
            {(item.ingredients).map((items) => (
              
              <ListGroup>
              <ListGroup.Item key={items}>🍕{items}</ListGroup.Item>
              </ListGroup>
            ))
            }
            <div className='footer'>
              <p>Precio: $ {item.price}</p>
              <Button variant="danger">Añadir 🛒</Button>
            </div>
          </div>
          </>
        ))}

      </div>
    </div>
    </>
  )
}