import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page wrap center" style={{ minHeight: "60vh", display: "grid", placeContent: "center", gap: 14 }}>
      <h1 className="h2">Không tìm thấy trang</h1>
      <p className="sub">Đường dẫn này không tồn tại hoặc sản phẩm đã ngừng bán.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <Link className="btn btn-dark" href="/">Về trang chủ</Link>
        <Link className="btn btn-line" href="/#san-pham">Xem sản phẩm</Link>
      </div>
    </main>
  );
}
