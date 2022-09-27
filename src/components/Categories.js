import { MenuItem } from '@mui/material'

const Categories = ({ arr }) => {
	return (
        <MenuItem key={arr.item.name} value={arr.item.name}>
            {arr.item.name}
        </MenuItem> 
	)
}
export default Categories