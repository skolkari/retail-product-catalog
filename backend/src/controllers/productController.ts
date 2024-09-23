import { Request, Response } from "express";
import {
  getAllProducts,
  addProduct,
  getProductById,
  searchProducts,
} from "../services/productService";

export const getProducts = (req: Request, res: Response) => {
  const start = parseInt(req.query.start as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const results = getAllProducts(start, limit);
  res.json(results);
};

export const createProduct = (req: Request, res: Response) => {
  const product = req.body;

  // validate the payload
  if (
    !product.name ||
    !product.category ||
    !product.description ||
    !product.price ||
    !product.imageUrl
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  addProduct(product);
  res.status(201).json(product);
};

export const getProduct = (req: Request, res: Response) => {
  const product = getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const searchProduct = (req: Request, res: Response) => {
  const query = req.query.q as string;
  const start = parseInt(req.query.start as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const results = searchProducts(query, start, limit);
  res.json(results);
};
