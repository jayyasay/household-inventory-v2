import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TemporaryDrawer from './Drawer'

export default function ButtonAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{
							mr: 2,
							alignSelf: 'self-end'
						}}
					>
						<TemporaryDrawer />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ textAlign: 'left' }}>
						Welcome
					</Typography>
					<Button color='inherit' sx={{ marginLeft: 'auto' }}>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
