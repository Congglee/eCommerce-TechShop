const hotCollections = [
  {
    title: "Acer",
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695207845/ecommerce-techshop/laptop_acer_collection_tf0ivs.png",
    type: [
      "Acer Aspire",
      "Acer Swift",
      "Acer Spin",
      "Acer TravelMate",
      "Acer Nitro",
      "Acer Aspire 7",
      "Acer Predator",
    ],
  },

  {
    title: "Asus",
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695207845/ecommerce-techshop/laptop_asus_collection_20_wukgjf.jpg",
    type: [
      "Asus Vivobook",
      "Asus Zenbook",
      "Asus ExpertBook",
      "Asus X Series",
      "Asus ProArt",
      "Asus ROG Gaming",
      "Asus TUF Gaming",
    ],
  },

  {
    title: "Lenovo",
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695207845/ecommerce-techshop/laptop_lenovo_collection_twowhp.png",
    type: [
      "Lenovo Thinkpad",
      "Lenovo Ideapad",
      "Lenovo Thinkbook",
      "Lenovo Gaming 3",
      "Lenovo Yoga",
      "Lenovo Gaming LOQ",
      "Lenovo Pro",
      "Lenovo Legion S5",
    ],
  },

  {
    title: "Dell",
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695207846/ecommerce-techshop/laptop_dell_collection_sjems8.png",
    type: [
      "Dell Inspiron",
      "Dell Vostro",
      "Dell Latitude",
      "Dell XPS",
      "Dell Gaming G3",
      "Dell Gaming G5",
      "Dell Gaming G7",
      "Dell Gaming G15",
      "Dell Alienware",
    ],
  },

  {
    title: "HP",
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695207845/ecommerce-techshop/laptop_hp_collection_fgv6j6.png",
    type: [
      "HP Pavilion",
      "HP Probook",
      "HP Elitebook",
      "HP Envy",
      "HP Spectre",
      "HP 14s, 15s",
      "HP Omen",
      "HP VICTUS",
    ],
  },

  {
    title: "Apple",
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695207853/ecommerce-techshop/macbook_collection_go8spy.png",
    type: [
      "Apple Macbook Air",
      "Apple Macbook Pro 13",
      "Apple Macbook Pro 14",
      "Apple Macbook Pro 16",
    ],
  },
];

const newsItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695210302/ecommerce-techshop/1817_cover_msi_laptop_uq9t51.jpg",
    title: "Loạt laptop MSI mới trang bị Raptor Lake-HX và RTX 40 Series",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Sự kiện trực tuyến “MSIology: The Leap to Singularity” giới thiệu các mẫu laptop mới nhất, trang bị bộ đôi vi xử lý Intel Core HX Series thế hệ 13 cùng đồ họa ...",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695210329/ecommerce-techshop/1746_cover_corei9_13900hx_egyph3.jpg",
    title:
      "Core i9-13900HX cho laptop lộ điểm hiệu năng vượt trội với thế hệ tiền nhiệm",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Core i9-13900HX cho laptop lộ điểm hiệu năng cao hơn cả Core i9-12900K và Ryzen 9 7900X",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695210335/ecommerce-techshop/2035_laptop_asus_vivobook_pro_16x_r7wmeq.jpg",
    title: "Những mẫu laptop phù hợp với sinh viên mùa tựu trường",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Tổng hợp 9 mẫu laptop tốt nhất dành cho sinh viên mùa nhập học 2023 với mức giá vô cùng hấp dẫn tại Digital World.",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/di3eto0bg/image/upload/v1695210335/ecommerce-techshop/2035_laptop_asus_vivobook_pro_16x_r7wmeq.jpg",
    title: "Những mẫu laptop phù hợp với sinh viên mùa tựu trường",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Tổng hợp 9 mẫu laptop tốt nhất dành cho sinh viên mùa nhập học 2023 với mức giá vô cùng hấp dẫn tại Digital World.",
  },
];

const roles = [
  {
    label: "Khách",
    value: 0,
  },
  {
    label: "Admin",
    value: 1,
  },
];

const blockStatus = [
  {
    label: "Đang hoạt động",
    value: 0,
  },
  {
    label: "Bị khóa",
    value: 1,
  },
];

const orderStatus = [
  {
    label: "Đang xử lý",
    value: "Đang xử lý",
  },
  {
    label: "Đã hủy",
    value: "Đã hủy",
  },
  {
    label: "Thành công",
    value: "Thành công",
  },
];

const orderDeliveryStatus = [
  {
    label: "Chưa xử lý",
    value: "Chưa xử lý",
  },
  {
    label: "Đang xử lý",
    value: "Đang xử lý",
  },
  {
    label: "Đang giao",
    value: "Đang giao",
  },
  {
    label: "Giao thành công",
    value: "Giao thành công",
  },
];

const orderPaymentStatus = [
  {
    label: "Chưa thanh toán",
    value: "Chưa thanh toán",
  },
  {
    label: "Đã thanh toán",
    value: "Đã thanh toán",
  },
];

export {
  hotCollections,
  newsItems,
  roles,
  blockStatus,
  orderStatus,
  orderDeliveryStatus,
  orderPaymentStatus,
};
