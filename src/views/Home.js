import React from 'react';
import { Card, Button, CardGroup, ListGroup } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import {  useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import foto from "./pizza_head.jpg"

export default function Home() {

    const { pizzas, pizzaCarrito, setPizzaCarrito } = useContext(Context);
    

    const navigate = useNavigate();

    function verMas(id) {
        navigate("/pedido/" + id);
    }
    function añadirCarrito(item) {
        
        
        const index = pizzaCarrito.findIndex(el => el.id === item.id);
        
        if (index >= 0) {
            
            const cantidad = pizzaCarrito[index].cant + 1;
            const nuevasTareas = [...pizzaCarrito] // Copiamos las tareas anteriores
            const indexs = nuevasTareas.findIndex(el => el.id === item.id);
           
            // Buscamos la tarea a modificar en la lista
            nuevasTareas[indexs].cant = cantidad;
            nuevasTareas[indexs].total = cantidad * nuevasTareas[indexs].price;
            setPizzaCarrito(nuevasTareas);
        } else {
            setPizzaCarrito([...pizzaCarrito,
            {
                id: item.id,
                name: item.name,
                img: item.img,
                cant: 1,
                price: item.price,
                total: item.price * 1
            }]);
        }

        alert("Se agregado la pizza al carrito!");
    }

    return (

        <div>
            <Context.Provider value={{ pizzas }}>
                <Navbar />
                <div className='header'>
                    <img src={foto} alt="header" className='imgHeader' />
                    <h1 className='titleHeader'>¡Pizzeria Mamma Mia!</h1>
                    <h5 className='subTitleHeader'>¡Tenemos las mejores pizzas que podrás encontrar!</h5>
                </div>
                <CardGroup>
                    {pizzas.map((item) => (
                        <Card key={item.id}>
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    <p>Ingredientes:</p>
                                    {(item.ingredients).map((items) => (
                                        <ListGroup>
                                            <ListGroup.Item key={items}>🍕{items}</ListGroup.Item>
                                        </ListGroup>
                                    ))
                                    }
                                </Card.Text>
                                <Card.Footer>
                                    ${item.price}
                                </Card.Footer>
                                <Button variant="info"
                                    onClick={() => verMas(item.id)}>
                                    Ver Mas👀</Button>
                                <Button variant="danger"
                                    onClick={() => añadirCarrito(item)}>
                                    Añadir 🛒</Button>
                            </Card.Body>
                        </Card>

                    ))
                    }
                </CardGroup>
            </Context.Provider>
        </div>
    )
}