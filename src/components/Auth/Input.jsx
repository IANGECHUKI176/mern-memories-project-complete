import {Grid,TextField,InputAdornment,IconButton} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react'



const Input = ({ half, name, label, handleChange, handleShowPassword ,type,autoFocus}) => {
  return (
    <Grid xs={12} sm={half ? 6 : 12} item>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                    >
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input