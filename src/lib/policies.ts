import type { L } from "./posts";

/** Nội dung chính sách MẪU, cần khách xác nhận trước khi go-live. */
export type Policy = { slug: string; title: L; intro: L; sections: { h: L; items: L[] }[] };

export const POLICIES: Policy[] = [
  {
    slug: "van-chuyen",
    title: ["Chính sách vận chuyển", "Shipping policy"],
    intro: ["Mayqueen giao hàng toàn quốc qua các đơn vị vận chuyển uy tín, đóng gói kín đáo.", "Mayqueen ships nationwide through trusted carriers in discreet packaging."],
    sections: [
      { h: ["Thời gian giao hàng", "Delivery time"], items: [
        ["Nội thành Hà Nội: giao trong ngày với đơn đặt trước 15:00.", "Inner Hanoi: same-day delivery for orders before 3 pm."],
        ["Các tỉnh miền Bắc: 1 đến 2 ngày làm việc.", "Northern provinces: 1 to 2 business days."],
        ["Miền Trung và miền Nam: 2 đến 4 ngày làm việc.", "Central and southern provinces: 2 to 4 business days."],
      ] },
      { h: ["Phí vận chuyển", "Shipping fee"], items: [
        ["Miễn phí vận chuyển toàn quốc cho đơn từ 700.000đ.", "Free nationwide shipping on orders from 700,000đ."],
        ["Đơn dưới 700.000đ: phí đồng giá 30.000đ.", "Orders under 700,000đ: flat 30,000đ fee."],
      ] },
      { h: ["Theo dõi đơn hàng", "Order tracking"], items: [
        ["Mayqueen gọi xác nhận trong 15 phút (8:00–21:00) và gửi mã vận đơn qua Zalo.", "We call to confirm within 15 minutes (8:00–21:00) and send the tracking code via Zalo."],
      ] },
    ],
  },
  {
    slug: "doi-tra",
    title: ["Chính sách đổi trả", "Returns policy"],
    intro: ["Bạn được kiểm tra hàng trước khi thanh toán và đổi trả trong 7 ngày nếu sản phẩm có lỗi.", "You can inspect goods before paying and return within 7 days if a product is faulty."],
    sections: [
      { h: ["Trường hợp được đổi trả", "Eligible cases"], items: [
        ["Sản phẩm bị lỗi, móp méo, rách bao bì từ nhà sản xuất hoặc trong quá trình vận chuyển.", "Products damaged or with torn packaging from the factory or in transit."],
        ["Giao sai sản phẩm, sai số lượng so với đơn đặt.", "Wrong product or quantity delivered."],
        ["Sản phẩm hết hạn sử dụng tại thời điểm nhận hàng.", "Product expired on arrival."],
      ] },
      { h: ["Điều kiện", "Conditions"], items: [
        ["Yêu cầu trong vòng 7 ngày kể từ ngày nhận hàng.", "Request within 7 days of delivery."],
        ["Sản phẩm còn nguyên tem niêm phong, chưa qua sử dụng (trừ trường hợp lỗi).", "Seal intact and unused (except for faulty items)."],
        ["Gửi kèm ảnh hoặc video sản phẩm qua Zalo 039 5057 364.", "Send photos or video via Zalo 039 5057 364."],
      ] },
      { h: ["Hoàn tiền", "Refunds"], items: [
        ["Hoàn tiền qua chuyển khoản trong 3 đến 5 ngày làm việc sau khi nhận lại hàng.", "Refunded by bank transfer within 3 to 5 business days after we receive the item."],
        ["Mayqueen chịu phí vận chuyển đổi trả với lỗi từ phía cửa hàng.", "We cover return shipping for errors on our side."],
      ] },
    ],
  },
  {
    slug: "bao-mat",
    title: ["Chính sách bảo mật", "Privacy policy"],
    intro: ["Mayqueen chỉ thu thập thông tin cần thiết để giao hàng và tư vấn, không chia sẻ cho bên thứ ba vì mục đích quảng cáo.", "We only collect what is needed to deliver and advise you, and never share it with third parties for advertising."],
    sections: [
      { h: ["Thông tin thu thập", "What we collect"], items: [
        ["Họ tên, số điện thoại, địa chỉ nhận hàng khi bạn đặt hàng.", "Name, phone and delivery address when you order."],
        ["Chiều cao, cân nặng, mục tiêu khi bạn đăng ký tư vấn (không bắt buộc).", "Height, weight and goals when you request advice (optional)."],
      ] },
      { h: ["Mục đích sử dụng", "How we use it"], items: [
        ["Xác nhận, giao đơn hàng và chăm sóc sau bán.", "Confirming, delivering and following up on orders."],
        ["Tư vấn liệu trình phù hợp qua Zalo hoặc điện thoại.", "Personal course advice via Zalo or phone."],
      ] },
      { h: ["Quyền của bạn", "Your rights"], items: [
        ["Yêu cầu xem, sửa hoặc xoá thông tin cá nhân bất kỳ lúc nào qua hotline 039 5057 364.", "Ask to view, edit or delete your data at any time via hotline 039 5057 364."],
      ] },
    ],
  },
  {
    slug: "dieu-khoan",
    title: ["Điều khoản sử dụng", "Terms of use"],
    intro: ["Khi mua hàng tại website Mayqueen Slim, bạn đồng ý với các điều khoản dưới đây.", "By shopping on the Mayqueen Slim website you agree to the terms below."],
    sections: [
      { h: ["Sản phẩm", "Products"], items: [
        ["Mayqueen Slim và Yodetox Extra là thực phẩm bảo vệ sức khoẻ, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.", "Mayqueen Slim and Yodetox Extra are health supplements, not medicines, and do not replace medical treatment."],
        ["Hiệu quả có thể khác nhau tuỳ cơ địa và lối sống của mỗi người.", "Results vary with each person's body and lifestyle."],
        ["Phụ nữ mang thai, cho con bú, người dưới 18 tuổi và người đang điều trị bệnh nên hỏi ý kiến bác sĩ trước khi dùng.", "Pregnant or breastfeeding women, under-18s and people under treatment should consult a doctor first."],
      ] },
      { h: ["Giá và thanh toán", "Pricing and payment"], items: [
        ["Giá niêm yết đã gồm VAT. Mayqueen có thể thay đổi giá và chương trình khuyến mãi mà không cần báo trước.", "Listed prices include VAT. Prices and promotions may change without notice."],
        ["Thanh toán khi nhận hàng (COD) hoặc chuyển khoản.", "Pay by cash on delivery (COD) or bank transfer."],
      ] },
    ],
  },
  {
    slug: "thanh-toan",
    title: ["Chính sách thanh toán", "Payment policy"],
    intro: ["Mayqueen hỗ trợ thanh toán khi nhận hàng và chuyển khoản. Nội dung mẫu, cần khách xác nhận.", "We accept cash on delivery and bank transfer. Sample content, pending client confirmation."],
    sections: [
      { h: ["Hình thức thanh toán", "Payment methods"], items: [
        ["Thanh toán khi nhận hàng (COD): kiểm tra hàng rồi mới trả tiền.", "Cash on delivery (COD): inspect your order before paying."],
        ["Chuyển khoản: [Ngân hàng] · [Số tài khoản] · [Chủ tài khoản].", "Bank transfer: [Bank] · [Account number] · [Account holder]."],
      ] },
      { h: ["Hoá đơn", "Invoices"], items: [
        ["Xuất hoá đơn VAT theo yêu cầu, gửi thông tin công ty qua hotline hoặc Zalo.", "VAT invoices on request; send your company details via hotline or Zalo."],
      ] },
    ],
  },
];

export const POLICY_BY_SLUG: Record<string, Policy> = Object.fromEntries(POLICIES.map((p) => [p.slug, p]));
