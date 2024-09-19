import axios, { AxiosResponse } from "axios";
import {
  CategoryResponse,
  ProductItem,
  ProductResponse,
} from "./api.types";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProductCategoryList = async (): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await api.get(
      "/products/category-list"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getProductListByCategory = async (
  category: string
): Promise<ProductItem[]> => {
  try {
    const response: AxiosResponse<ProductResponse> = await api.get(
      `/products/category/${category}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
