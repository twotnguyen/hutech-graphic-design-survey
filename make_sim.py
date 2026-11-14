"""Sinh dữ liệu mô phỏng dựa trên chỉ tiêu phân phối chính xác từ PHAN-BO-MONG-MUON.md.
Tạo:
- sim_responses.csv: Dữ liệu bảng 300 dòng (249 phiếu hợp lệ + 51 phiếu bị gạn lọc theo nhánh Form)
- demo_data.json: Dữ liệu thống kê tổng hợp phục vụ giao diện Web Dashboard
Chạy: python3 make_sim.py
"""
import csv
import json
import os
import random
import re
from datetime import datetime, timedelta

here = os.path.dirname(os.path.abspath(__file__))

# 1. Đọc questions.json
with open(os.path.join(here, "questions.json"), encoding="utf-8") as f:
    survey = json.load(f)

sec1, sec2, sec3 = survey["sections"]
screening_q = sec1["questions"][0]
likert_questions = sec2["questions"]
demo_questions = sec3["questions"]

# 2. Phân tích chi tiết từ PHAN-BO-MONG-MUON.md
dist_file = os.path.join(here, "PHAN-BO-MONG-MUON.md")
with open(dist_file, encoding="utf-8") as f:
    dist_text = f.read()

q_blocks = re.split(r"####\s+", dist_text)[1:]

parsed_distributions = {}
for b in q_blocks:
    lines = b.strip().split("\n")
    title_line = lines[0].strip()
    m_num = re.match(r"^(\d+)\.", title_line)
    if not m_num:
        continue
    q_num = int(m_num.group(1))

    opts = []
    for line in lines[1:]:
        m_opt = re.match(r"-\s+(.*?):\s*(\d+)\s*-\s*([0-9.]+)%", line.strip())
        if m_opt:
            opts.append({
                "label": m_opt.group(1).strip(),
                "count": int(m_opt.group(2)),
                "pct": float(m_opt.group(3)),
            })
    parsed_distributions[q_num] = {
        "title": title_line,
        "options": opts,
    }

# Lấy số lượng phiếu
q1_opts = {o["label"]: o["count"] for o in parsed_distributions[1]["options"]}
N_VALID = q1_opts.get("Có", 249)
N_FILTERED = q1_opts.get("Không", 51)
N_TOTAL = N_VALID + N_FILTERED

random.seed(20261114)

# 3. Chuẩn bị các cột dữ liệu theo đúng phân bố số lượng
columns_valid = {}

# Cột sàng lọc: toàn bộ 249 phiếu hợp lệ chọn 'Có'
columns_valid[screening_q["text"]] = ["Có"] * N_VALID

# 35 câu Likert (từ Q2 đến Q36)
for q_num in range(2, 37):
    q_info = likert_questions[q_num - 2]
    dist_info = parsed_distributions[q_num]
    # Sinh danh sách đúng số lượng từng mức 1, 2, 3, 4, 5
    cells = []
    for opt in dist_info["options"]:
        # opt['label'] có dạng '1 (Hoàn toàn không đồng ý)'
        score_val = opt["label"].split()[0]
        cells.extend([score_val] * opt["count"])

    assert len(cells) == N_VALID, f"Câu {q_num} có {len(cells)} cells, kỳ vọng {N_VALID}"
    # Xáo trộn thứ tự
    random.shuffle(cells)
    col_name = f"{q_info['code']}: {q_info['text']}"
    columns_valid[col_name] = cells

# Q37: Giới tính
gender_dist = parsed_distributions[37]["options"]
gender_cells = []
for opt in gender_dist:
    gender_cells.extend([opt["label"]] * opt["count"])
assert len(gender_cells) == N_VALID
random.shuffle(gender_cells)
columns_valid[demo_questions[0]["text"]] = gender_cells

# Q38: Khóa học
year_dist = parsed_distributions[38]["options"]
year_cells = []
for opt in year_dist:
    year_cells.extend([opt["label"]] * opt["count"])
assert len(year_cells) == N_VALID
random.shuffle(year_cells)
columns_valid[demo_questions[1]["text"]] = year_cells

# Q39: Mạng xã hội (Hộp kiểm)
social_dist = parsed_distributions[39]["options"]
# Gán xác suất chọn từng kênh dựa trên count / N_VALID
social_probs = {o["label"]: o["count"] / N_VALID for o in social_dist}
social_cells = []
for _ in range(N_VALID):
    chosen = [ch for ch, p in social_probs.items() if random.random() < p]
    if not chosen:
        chosen = ["Instagram"]
    social_cells.append(" | ".join(chosen))
columns_valid[demo_questions[2]["text"]] = social_cells

# Q40: Kinh nghiệm thực tế
exp_dist = parsed_distributions[40]["options"]
exp_cells = []
for opt in exp_dist:
    exp_cells.extend([opt["label"]] * opt["count"])
assert len(exp_cells) == N_VALID
random.shuffle(exp_cells)
columns_valid[demo_questions[3]["text"]] = exp_cells

# 4. Sinh dòng dữ liệu CSV (kèm Dấu thời gian tăng dần và 51 phiếu bị gạn lọc)
start_date = datetime(2026, 10, 15, 8, 0, 0)
time_stamps = sorted([
    start_date + timedelta(seconds=int(i * (18 * 86400 / N_TOTAL) + random.randint(-1200, 1200)))
    for i in range(N_TOTAL)
])

all_rows = []

# Đan xen ngẫu nhiên 51 phiếu bị gạn lọc vào 300 phiếu
filtered_indices = set(random.sample(range(N_TOTAL), N_FILTERED))

valid_idx = 0
all_headers = ["Dấu thời gian", screening_q["text"]] + [
    f"{q['code']}: {q['text']}" for q in likert_questions
] + [q["text"] for q in demo_questions]

for idx in range(N_TOTAL):
    stamp_str = time_stamps[idx].strftime("%d/%m/%Y %H:%M:%S")
    if idx in filtered_indices:
        # Phiếu gạn lọc: trả lời Không, các câu sau để trống (branching)
        row = {h: "" for h in all_headers}
        row["Dấu thời gian"] = stamp_str
        row[screening_q["text"]] = "Không"
    else:
        # Phiếu hợp lệ
        row = {"Dấu thời gian": stamp_str}
        for col_name in all_headers[1:]:
            row[col_name] = columns_valid[col_name][valid_idx]
        valid_idx += 1
    all_rows.append(row)

# Ghi file CSV
csv_path = os.path.join(here, "sim_responses.csv")
with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=all_headers)
    writer.writeheader()
    writer.writerows(all_rows)

# 5. Xây dựng demo_data.json chính xác theo PHAN-BO-MONG-MUON.md
stats = {
    "total": N_TOTAL,
    "validTotal": N_VALID,
    "filteredTotal": N_FILTERED,
    "lastUpdated": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
    "filter": {
        "Có": N_VALID,
        "Không": N_FILTERED,
    },
    "demographics": {
        "gender": {o["label"]: o["count"] for o in gender_dist},
        "year": {o["label"]: o["count"] for o in year_dist},
        "social": {o["label"]: o["count"] for o in social_dist},
        "experience": {o["label"]: o["count"] for o in exp_dist},
    },
    "factors": {},
    "questions": {},
}

for q_num in range(2, 37):
    q_info = likert_questions[q_num - 2]
    f_code = q_info["factor"]
    if f_code not in stats["factors"]:
        stats["factors"][f_code] = {
            "name": q_info["group"],
            "questions": [],
            "sum_mean": 0,
        }

    opts_map = {o["label"].split()[0]: o["count"] for o in parsed_distributions[q_num]["options"]}
    pct_map = {o["label"].split()[0]: o["pct"] for o in parsed_distributions[q_num]["options"]}

    total_score = sum(int(sc) * cnt for sc, cnt in opts_map.items())
    mean_val = round(total_score / N_VALID, 2)

    stats["questions"][q_info["id"]] = {
        "id": q_info["id"],
        "code": q_info["code"],
        "factor": f_code,
        "text": q_info["text"],
        "counts": opts_map,
        "percentages": pct_map,
        "mean": mean_val,
    }
    stats["factors"][f_code]["questions"].append(q_info["id"])
    stats["factors"][f_code]["sum_mean"] += mean_val

for f_code, f_info in stats["factors"].items():
    f_info["mean"] = round(f_info["sum_mean"] / len(f_info["questions"]), 2)

json_path = os.path.join(here, "demo_data.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(stats, f, ensure_ascii=False, indent=2)

print(f"✅ Đã tạo thành công dữ liệu từ PHAN-BO-MONG-MUON.md:")
print(f"- Tổng số mẫu khảo sát: {N_TOTAL} (Hợp lệ: {N_VALID}, Bị gạn lọc: {N_FILTERED})")
print(f"- File CSV: {csv_path} ({len(all_rows)} dòng dữ liệu)")
print(f"- File JSON web: {json_path}")
