import React, { useState, useEffect } from 'react'
import { db } from '../firebase.js'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

export default function Summary() {
	const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'))

	const [items, setItems] = useState([])
	const [spinner, setSpinner] = useState(<CircularProgress color='primary' />)

	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			setItems(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					item: doc.data()
				}))
			)
			setSpinner('')
		})
	}, [])

	return (
		<>
			<Container sx={{ margin: 'auto', display: 'flex', gap: '20px' }}>
				{spinner}
				{items.map((item) => (
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
								{item.item.todo} {item.item.quantity} {item.item.category}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Container>
		</>
	)
}
