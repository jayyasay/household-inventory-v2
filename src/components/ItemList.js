import React, { useState, useEffect } from 'react'
import { db } from '../firebase.js'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Todo from './Todo.js'
import CircularProgress from '@mui/material/CircularProgress'

export default function ItemList() {
	const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'))

	const [todos, setTodos] = useState([])
	const [spinner, setSpinner] = useState(<CircularProgress color='primary' />)

	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			setTodos(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					item: doc.data()
				}))
			)
			setSpinner('')
		})
	}, [q])

	return (
		<ul>
			{spinner}
			{todos.map((item) => (
				<Todo key={item.id} arr={item} />
			))}
		</ul>
	)
}
