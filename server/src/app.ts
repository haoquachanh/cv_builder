import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvRoutes from "./routes/cv.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cv", cvRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
