import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
  FormControl,
  Typography
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePost } from "../redux/actions/post";

// Styled Components
const StyledForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const tags = ["Eğlence", "Programlama", "Sağlık", "Bilim"];

const postSchema = yup.object().shape({
  title: yup.string().required("Başlık zorunlu alan"),
  subtitle: yup.string().required("Alt başlık zorunlu alan"),
  content: yup.string().min(20, "İçerik en az 20 karakter olmalı").required(),
  tag: yup.string().oneOf(tags, "Geçerli bir etiket seçin").required(),
});

const EditPostForm = ({ post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      subtitle: post?.subtitle || "",
      content: post?.content || "",
      tag: post?.tag || "",
    },
  });

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };
    dispatch(updatePost(post._id, updatedPost));

    reset(post); // Mevcut post verileriyle formu sıfırla
    setFile(post?.image);
    closeEditMode();
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <StyledForm>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Başlık"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="subtitle"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Alt Başlık"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.subtitle}
              helperText={errors.subtitle?.message}
            />
          )}
        />
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Etiket</InputLabel>
              <Select
                {...field}
                variant="outlined"
                fullWidth
                error={!!errors.tag}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
              {errors.tag && (
                <Typography variant="caption" color="error">
                  {errors.tag.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="İçerik"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              error={!!errors.content}
              helperText={errors.content?.message}
            />
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                setFile(base64);
                field.onChange(base64);
              }}
            />
          )}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <StyledButton
            color="primary"
            variant="outlined"
            onClick={closeEditMode}
          >
            Vazgeç
          </StyledButton>
          <StyledButton color="secondary" variant="contained" type="submit">
            Kaydet
          </StyledButton>
        </Box>
      </StyledForm>
    </form>
  );
};

export default EditPostForm;