import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ListIcon from '@mui/icons-material/List'
import SummarizeIcon from '@mui/icons-material/Summarize'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

export default function TemporaryDrawer() {
	const [anchorEl, setAnchorEl] = useState(false)
	// const open = Boolean(anchorEl);

	const handleDrawerOpen = () => {
		setAnchorEl(true)
	}

	const handleDrawerClose = () => {
		setAnchorEl(false)
	}

	const [state, setState] = useState({
		left: false
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const appLinks = [
		{ url: '/', linkName: 'Home', icon: <HomeIcon /> },
		{ url: '/add-item', linkName: 'Add items', icon: <AddCircleIcon /> },
		{ url: '/item-list', linkName: 'Lists', icon: <ListIcon /> },
		{ url: '/summary', linkName: 'Summary', icon: <SummarizeIcon /> }
	]

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '80vw' }}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{appLinks.map((text, index) => (
					<ListItem onClick={handleDrawerClose} key={text.linkName} disablePadding component={Link} to={text.url}>
						<ListItemButton>
							<ListItemIcon>{text.icon}</ListItemIcon>
							<ListItemText primary={text.linkName} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<MenuIcon sx={{ alignSelf: 'self-end !important', padding: '2px' }} onClick={handleDrawerOpen} onClose={handleDrawerClose} />
			<Drawer anchor='left' open={anchorEl} onClose={handleDrawerClose} sx={{ width: '80%' }}>
				{list('left')}
			</Drawer>
		</div>
	)
}
