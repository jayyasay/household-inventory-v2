import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import './App.css'
import '@fontsource/montserrat/400.css'
import Todo from './components/Todo'
import { db } from './firebase.js'
import { collection, onSnapshot, serverTimestamp, addDoc, query, orderBy } from 'firebase/firestore'
import { ThemeProvider, createTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CircularProgress from '@mui/material/CircularProgress'
import moment from 'moment'

const theme = createTheme({
	typography: {
		fontFamily: ['Montserrat'].join(','),
		fontSize: '22px'
	}
})

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'))

function App() {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [addBtn, setAddBtn] = useState(false)
	const [show, setShow] = useState(false)
	const [category, setCategory] = useState('')
	const [date, setDate] = useState(moment().format('LL'))
	const [spinner, setSpinner] = useState('Add')

	const categoriesDropDown = ['Pantry', 'Fridge', 'Condiments', 'Others']

	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			setTodos(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					item: doc.data()
				}))
			)
		})
	}, [input, quantity])

	const addTodo = (e) => {
		e.preventDefault()
		setSpinner(<CircularProgress color='secondary' />)
		setTimeout(() => {
			addDoc(collection(db, 'todos'), {
				todo: input,
				category: category,
				expiryDate: date.toString(),
				quantity: quantity,
				timestamp: serverTimestamp()
			})
			setSpinner(spinner)
		}, 2000)
		setInput('')
		setQuantity(1)
		setCategory('')
		setDate(moment())
	}

	const showForm = (e) => {
		e.preventDefault()
		setShow(true)
		hideAddBtn()
	}

	function hideAddBtn() {
		setAddBtn(true)
	}

	const handleChange = (event) => {
		setCategory(event.target.value)
	}

	const handleDateChange = (newValue) => {
		setDate(newValue)
	}
	return (
		<div className='App'>
			<Navigation />
			<ThemeProvider theme={theme}>
				<Typography variant='h1' component='h1' sx={{ margin: '83px 0 41px 0' }}>
					Add your item
				</Typography>
			</ThemeProvider>
			{!addBtn ? (
				<Button
					variant='contained'
					sx={{
						borderRadius: '100px',
						padding: '28px'
					}}
					className='addBtn'
					onClick={showForm}
				>
					<AddIcon sx={{ fontSize: '100px' }} />
				</Button>
			) : null}
			{show ? (
				<Box
					component='div'
					sx={{
						display: 'flex',
						margin: 'auto',
						justifyContent: 'center'
					}}
				>
					<Card sx={{ minWidth: '313px' }}>
						<CardContent>
							<FormControl fullWidth>
								<TextField
									id='standard-basic'
									label='Enter your item here'
									variant='standard'
									style={{ margin: '30px 0' }}
									size='big'
									value={input}
									onChange={(e) => setInput(e.target.value)}
								/>
								<FormControl>
									<InputLabel id='demo-simple-select-label'>Category</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={category}
										label='Category'
										onChange={handleChange}
									>
										{categoriesDropDown.map((value) => (
											<MenuItem key={value} value={value}>
												{value}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<TextField
									type='number'
									id='outlined-basic'
									label='Quantity'
									variant='outlined'
									style={{ margin: '30px 0' }}
									size='big'
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<MobileDatePicker
										label='Expiry Date'
										inputFormat='MM/DD/YYYY'
										value={date}
										onChange={handleDateChange}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
								<Button variant='contained' color='primary' onClick={addTodo} style={{ margin: '30px 0 0 0' }}>
									{spinner}
								</Button>
							</FormControl>
						</CardContent>
					</Card>
				</Box>
			) : null}

			<ul>
				{todos.map((item) => (
					<Todo key={item.id} arr={item} />
				))}
			</ul>
		</div>
	)
}

export default App
