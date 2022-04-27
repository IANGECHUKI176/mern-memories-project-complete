import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { numberOfPages } = useSelector((state) => state.posts);
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);
  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant='outlined'
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
