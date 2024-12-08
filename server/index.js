import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

dotenv.config(); // .env dosyasını yükleme

const app = express();

// Middleware'ler
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Ana rota
app.get("/", (req, res) => {
  res.send("Ali Öztürk Tarafından Kodlanmıştır");
});

// Post rotaları
app.use("/posts", postRoutes);

// Port ve MongoDB bağlantısı
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server çalışıyor: http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB bağlantı hatası:", error.message);
  });