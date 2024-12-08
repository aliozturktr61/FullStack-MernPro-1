import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import noImage from "../images/noimage.svg";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 374,
  position: "relative",
}));

const StyledMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: "56.25%", // 16:9
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundBlendMode: "darken",
}));

const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "20px",
  left: "20px",
  color: "white",
}));

const Post = ({
  _id = "",
  title = "Başlık Yok",
  subtitle = "Alt Başlık Yok",
  content = "İçerik Yok",
  tag = "Genel",
  image,
  createdAt,
}) => {
  // Tarihi relatif zaman formatına çevirme fonksiyonu
  const convertRelativeTime = (date) => {
    if (!date) return "Tarih Bilinmiyor";
    const parsedDate = moment(date, moment.ISO_8601, true);
    return parsedDate.isValid() ? parsedDate.fromNow() : "Geçersiz Tarih";
  };

  return (
    <StyledCard>
      <StyledMedia image={image || noImage} title="Resim" />
      <Overlay>
        <Typography variant="h6">Ali Öztürk</Typography>
        <Typography variant="body2">{convertRelativeTime(createdAt)}</Typography>
      </Overlay>
      <CardContent>
        <Typography variant="h6" component="p" gutterBottom>
          {title}
        </Typography>
        <Typography variant="overline" component="p" gutterBottom>
          {subtitle}
        </Typography>
        <Typography variant="body2" component="p">
          {content?.substring(0, 250) + "..."}
        </Typography>
        <Chip label={`# ${tag}`} variant="outlined" sx={{ mt: 1 }} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={`/posts/${_id}`}>
          Daha Fazla
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default Post;