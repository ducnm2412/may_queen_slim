/**
 * Media trang chủ bản v2. Khi có TVC thật:
 * 1. Chép file vào public/video/ (nên H.264 MP4, 1920x1080, dưới ~8MB, không tiếng).
 * 2. Sửa đường dẫn bên dưới (hoặc ghi đè luôn hero-tvc.mp4) và tăng VERSION để trình duyệt tải file mới.
 * `mobile` để null nếu không có bản dọc 9:16 riêng cho điện thoại.
 */
const VERSION = 1;
const v = (src: string) => `${src}?v=${VERSION}`;

export const HERO_VIDEO = {
  desktop: v("/video/hero-tvc.mp4"),
  mobile: null as string | null,
  poster: v("/video/hero-tvc-poster.jpg"),
  /** Video hiện tại dựng tạm từ ảnh AI, chỉ để hình dung. Đổi thành false khi có TVC thật. */
  isDemo: true,
};

/** Đoạn "biến hình" ngay sau hero: ảnh trước → ảnh sau, đổi theo vị trí cuộn. */
export const TRANSFORM = {
  before: "/img/v2/tvc-1-truoc.jpg",
  after: "/img/v2/tvc-3-tu-tin.jpg",
};
