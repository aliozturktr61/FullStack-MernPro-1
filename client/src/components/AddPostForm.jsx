import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Select,
  MenuItem,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  FormControl,
} from "@mui/material";
import FileBase64 from "react-file-base64";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import {createPost} from "../redux/actions/post"

/* Stil tanımlamaları */
const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

/* Etiketler */
const tags = ["Eğlence", "Programlama", "Sağlık", "Bilim"];

/* Yup doğrulama şeması */
const postSchema = yup.object().shape({
  title: yup.string().required("Başlık zorunludur."),
  subtitle: yup.string().required("Alt Başlık zorunludur."),
  content: yup
    .string()
    .min(20, "İçerik en az 20 karakter olmalıdır.")
    .required("İçerik zorunludur."),
  tag: yup.mixed().oneOf(tags, "Geçersiz etiket."),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const onSubmit = (data) => {
   
    dispatch(createPost({ ...data, image:file }))  // Burada `formData` ile post işlemi yapılabilir.
    console.log("Form Verileri:", data);
    clearForm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni Bir Yazı Oluşturunuz</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Yeni bir yazı oluşturmak için aşağıdaki formu doldurunuz.
        </DialogContentText>
        <Root>
          {/* Formu burada doğrudan submit için handleSubmit ile bağlıyoruz */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <StyledTextField
              id="title"
              label="Başlık"
              {...register("title")}
              variant="outlined"
              size="small"
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />

            <StyledTextField
              id="subtitle"
              label="Alt Başlık"
              {...register("subtitle")}
              variant="outlined"
              size="small"
              error={!!errors.subtitle}
              helperText={errors.subtitle?.message}
              fullWidth
            />

            <FormControl fullWidth error={!!errors.tag} sx={{ mb: 2 }}>
              <InputLabel id="tag-label">Etiket</InputLabel>
              <Controller
                name="tag"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} labelId="tag-label">
                    {tags.map((tag, index) => (
                      <MenuItem key={index} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <StyledTextField
              id="content"
              label="İçerik"
              {...register("content")}
              multiline
              rows={4}
              variant="outlined"
              size="small"
              error={!!errors.content}
              helperText={errors.content?.message}
              fullWidth
            />
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
            {/* Dosya yükleme işlemi */}
            
            {/* Yayınla butonu */}
            <DialogActions>
              <Button onClick={clearForm} color="inherit">
                Vazgeç
              </Button>
              <Button type="submit" variant="outlined" color="primary">
                Yayınla
              </Button>
            </DialogActions>
          </form>
        </Root>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostForm;