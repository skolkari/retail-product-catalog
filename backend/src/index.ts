import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import { checkAndPopulateDataOnStart } from "./populate-data/populateService";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use("/api", productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await checkAndPopulateDataOnStart();
});
