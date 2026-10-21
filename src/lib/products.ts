export type Category = "combo" | "mq" | "yd";

export type Product = {
  id: string;
  cat: Category;
  name: string;
  nameEn?: string;
  spec: string;
  specEn: string;
  price: number;
  old?: number;
  img: string;
  tag: string;
  tagEn: string;
  top?: boolean;
};

/** Giá và các gói 60/90 ngày là DỮ LIỆU MẪU, cần khách xác nhận trước khi go-live. */
export const PRODUCTS: Product[] = [
  {
    id: "cb30",
    cat: "combo",
    name: "Combo Sáng – Tối",
    nameEn: "Day–Night combo",
    spec: "Mayqueen Slim + Yodetox Extra · 30 ngày",
    specEn: "Mayqueen Slim + Yodetox Extra · 30 days",
    price: 790000,
    old: 850000,
    img: "/img/combo-open.jpg",
    tag: "Tiết kiệm nhất",
    tagEn: "Best value",
    top: true,
  },
  {
    id: "mq",
    cat: "mq",
    name: "Mayqueen Slim",
    spec: "Viên uống thảo mộc · lọ 30 viên",
    specEn: "Herbal capsules · 30 per bottle",
    price: 450000,
    img: "/img/che-ngu-con-doi-gia.jpg",
    tag: "Bước sáng",
    tagEn: "Morning step",
    top: true,
  },
  {
    id: "yd",
    cat: "yd",
    name: "Yodetox Extra",
    spec: "Thức uống thanh lọc · hộp 30 gói",
    specEn: "Detox drink · 30 sachets",
    price: 400000,
    img: "/img/yodetox-rock.jpg",
    tag: "Bước tối",
    tagEn: "Night step",
    top: true,
  },
  {
    id: "cb60",
    cat: "combo",
    name: "Combo 60 ngày",
    nameEn: "60-day combo",
    spec: "2 Mayqueen Slim + 2 Yodetox Extra",
    specEn: "2 Mayqueen Slim + 2 Yodetox Extra",
    price: 1500000,
    old: 1700000,
    img: "/img/duo-podium.jpg",
    tag: "Liệu trình đôi",
    tagEn: "Double course",
    top: true,
  },
  {
    id: "cb90",
    cat: "combo",
    name: "Combo 90 ngày",
    nameEn: "90-day combo",
    spec: "3 Mayqueen Slim + 3 Yodetox Extra",
    specEn: "3 Mayqueen Slim + 3 Yodetox Extra",
    price: 2150000,
    old: 2550000,
    img: "/img/duo-glass.jpg",
    tag: "Giữ dáng bền vững",
    tagEn: "Lasting results",
    top: true,
  },
  {
    id: "mq2",
    cat: "mq",
    name: "Mayqueen Slim x2",
    spec: "2 lọ · 60 viên",
    specEn: "2 bottles · 60 capsules",
    price: 870000,
    old: 900000,
    img: "/img/bat-cong-tac.jpg",
    tag: "Bước sáng",
    tagEn: "Morning step",
  },
  {
    id: "yd2",
    cat: "yd",
    name: "Yodetox Extra x2",
    spec: "2 hộp · 60 gói",
    specEn: "2 boxes · 60 sachets",
    price: 770000,
    old: 800000,
    img: "/img/yodetox-da.jpg",
    tag: "Bước tối",
    tagEn: "Night step",
  },
  {
    id: "cbgift",
    cat: "combo",
    name: "Hộp quà Combo",
    nameEn: "Combo gift box",
    spec: "Combo 30 ngày + thiệp tặng",
    specEn: "30-day combo + gift card",
    price: 820000,
    img: "/img/gio-qua-tet.jpg",
    tag: "Quà tặng",
    tagEn: "Gift",
  },
];

export const PRODUCT_BY_ID: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p]),
);

export const FREESHIP_FROM = 700000;

export const CONTACT = {
  company: "MayqueenSlim Official",
  person: "Phan Tiến Đại",
  phone: "039 5057 364",
  tel: "tel:0395057364",
  zalo: "https://zalo.me/0395057364",
  facebook: "https://www.facebook.com/profile.php?id=61586783311362",
  maps: "https://maps.app.goo.gl/eoVXPYNVaPmcASwV8",
  mapEmbed:
    "https://www.google.com/maps?q=H%C3%A0%20%C4%90%C3%B4ng%2C%20H%C3%A0%20N%E1%BB%99i&z=14&output=embed",
  address: "Hà Đông, Hà Nội",
  hours: "8:00–21:00",
};

/** Bỏ dấu tiếng Việt + chữ thường, để "combo sang" khớp "Combo Sáng". */
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0111\u0110]/g, "d").toLowerCase().replace(/\s+/g, " ").trim();

export const formatVnd = (n: number) => n.toLocaleString("vi-VN") + "đ";
