import CryptoJS from "crypto-js";
import moment from "moment";

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

export const handleSortUrl = (
  value: string,
  name?: string,
  price_filter_gte?: string,
  price_filter_lte?: string,
  page?: string | number
) => {
  const sortUrl = `?sort=${value}${
    name || price_filter_gte || price_filter_lte || page
      ? `&name=${name === undefined ? "" : name}&price_filter_gte=${
          price_filter_gte === undefined ? "" : price_filter_gte
        }&price_filter_lte=${
          price_filter_lte === undefined ? "" : price_filter_lte
        }&page=${page === undefined ? "" : page}`
      : ""
  }`;

  return sortUrl;
};

export const handleNameUrl = (
  value: string,
  sort?: string,
  price_filter_gte?: string,
  price_filter_lte?: string,
  page?: string | number,
  isCategory: boolean = false,
  categoryUrlValue?: string,
  isAdmin: boolean = false,
  adminUrlValue?: string
) => {
  let baseEndpoint;
  if (isAdmin) {
    baseEndpoint = `/admin/${adminUrlValue}`;
  } else {
    baseEndpoint = isCategory ? `/category/${categoryUrlValue}` : "/products";
  }

  const nameUrl = `${baseEndpoint}?name=${value}${
    sort || price_filter_gte || price_filter_lte || page
      ? `&sort=${sort === undefined ? "" : sort}&price_filter_gte=${
          price_filter_gte === undefined ? "" : price_filter_gte
        }&price_filter_lte=${
          price_filter_lte === undefined ? "" : price_filter_lte
        }&page=${page === undefined ? "" : page}`
      : ""
  }`;

  return nameUrl;
};

export const handleFilterPriceGteUrl = (
  value: string,
  name?: string,
  sort?: string,
  price_filter_lte?: string,
  page?: string | number
) => {
  const filterPriceGteUrl = `?price_filter_gte=${value}${
    name || price_filter_lte || sort || page
      ? `&name=${name === undefined ? "" : name}&sort=${
          sort === undefined ? "" : sort
        }&price_filter_lte=${
          price_filter_lte === undefined ? "" : price_filter_lte
        }&page=${page === undefined ? "" : page}`
      : ""
  }`;

  return filterPriceGteUrl;
};

export const handleFilterPriceLteUrl = (
  value: string,
  name?: string,
  sort?: string,
  price_filter_gte?: string,
  page?: string | number
) => {
  const filterPriceLteUrl = `?price_filter_lte=${value}${
    name || price_filter_gte || sort || page
      ? `&name=${name === undefined ? "" : name}&sort=${
          sort === undefined ? "" : sort
        }&price_filter_gte=${
          price_filter_gte === undefined ? "" : price_filter_gte
        }&page=${page === undefined ? "" : page}`
      : ""
  }`;

  return filterPriceLteUrl;
};

export const handlePageUrl = (
  value: string | number,
  name?: string,
  sort?: string,
  price_filter_gte?: string,
  price_filter_lte?: string
) => {
  const pageUrl = `?page=${value}${
    name || price_filter_gte || sort || price_filter_lte
      ? `&name=${name === undefined ? "" : name}&sort=${
          sort === undefined ? "" : sort
        }&price_filter_gte=${
          price_filter_gte === undefined ? "" : price_filter_gte
        }&price_filter_lte=${
          price_filter_lte === undefined ? "" : price_filter_lte
        }`
      : ""
  }`;

  return pageUrl;
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
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
