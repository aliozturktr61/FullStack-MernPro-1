import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Typography, Paper, Divider, Button, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPostForm from "./EditPostForm";
import { fetchSinglePost, deletePost } from "../redux/actions/post";
import noImage from "../images/noimage.svg";
import { useParams, useNavigate } from "react-router-dom";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(8),
}));

const HeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const ContentWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  borderRadius: 5,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentPost = useSelector((state) => state.post.currentPost);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    console.log("Silinecek post ID:", currentPost?._id);
  
    dispatch(deletePost(currentPost?._id));
    navigate("/posts");
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  return (
    <StyledPaper elevation={0}>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <>
          <HeaderContainer>
            <Typography variant="h5" gutterBottom>
              {currentPost?.title}
            </Typography>
            <div>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={openEditMode}
              >
                Düzenle
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={removePost}
                startIcon={<DeleteIcon />}
              >
                Sil
              </Button>
            </div>
          </HeaderContainer>

          <Divider />
          <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant="caption" component="p" gutterBottom>
            {convertRelativeTime(currentPost?.createdAt)} by Ali Öztürk
          </Typography>

          <StyledChip
            label={`# ${currentPost?.tag}`}
            variant="outlined"
          />

          <ContentWrapper>
            <StyledImage
              src={currentPost?.image || noImage}
              alt="Post"
            />
            <Typography variant="body1" gutterBottom>
              {currentPost?.content}
            </Typography>
          </ContentWrapper>
        </>
      )}
    </StyledPaper>
  );
};

export default PostDetails;