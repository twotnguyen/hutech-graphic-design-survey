# Khảo sát Thương hiệu cá nhân sinh viên ngành Thiết kế đồ họa HUTECH

Thư mục dự án độc lập dùng để trích xuất câu hỏi, thiết lập phân bố mục tiêu (%) cho mô phỏng số liệu và hiển thị website trực quan với biểu mẫu điền thử & dashboard thống kê.

---

## 1. Xem website trên máy cục bộ

Chạy lệnh máy chủ tĩnh bằng Python:

```bash
cd /Users/twot/Documents/CODE/Google-form/Huyen-2
python3 -m http.server 8080 --bind 127.0.0.1
```

Mở trình duyệt truy cập: **http://127.0.0.1:8080**

- **Tab 1: Phiếu khảo sát (Điền thử)**: Giao diện web mô phỏng biểu mẫu thực tế, đầy đủ 40 câu hỏi (1 câu gạn lọc, 35 câu Likert 5 mức độ theo 7 nhóm nhân tố, 4 câu nhân khẩu học). Có kiểm tra bắt buộc, cảnh báo câu gạn lọc và làm lại khảo sát.
- **Tab 2: Thống kê & Phân tích**: Dashboard trực quan hiển thị cơ cấu mẫu (biểu đồ tròn SVG cho giới tính, năm học, kinh nghiệm; biểu đồ cột cho mạng xã hội) và thanh đo tỷ lệ phần trăm phân bố kèm điểm trung bình ($\bar{X}$) của 35 biến quan sát Likert.

---

## 2. Điền số liệu % mong muốn

Mở file **`PHAN-BO-MONG-MUON.md`** để điền tỷ lệ % mong muốn cho từng câu hỏi:

- Cú pháp: `- Tên lựa chọn: [Số phiếu] - [%]%`
  - Ví dụ câu trắc nghiệm đơn:
    ```markdown
    #### 1. Giới tính
    - Nam: 96 - 48%
    - Nữ: 100 - 50%
    - Khác: 4 - 2%
    ```
  - Ví dụ câu Likert 1–5:
    ```markdown
    #### 2. Tôi thể hiện được phong cách sáng tạo riêng... [SE1]
    - 1 (Hoàn toàn không đồng ý): 4 - 2%
    - 2 (Không đồng ý): 16 - 8%
    - 3 (Trung lập / Bình thường): 50 - 25%
    - 4 (Đồng ý): 90 - 45%
    - 5 (Hoàn toàn đồng ý): 40 - 20%
    ```
- **Quy tắc**:
  - Với câu đơn và câu Likert 1–5, tổng tỷ lệ % của một câu phải cộng đủ **100%**.
  - Không chọn đáp án nào thì ghi `0 - 0%`.
  - Câu chọn nhiều đáp án (Hộp kiểm) tổng % có thể lớn hơn 100%.

---

## 3. Sinh dữ liệu mô phỏng

Sau khi cập nhật file `PHAN-BO-MONG-MUON.md`, chạy script để tạo dữ liệu bảng và cập nhật web:

```bash
python3 make_sim.py 200
```
*(Thay 200 bằng số mẫu bạn cần: 250, 300, 400...)*

Script sẽ tự động xuất ra:
- **`sim_responses.csv`**: File bảng dữ liệu (mỗi dòng là một phản hồi, đầy đủ dấu thời gian và câu trả lời).
- **`demo_data.json`**: Cập nhật tức thì số liệu và biểu đồ trên website.

---

## 4. Cấu trúc thư mục `Huyen-2/`

- `questions.json`: Cấu trúc dữ liệu chuẩn hóa của form (tiêu đề, các phần, câu hỏi, mã Google Form, thang đo).
- `questions.js`: File JS đóng gói câu hỏi phục vụ trực tiếp cho frontend.
- `PHAN-BO-MONG-MUON.md`: Biểu mẫu văn bản để người dùng điền số lượng và % mong muốn.
- `export_questions.py`: Script tự động đọc Google Form trực tuyến và xuất cấu trúc câu hỏi.
- `make_sim.py`: Script sinh dữ liệu mô phỏng ra CSV và JSON thống kê.
- `sim_responses.csv`: Dữ liệu mô phỏng chi tiết từng dòng phản hồi.
- `demo_data.json`: Dữ liệu thống kê tổng hợp phục vụ dashboard.
- `index.html`: Giao diện web responsive (Tabs Điền thử & Thống kê).
- `styles.css`: Hệ thống style giao diện hiện đại theo phong cách đồ họa HUTECH.
- `statistics.js`: Logic render dashboard và vẽ biểu đồ SVG thuần.
- `statistics.css`: Style cho bảng và các biểu đồ phân tích thống kê.
- `app.js`: Logic điều khiển biểu mẫu khảo sát, kiểm tra bắt buộc và xử lý luồng.
