import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ItemList from './components/ItemList'
import Navigation from './components/Navigation'
import Summary from './components/Summary'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigation />,
		children: [
			{
				path: 'add-item',
				element: <App />
			},
			{
				path: 'item-list',
				element: <ItemList />
			},
			{
				path: 'summary',
				element: <Summary />
			}
		]
	}
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
