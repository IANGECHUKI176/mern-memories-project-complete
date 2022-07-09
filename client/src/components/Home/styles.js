import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch:{
    padding:"16px",
    marginBottom:"1rem",
    borderRadius:4,
    display:"flex",
  },
  pagination:{
    borderRadius:4,
    padding:"16px",
    marginTop:"1rem"
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
