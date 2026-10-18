import type { Category } from "./products";

export type Detail = {
  gallery: string[];
  /** Mô tả dài, 2 ngôn ngữ */
  about: [string, string];
  usage: [string, string][];
  ingredients: [string, string][];
  notes: [string, string][];
};

/** Nội dung chi tiết theo nhóm sản phẩm. Thành phần Mayqueen Slim lấy từ tư liệu B.O.T (Glucomannan, L-Carnitine, HCA, Chitosan). */
const BY_CAT: Record<Category, Omit<Detail, "gallery">> = {
  mq: {
    about: [
      "Mayqueen Slim là viên uống thảo mộc hỗ trợ tăng cường chuyển hoá chất béo và kiểm soát cảm giác thèm ăn. Dùng đều mỗi sáng trong 30 ngày, kết hợp ăn uống lành mạnh, không cần nhịn đói.",
      "Mayqueen Slim is an herbal capsule that supports fat metabolism and helps curb cravings. Take it every morning for 30 days alongside a balanced diet, no starving required.",
    ],
    usage: [
      ["2 viên sau bữa sáng, uống với nước ấm.", "2 capsules after breakfast with warm water."],
      ["Dùng liên tục 30 ngày để thấy thay đổi rõ.", "Use for 30 days straight for visible change."],
      ["Uống đủ 1,5–2 lít nước mỗi ngày.", "Drink 1.5–2 litres of water a day."],
    ],
    ingredients: [
      ["Glucomannan: tạo cảm giác no, giảm ăn vặt.", "Glucomannan: keeps you full, fewer snacks."],
      ["L-Carnitine: hỗ trợ đốt mỡ thành năng lượng.", "L-Carnitine: helps turn fat into energy."],
      ["HCA (Garcinia): hạn chế tích mỡ mới.", "HCA (Garcinia): limits new fat storage."],
      ["Chitosan: hỗ trợ giảm hấp thu chất béo.", "Chitosan: helps reduce fat absorption."],
    ],
    notes: [
      ["Lọ 30 viên, dùng cho 15 ngày với liều 2 viên/ngày.", "30 capsules per bottle, 15 days at 2 a day."],
      ["Không dùng cho phụ nữ mang thai, cho con bú, người dưới 18 tuổi.", "Not for pregnant or breastfeeding women, or under-18s."],
      ["Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.", "This product is not a medicine and does not replace medical treatment."],
    ],
  },
  yd: {
    about: [
      "Yodetox Extra là thức uống thảo mộc dạng gói, pha với nước ấm trước khi ngủ. Hỗ trợ thanh lọc hệ tiêu hoá, giảm đầy hơi, nhẹ bụng và giúp làn da sáng khoẻ từ bên trong.",
      "Yodetox Extra is an herbal drink in sachets, mixed with warm water before bed. It supports digestive cleansing, eases bloating and brightens skin from within.",
    ],
    usage: [
      ["1 gói pha 150 ml nước ấm, uống trước khi ngủ 30 phút.", "1 sachet in 150 ml warm water, 30 minutes before bed."],
      ["Dùng mỗi tối, liên tục 30 ngày.", "Every night for 30 days."],
      ["Có thể thêm vài lát gừng hoặc chanh.", "Add a few slices of ginger or lemon if you like."],
    ],
    ingredients: [
      ["Thảo mộc thanh nhiệt, hỗ trợ tiêu hoá.", "Cooling herbs that support digestion."],
      ["Chất xơ hoà tan giúp nhẹ bụng.", "Soluble fibre for a lighter belly."],
      ["Không đường tinh luyện, không chất tạo màu.", "No refined sugar, no artificial colouring."],
    ],
    notes: [
      ["Hộp 30 gói, mỗi gói 20 g.", "30 sachets per box, 20 g each."],
      ["Người đang dùng thuốc nên hỏi ý kiến bác sĩ.", "Ask a doctor first if you are on medication."],
      ["Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.", "This product is not a medicine and does not replace medical treatment."],
    ],
  },
  combo: {
    about: [
      "Combo Sáng – Tối kết hợp Mayqueen Slim buổi sáng và Yodetox Extra buổi tối: sáng hỗ trợ chuyển hoá mỡ, tối thanh lọc dịu nhẹ. Hai bước mỗi ngày cho vóc dáng gọn và cơ thể nhẹ từ bên trong.",
      "The Day–Night combo pairs Mayqueen Slim in the morning with Yodetox Extra at night: burn by day, cleanse by night. Two steps a day for a slimmer shape and a lighter body.",
    ],
    usage: [
      ["Sáng: 2 viên Mayqueen Slim sau bữa sáng.", "Morning: 2 Mayqueen Slim capsules after breakfast."],
      ["Tối: 1 gói Yodetox Extra pha 150 ml nước ấm trước khi ngủ.", "Night: 1 Yodetox Extra sachet in 150 ml warm water before bed."],
      ["Tặng kèm thực đơn eat clean và coach Zalo trong suốt liệu trình.", "Comes with an eat-clean menu and a Zalo coach for the whole course."],
    ],
    ingredients: [
      ["Mayqueen Slim: Glucomannan, L-Carnitine, HCA, Chitosan.", "Mayqueen Slim: Glucomannan, L-Carnitine, HCA, Chitosan."],
      ["Yodetox Extra: thảo mộc thanh nhiệt, chất xơ hoà tan.", "Yodetox Extra: cooling herbs, soluble fibre."],
    ],
    notes: [
      ["Đủ hồ sơ công bố, sản xuất bởi B.O.T Việt Nam.", "Fully declared, made by B.O.T Vietnam."],
      ["Freeship toàn quốc cho combo. Kiểm hàng trước khi thanh toán.", "Free nationwide shipping on combos. Inspect before paying."],
      ["Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.", "This product is not a medicine and does not replace medical treatment."],
    ],
  },
};

const GALLERY: Record<string, string[]> = {
  cb30: ["/img/combo-open.jpg", "/img/duo-podium.jpg", "/img/yodetox-rock.jpg", "/img/che-ngu-con-doi-gia.jpg"],
  mq: ["/img/che-ngu-con-doi-gia.jpg", "/img/hieu-co-the.jpg", "/img/5-co-che.jpg", "/img/bat-cong-tac.jpg"],
  yd: ["/img/yodetox-rock.jpg", "/img/yodetox-da.jpg", "/img/combo-open.jpg"],
  cb60: ["/img/duo-podium.jpg", "/img/duo-glass.jpg", "/img/combo-open.jpg", "/img/giai-doan-2.jpg"],
  cb90: ["/img/duo-glass.jpg", "/img/duo-podium.jpg", "/img/giai-doan-3.jpg", "/img/30-ngay-cung.jpg"],
  mq2: ["/img/bat-cong-tac.jpg", "/img/nguoi-khoe-dang-xinh.jpg", "/img/5-co-che.jpg"],
  yd2: ["/img/yodetox-da.jpg", "/img/yodetox-rock.jpg"],
  cbgift: ["/img/gio-qua-tet.jpg", "/img/life-tu-thuong.jpg", "/img/combo-open.jpg"],
};

export function getDetail(id: string, cat: Category, img: string): Detail {
  return { gallery: GALLERY[id] ?? [img], ...BY_CAT[cat] };
}
