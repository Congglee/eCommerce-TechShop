import laptopAcer from "../assets/laptop_acer_collection.png";
import laptopAsus from "../assets/laptop_asus_collection_20.jpeg";
import laptopDell from "../assets/laptop_dell_collection.png";
import laptopHp from "../assets/laptop_hp_collection.png";
import laptopLenvo from "../assets/laptop_lenovo_collection.png";
import mackbook from "../assets/macbook_collection.png";

const hotCollections = [
  {
    title: "Acer",
    image: laptopAcer,
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
    image: laptopAsus,
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
    image: laptopLenvo,
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
    image: laptopDell,
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
    image: laptopHp,
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
    image: mackbook,
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
    image: "https://hanoicomputercdn.com/media/news/1817_cover_msi_laptop.jpg",
    title: "Loạt laptop MSI mới trang bị Raptor Lake-HX và RTX 40 Series",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Sự kiện trực tuyến “MSIology: The Leap to Singularity” giới thiệu các mẫu laptop mới nhất, trang bị bộ đôi vi xử lý Intel Core HX Series thế hệ 13 cùng đồ họa ...",
  },
  {
    id: 2,
    image:
      "https://hanoicomputercdn.com/media/news/1746_cover_corei9_13900hx.jpg",
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
      "https://hanoicomputercdn.com/media/news/2035_laptop_asus_vivobook_pro_16x.jpg",
    title: "Những mẫu laptop phù hợp với sinh viên mùa tựu trường",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Tổng hợp 9 mẫu laptop tốt nhất dành cho sinh viên mùa nhập học 2023 với mức giá vô cùng hấp dẫn tại Digital World.",
  },
  {
    id: 4,
    image:
      "https://hanoicomputercdn.com/media/news/2035_laptop_asus_vivobook_pro_16x.jpg",
    title: "Những mẫu laptop phù hợp với sinh viên mùa tựu trường",
    date: "December 13, 2016",
    comments: 1,
    content:
      "Tổng hợp 9 mẫu laptop tốt nhất dành cho sinh viên mùa nhập học 2023 với mức giá vô cùng hấp dẫn tại Digital World.",
  },
];

export { hotCollections, newsItems };
