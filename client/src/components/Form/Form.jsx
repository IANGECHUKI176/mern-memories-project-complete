import React, { useEffect } from "react";
import { TextField, Typography, Paper, Button } from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";
import { useLocation, useNavigate } from "react-router-dom";
const initialState = {
  title: "",
  tags: "",
  message: "",
  selectedFile: "",
};
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialState);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const post = useSelector(
    (state) => currentId && state.posts.posts.find((post) => post._id === currentId)
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      tags: "",
      message: "",
      selectedFile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please sign in to create your own memory
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? "Updating" : "Creating"} a memory
        </Typography>
        <TextField
          name='title'
          label='Title'
          variant='outlined'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />{" "}
        <TextField
          name='message'
          label='Message'
          variant='outlined'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          label='Tags'
          variant='outlined'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant='contained'
          fullWidth
          className={classes.buttonSubmit}
          color='primary'
          type='submit'
          size='large'
        >
          Submit
        </Button>
        <Button
          variant='contained'
          fullWidth
          color='secondary'
          onClick={clear}
          size='large'
        >
          reset
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
