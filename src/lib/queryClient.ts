import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export enum QueryKeys {
  Products = "products",
  Orders = "orders",
  OrderItems = "orderitems",
  ProductFeatures = "productfeatures",
  ProductFeaturings = "productfeaturings",
}
