import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  searchProduct,
} from "../controllers/productController";

const router = Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.get("/products/:id", getProduct);
router.get("/search", searchProduct);

export default router;
