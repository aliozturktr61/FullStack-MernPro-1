import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/actions/post";
import { styled } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuBook";
import PenIcon from "@mui/icons-material/Create";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostsList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import PostDetails from "./components/PostDetails";

const RootContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const TitleLink = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: theme.palette.secondary.main,
}));

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <RootContainer maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <TitleLink
              variant="h6"
              component="a"
              href="/posts"
            >
              Blogify
            </TitleLink>

            <Button
              color="primary"
              variant="outlined"
              startIcon={<PenIcon />}
              onClick={handleOpen}
            >
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item xs={12}>
            <Router>
              <Routes>
                <Route path="/posts" element={<PostsList />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/" element={<Navigate to="/posts" />} />
              </Routes>
            </Router>
          </Grid>
        </Grid>

        <AddPostForm open={open} handleClose={handleClose} />
      </RootContainer>
    </>
  );
};

export default App;
