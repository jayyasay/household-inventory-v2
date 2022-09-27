import React from "react";
import TextField from '@mui/material/TextField';

export default function Search() {


    return (
        <div>
            <TextField
                id="outlined-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
                />
        </div>
    )
}