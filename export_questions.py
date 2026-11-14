"""Trích xuất câu hỏi, mã entry Google Forms và cấu trúc các phần từ form online."""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "googleform-autofill-and-submit"))
import form  # noqa: E402

FORM_URL = sys.argv[1] if len(sys.argv) > 1 else "https://docs.google.com/forms/d/e/1FAIpQLSdCEQxjoGleSijds0xkMTISCxu1AemPcSNKtPQMrobgKuvNeA/viewform?usp=send_form"
resp_url = form.get_form_response_url(FORM_URL)
data = form.get_fb_public_load_data(resp_url)

raw_items = data[1][1]
here = os.path.dirname(os.path.abspath(__file__))

out = {
    "source": FORM_URL,
    "response_url": resp_url,
    "title": data[1][8] if len(data[1]) > 8 else "Khảo sát",
    "description": data[1][0] or "",
    "scale": [
        "Hoàn toàn không đồng ý",
        "Không đồng ý",
        "Trung lập / Bình thường",
        "Đồng ý",
        "Hoàn toàn đồng ý",
    ],
    "sections": [],
}

# 1. Phần gạn lọc
item0 = raw_items[0]
out["sections"].append({
    "id": "sec1",
    "title": "PHẦN 1: LỜI MỞ ĐẦU & CÂU HỎI GẠN LỌC",
    "description": "Kính chào Anh/Chị và các bạn Sinh viên! Vui lòng trả lời câu hỏi gạn lọc trước khi tiếp tục.",
    "questions": [{
        "id": "q_filter",
        "googleId": item0[4][0][0],
        "text": item0[1],
        "required": True,
        "type": "single",
        "options": [o[0] for o in item0[4][0][1]],
        "branching": {"Có": "sec2", "Không": "end"},
    }],
})

# 2. 35 biến quan sát Likert
grid_factors = [
    ("SE", "Khả năng thể hiện bản thân (Self-Expression - SE)", 2),
    ("SP", "Nhận thức về bản thân (Self-Perception - SP)", 3),
    ("PS", "Kỹ năng cá nhân (Personal Skills - PS)", 4),
    ("SM", "Sử dụng mạng xã hội (Social Media Usage - SM)", 5),
    ("SI", "Tương tác xã hội (Social Interaction - SI)", 6),
    ("CO", "Cơ hội nghề nghiệp (Career Opportunities - CO) - Biến trung gian", 7),
    ("PBD", "Sự phát triển Thương hiệu cá nhân (Personal Brand Development - PBD) - Biến phụ thuộc", 8),
]

sec2_questions = []
for code, group_name, raw_idx in grid_factors:
    raw_item = raw_items[raw_idx]
    subs = raw_item[4]
    for sub_idx, sub in enumerate(subs, 1):
        row_text = sub[3][0] if len(sub) > 3 and sub[3] else raw_item[1]
        sec2_questions.append({
            "id": f"{code.lower()}{sub_idx}",
            "code": f"{code}{sub_idx}",
            "group": group_name,
            "factor": code,
            "googleId": sub[0],
            "text": row_text,
            "required": True,
            "type": "scale",
            "options": ["1", "2", "3", "4", "5"],
            "scaleLabels": out["scale"],
        })

out["sections"].append({
    "id": "sec2",
    "title": raw_items[1][1],
    "description": raw_items[1][2] or "",
    "questions": sec2_questions,
})

# 3. Nhân khẩu học
demo1 = raw_items[10]
demo2 = raw_items[11]
demo3 = raw_items[12]
demo4 = raw_items[13]

out["sections"].append({
    "id": "sec3",
    "title": raw_items[9][1],
    "description": raw_items[9][2] or "",
    "questions": [
        {
            "id": "demo_gender",
            "googleId": demo1[4][0][0],
            "text": demo1[1],
            "required": True,
            "type": "single",
            "options": ["Nam", "Nữ", "Khác"],
        },
        {
            "id": "demo_year",
            "googleId": demo2[4][0][0],
            "text": demo2[1],
            "required": True,
            "type": "single",
            "options": [o[0] for o in demo2[4][0][1]],
        },
        {
            "id": "demo_social",
            "googleId": demo3[4][0][0],
            "text": demo3[1],
            "required": True,
            "type": "multiple",
            "options": [o[0] for o in demo3[4][0][1]],
        },
        {
            "id": "demo_experience",
            "googleId": demo4[4][0][0],
            "text": demo4[1],
            "required": True,
            "type": "single",
            "options": [o[0] for o in demo4[4][0][1]],
        },
    ],
})

with open(os.path.join(here, "questions.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print("Saved questions.json successfully.")
