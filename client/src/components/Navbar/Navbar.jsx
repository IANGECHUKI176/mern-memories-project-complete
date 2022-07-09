import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import memories from "../../assets/memories.png";
import useStyles from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar color='inherit' position='static' className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          variant='h2'
          align='center'
          className={classes.heading}
          component={Link}
          to='/'
        >
          memories
        </Typography>
        <img src={memories} alt='' height='60' className={classes.image} />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              alt={user.result.name}
              src={user.result.imageUrl}
              className={classes.purple}
            >
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.userName}>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              className={classes.logout}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
