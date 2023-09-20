import CryptoJS from "crypto-js";
import moment from "moment";
import queryString from "query-string";

export const generateRange = (start: number, end: number) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};
// start = 3, end = 6 ==> [3, 4, 5, 6]

export const formatCurrency = (amount: number | undefined | string) => {
  return ((amount as number) / 100).toLocaleString("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDate = (inputDate?: string) => {
  const formattedDate = moment(inputDate).format("DD/MM/YYYY");
  return formattedDate;
};

export const generateSearchParamsURL = ({
  name = "",
  sort = "",
  price_filter_gte = "",
  price_filter_lte = "",
  brand = "",
  page = "",
  isCategory = false,
  categoryUrlValue = "",
  isAdmin = false,
  adminUrlValue = "",
  orderStatus = "",
}: {
  name?: string;
  sort?: string;
  price_filter_gte?: string;
  price_filter_lte?: string;
  brand?: string;
  page?: string;
  isCategory?: boolean;
  categoryUrlValue?: string;
  isAdmin?: boolean;
  adminUrlValue?: string;
  orderStatus?: string;
}) => {
  let baseEndpoint;
  if (isAdmin) {
    baseEndpoint = `/admin/${adminUrlValue}`;
  } else {
    baseEndpoint = isCategory ? `/category/${categoryUrlValue}` : "/products";
  }

  const queryParams: {
    name?: string;
    sort?: string;
    price_filter_gte?: string;
    price_filter_lte?: string;
    brand?: string;
    page?: string;
    orderStatus?: string;
  } = {};

  if (name) queryParams.name = name;
  if (sort) queryParams.sort = sort;
  if (price_filter_gte) queryParams.price_filter_gte = price_filter_gte;
  if (price_filter_lte) queryParams.price_filter_lte = price_filter_lte;
  if (brand) queryParams.brand = brand;
  if (page) queryParams.page = page;
  if (orderStatus) queryParams.orderStatus = orderStatus;

  const queryParamsURL = `${baseEndpoint}?${queryString.stringify(
    queryParams
  )}`;

  return queryParamsURL;
};

export const encryptData = (data: any, secretKey: any) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
  return encryptedData.toString();
};

export const decryptData = (encryptedData: any, secretKey: any) => {
  let bytes;
  if (encryptedData) {
    bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  }

  let decryptedData;
  if (bytes) {
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  return decryptedData;
};

export function getBase64(file: any) {
  if (!file) return "";

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file.type) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }
  });
}
