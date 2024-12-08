import React, { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Grid, Button, Box, Typography } from "@mui/material";
import Post from "./Post";
import gridFour from "../images/grid_four.svg";
import gridThree from "../images/grid_three.svg";

// Styled component for layout shifter
const LayoutShifter = styled(Box)(({ theme }) => ({
  float: "right",
  margin: theme.spacing(2),
}));

const PostsList = () => {
  // Redux store'dan posts'i çek
  const posts = useSelector((state) => state.post?.posts || []);

  // Local state ile ızgara düzenini takip et
  const [layout, setLayout] = useState("gridThree");

  // Performans için hesaplama işlemlerini useMemo kullanarak optimize et
  const calculateMd = useMemo(() => {
    return layout === "gridThree" ? 4 : 3;
  }, [layout]);

  return (
    <>
      {/* Layout Shifter */}
      <LayoutShifter>
        {/* 3 sütun düzeni */}
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridThree")}
        >
          <img
            src={gridThree}
            style={{ background: layout === "gridThree" ? "#ccc" : "" }}
            alt="Three Columns Grid Icon"
          />
        </Button>
        {/* 4 sütun düzeni */}
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridFour")}
        >
          <img
            src={gridFour}
            style={{ background: layout === "gridFour" ? "#ccc" : "" }}
            alt="Four Columns Grid Icon"
          />
        </Button>
      </LayoutShifter>

      {/* Gönderi Listesi */}
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid
              item
              key={post._id ?? post.id ?? `${post.index}-${Math.random()}`}
              xs={12}
              md={calculateMd}
            >
              {/* Gönderi öğesi */}
              <Post {...post} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} container justifyContent="center">
            {/* Kullanıcı deneyimi için alternatif boş durum */}
            <Typography variant="h6" color="textSecondary">
              Gönderi bulunamadı.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PostsList;