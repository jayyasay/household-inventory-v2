import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './App.css';
import Todo from './components/Todo';
import { db } from './firebase.js'
import { collection, onSnapshot, serverTimestamp, addDoc, query, orderBy } from 'firebase/firestore';


const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'))

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc =>({
        id: doc.id,
        item: doc.data()
      })))
    })
  }, [input, quantity])

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db,'todos'), {
      todo: input,
      quantity: quantity,
      timestamp: serverTimestamp()
    })
    setInput('');
    setQuantity('');
  }
  return (
    <div className="App">
      <h2>Household Inventory App</h2>
      <form>
        <TextField
          id="outlined-basic"
          label="Make Todo"
          variant="outlined"
          style={{margin: "0px 5px"}}
          size="small"
          value={input}
          onChange={e =>setInput(e.target.value)} />
        <TextField
          type="number"
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          style={{margin: "0px 5px"}}
          size="small"
          value={quantity}
          onChange={e =>setQuantity(e.target.value)} />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo} >
          Todo
        </Button>
      </form>
      <ul>
      {todos.map(item=> <Todo key={item.id} arr={item} />)}
      </ul>
    </div>
  );
}

export default App;