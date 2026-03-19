import classicProductImage from "@/assets/images/products/klasik.png";
import gingerProductImage from "@/assets/images/products/ginger.png";
import hempProductImage from "@/assets/images/products/hemp.png";
import melonProductImage from "@/assets/images/products/melon.png";
import mintProductImage from "@/assets/images/products/mint.png";
import zeroProductImage from "@/assets/images/products/zero.png";
import cucumberProductImage from "@/assets/images/products/cucumber.png";
import { glutenFreeIcon, lactoseFreeIcon, veganIcon } from "@/assets";

export type ProductFeaturing = {
  label?: string;
  className?: string;
};

export type ProductFeatureBadge = {
  icon: string;
  alt: string;
  className: string;
};

export type MockProduct = {
  id: string;
  productBrand: string;
  productName: string;
  productVolume: string;
  productPrice: string;
  productPicture: string;
  color: string;
  featuring?: ProductFeaturing;
  productFeatures: ProductFeatureBadge[];
};

export const SHIPPING_FEE = 4.9;
export const TAX_RATE = 0.23;

const defaultProductFeatures: ProductFeatureBadge[] = [
  {
    icon: veganIcon,
    alt: "Vegan",
    className: "bg-green-200",
  },
  {
    icon: lactoseFreeIcon,
    alt: "Lactose Free",
    className: "bg-yellow-200",
  },
  {
    icon: glutenFreeIcon,
    alt: "Gluten Free",
    className: "bg-blue-200",
  },
];

export const mockProducts: MockProduct[] = [
  {
    id: "mock-1",
    productBrand: "AMATE",
    productName: "Klasik",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: classicProductImage,
    color: "#eab308",
    featuring: {
      label: "Bestseller",
      className: "bg-red-500",
    },
    productFeatures: defaultProductFeatures,
  },
  {
    id: "mock-2",
    productBrand: "AMATE",
    productName: "Zázvor",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: gingerProductImage,
    color: "#a855f7",
    featuring: {
      label: "Bestseller",
      className: "bg-red-500",
    },
    productFeatures: defaultProductFeatures,
  },
  {
    id: "mock-3",
    productBrand: "AMATE",
    productName: "Konope",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: hempProductImage,
    color: "#22c55e",
    productFeatures: defaultProductFeatures,
  },
  {
    id: "mock-4",
    productBrand: "AMATE",
    productName: "Melón",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: melonProductImage,
    color: "#ef4444",
    productFeatures: defaultProductFeatures,
  },
  {
    id: "mock-5",
    productBrand: "AMATE",
    productName: "Mäta",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: mintProductImage,
    color: "#3b82f6",
    featuring: {
      label: "Bestseller",
      className: "bg-red-500",
    },
    productFeatures: defaultProductFeatures,
  },
  {
    id: "mock-6",
    productBrand: "AMATE",
    productName: "Zero",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: zeroProductImage,
    color: "#9ca3af",
    productFeatures: defaultProductFeatures,
  },
  {
    id: "mock-7",
    productBrand: "AMATE",
    productName: "Uhorka",
    productVolume: "0,33 l",
    productPrice: "1,89 €",
    productPicture: cucumberProductImage,
    color: "#7a8c3e",
    productFeatures: defaultProductFeatures,
  },
];
