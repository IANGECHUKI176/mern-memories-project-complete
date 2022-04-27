import React from "react";
import {
  Button,
  Paper,
  Typography,
  Avatar,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Icon from "./icon";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSigningUp) {
      dispatch(signup(formData, navigate));
    }else{
       dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const switchMode = () => {
    setIsSigningUp((prevState) => !prevState);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("google sign in was unsuccessfull");
  };
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>
          {isSigningUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid spacing={2} container>
            {isSigningUp && (
              <>
                <Input
                  name='firstName'
                  type='text'
                  label='first Name'
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name='lastName'
                  type='text'
                  label='last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              type='email'
              label='Email Address'
              handleChange={handleChange}
            />
            <Input
              name='password'
              type={showPassword ? "text" : "password"}
              label='Password'
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSigningUp && (
              <Input
                name='confirmPassword'
                type={"password"}
                label='Confirm Password'
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            className={classes.submit}
          >
            {isSigningUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId='562862204927-ffvmklap8n0f1223hplsj78ot5ft4bm1.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                color='primary'
                fullWidth
                className={classes.googleButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant='contained'
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSigningUp
                  ? "Already have an account?Sign In"
                  : "Don't have an account?Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
