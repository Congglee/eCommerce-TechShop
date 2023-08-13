export const generateRange = (start: number, end: number) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};
// start = 3, end = 6 ==> [3, 4, 5, 6]

export const formatCurrency = (amount: number | undefined) => {
  return ((amount as number) / 100).toLocaleString("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
  page?: string | number
) => {
  const nameUrl = `?name=${value}${
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
