"""Tạo 312 lượt khảo sát cần gửi thêm để kết hợp với 60 lượt có sẵn đạt đúng 372 lượt và đúng 100% tỷ lệ mong muốn.

Tạo ra:
- sim_responses.csv: Chứa ĐÚNG 312 lượt cần gửi thêm (dùng với submit_sim.py để gửi lên Google Form)
- tong_hop_372_mau.csv: File gộp 60 lượt cũ + 312 lượt mới (đủ 372 mẫu hoàn chỉnh)
- demo_data.json: Cập nhật web dashboard
"""
import csv
import glob
import json
import os
import random
import re
from collections import Counter
from datetime import datetime, timedelta

here = os.path.dirname(os.path.abspath(__file__))

# 1. Đọc questions.json
with open(os.path.join(here, "questions.json"), encoding="utf-8") as f:
    survey = json.load(f)

sec1, sec2, sec3 = survey["sections"]
screening_q = sec1["questions"][0]
likert_questions = sec2["questions"]
demo_questions = sec3["questions"]

# 2. Đọc file khảo sát hiện có (60 dòng)
existing_files = glob.glob(os.path.join(here, "*Câu trả lời*.csv")) + glob.glob(
    os.path.join(here, "*Câu trả lời*.csv")
)
assert existing_files, "Không tìm thấy file câu trả lời gốc."
orig_rows = list(csv.reader(open(existing_files[0], encoding="utf-8-sig")))
orig_headers, orig_data = orig_rows[0], orig_rows[1:]
orig_valid = [r for r in orig_data if r[1] == "Có"]

N_EXISTING = len(orig_data)
N_EXISTING_VALID = len(orig_valid)
N_EXISTING_FILTERED = N_EXISTING - N_EXISTING_VALID

# 3. Đọc chỉ tiêu từ PHAN-BO-MONG-MUON.md
with open(os.path.join(here, "PHAN-BO-MONG-MUON.md"), encoding="utf-8") as f:
    dist_text = f.read()

q_blocks = re.split(r"####\s+", dist_text)[1:]
targets = {}
for b in q_blocks:
    lines = b.strip().split("\n")
    m_num = re.match(r"^(\d+)\.", lines[0].strip())
    if not m_num:
        continue
    q_num = int(m_num.group(1))
    opts = {}
    for l in lines[1:]:
        m_opt = re.match(r"-\s+(.*?):\s*(\d+)\s*-\s*([0-9.]+)%", l.strip())
        if m_opt:
            opts[m_opt.group(1).strip()] = (
                int(m_opt.group(2)),
                float(m_opt.group(3)),
            )
    targets[q_num] = (lines[0].strip(), opts)

N_TARGET_TOTAL = 372
N_TARGET_VALID = targets[1][1]["Có"][0]  # 309
N_TARGET_FILTERED = targets[1][1]["Không"][0]  # 63

N_NEED_TOTAL = N_TARGET_TOTAL - N_EXISTING  # 312
N_NEED_VALID = N_TARGET_VALID - N_EXISTING_VALID  # 252
N_NEED_FILTERED = N_TARGET_FILTERED - N_EXISTING_FILTERED  # 60

assert N_NEED_VALID + N_NEED_FILTERED == N_NEED_TOTAL == 312

random.seed(20261114)

# 4. Tính toán số lượng cần thêm cho 252 lượt hợp lệ
add_columns = {}
add_columns[screening_q["text"]] = ["Có"] * N_NEED_VALID

# 35 câu Likert (Q2 đến Q36)
for q_num in range(2, 37):
    q_info = likert_questions[q_num - 2]
    title, opts = targets[q_num]
    cur_counts = Counter(r[q_num] for r in orig_valid)
    cells = []
    for opt_label, (tgt_cnt, _) in opts.items():
        score_val = opt_label.split()[0]
        cur = cur_counts.get(score_val, 0)
        needed = tgt_cnt - cur
        assert (
            needed >= 0
        ), f"Câu {q_num} mức {score_val} đã vượt chỉ tiêu ({cur} > {tgt_cnt})"
        cells.extend([score_val] * needed)

    assert (
        len(cells) == N_NEED_VALID
    ), f"Câu {q_num} cần {N_NEED_VALID} ô, nhưng tính ra {len(cells)}"
    random.shuffle(cells)
    add_columns[f"{q_info['code']}: {q_info['text']}"] = cells

# Q37: Giới tính
cur_gender = Counter(r[37] for r in orig_valid)
gender_cells = []
for opt, (tgt_cnt, _) in targets[37][1].items():
    needed = tgt_cnt - cur_gender.get(opt, 0)
    gender_cells.extend([opt] * needed)
assert len(gender_cells) == N_NEED_VALID
random.shuffle(gender_cells)
add_columns[demo_questions[0]["text"]] = gender_cells

# Q38: Khóa học
cur_year = Counter(r[38] for r in orig_valid)
year_cells = []
for opt, (tgt_cnt, _) in targets[38][1].items():
    needed = tgt_cnt - cur_year.get(opt, 0)
    year_cells.extend([opt] * needed)
assert len(year_cells) == N_NEED_VALID
random.shuffle(year_cells)
add_columns[demo_questions[1]["text"]] = year_cells

# Q39: Mạng xã hội (Hộp kiểm)
social_opts = list(targets[39][1].keys())
cur_social = Counter()
for r in orig_valid:
    for opt in social_opts:
        if opt in r[39]:
            cur_social[opt] += 1
social_needed = {
    opt: targets[39][1][opt][0] - cur_social[opt] for opt in social_opts
}
social_probs = {opt: social_needed[opt] / N_NEED_VALID for opt in social_opts}

social_cells = []
for _ in range(N_NEED_VALID):
    chosen = [opt for opt in social_opts if random.random() < social_probs[opt]]
    if not chosen:
        chosen = ["Instagram"]
    social_cells.append(" | ".join(chosen))
add_columns[demo_questions[2]["text"]] = social_cells

# Q40: Kinh nghiệm thực tế
cur_exp = Counter(r[40] for r in orig_valid)
exp_cells = []
for opt, (tgt_cnt, _) in targets[40][1].items():
    needed = tgt_cnt - cur_exp.get(opt, 0)
    exp_cells.extend([opt] * needed)
assert len(exp_cells) == N_NEED_VALID
random.shuffle(exp_cells)
add_columns[demo_questions[3]["text"]] = exp_cells

# 5. Tạo 312 dòng dữ liệu cần gửi thêm
last_orig_date = datetime.strptime(
    orig_data[-1][0].strip(), "%d/%m/%Y %H:%M:%S"
)
next_start = last_orig_date + timedelta(minutes=random.randint(15, 45))

new_timestamps = sorted([
    next_start
    + timedelta(
        seconds=int(i * (14 * 86400 / N_NEED_TOTAL) + random.randint(-900, 900))
    )
    for i in range(N_NEED_TOTAL)
])

filtered_indices = set(random.sample(range(N_NEED_TOTAL), N_NEED_FILTERED))
all_headers = ["Dấu thời gian", screening_q["text"]] + [
    f"{q['code']}: {q['text']}" for q in likert_questions
] + [q["text"] for q in demo_questions]

additional_rows = []
valid_idx = 0

for i in range(N_NEED_TOTAL):
    stamp_str = new_timestamps[i].strftime("%d/%m/%Y %H:%M:%S")
    if i in filtered_indices:
        # Phiếu dừng ở câu 1
        r = {h: "" for h in all_headers}
        r["Dấu thời gian"] = stamp_str
        r[screening_q["text"]] = "Không"
    else:
        r = {"Dấu thời gian": stamp_str}
        for h in all_headers[1:]:
            r[h] = add_columns[h][valid_idx]
        valid_idx += 1
    additional_rows.append(r)

assert len(additional_rows) == 312

# 6. Ghi sim_responses.csv (312 dòng để submit_sim.py gửi tiếp)
csv_sim_path = os.path.join(here, "sim_responses.csv")
with open(csv_sim_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=all_headers)
    writer.writeheader()
    writer.writerows(additional_rows)

# 7. Ghi tong_hop_372_mau.csv (gộp 60 dòng cũ + 312 dòng mới)
combined_rows = []
for r in orig_data:
    combined_rows.append({h: val for h, val in zip(all_headers, r)})
combined_rows.extend(additional_rows)
assert len(combined_rows) == 372

csv_comb_path = os.path.join(here, "tong_hop_372_mau.csv")
with open(csv_comb_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=all_headers)
    writer.writeheader()
    writer.writerows(combined_rows)

# 8. Cập nhật thống kê vào demo_data.json và stats_data.js
valid_combined = [r for r in combined_rows if r[screening_q["text"]] == "Có"]
stats = {
    "total": len(combined_rows),
    "validTotal": len(valid_combined),
    "filteredTotal": len(combined_rows) - len(valid_combined),
    "lastUpdated": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
    "filter": {
        "Có": len(valid_combined),
        "Không": len(combined_rows) - len(valid_combined),
    },
    "demographics": {
        "gender": dict(Counter(r[demo_questions[0]["text"]] for r in valid_combined)),
        "year": dict(Counter(r[demo_questions[1]["text"]] for r in valid_combined)),
        "social": {
            opt: sum(1 for r in valid_combined if opt in r[demo_questions[2]["text"]])
            for opt in social_opts
        },
        "experience": dict(Counter(r[demo_questions[3]["text"]] for r in valid_combined)),
    },
    "factors": {},
    "questions": {},
}

for q in likert_questions:
    col = f"{q['code']}: {q['text']}"
    f_code = q["factor"]
    if f_code not in stats["factors"]:
        stats["factors"][f_code] = {"name": q["group"], "questions": [], "sum_mean": 0}
    counts = dict(Counter(r[col] for r in valid_combined))
    counts_clean = {str(i): counts.get(str(i), 0) for i in range(1, 6)}
    score_sum = sum(i * counts_clean[str(i)] for i in range(1, 6))
    mean_val = round(score_sum / len(valid_combined), 2)
    pct_clean = {str(i): round(counts_clean[str(i)] * 100 / len(valid_combined), 1) for i in range(1, 6)}
    stats["questions"][q["id"]] = {
        "id": q["id"], "code": q["code"], "factor": f_code, "text": q["text"],
        "counts": counts_clean, "percentages": pct_clean, "mean": mean_val
    }
    stats["factors"][f_code]["questions"].append(q["id"])
    stats["factors"][f_code]["sum_mean"] += mean_val

for f_code, f_info in stats["factors"].items():
    f_info["mean"] = round(f_info["sum_mean"] / len(f_info["questions"]), 2)

json_path = os.path.join(here, "demo_data.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(stats, f, ensure_ascii=False, indent=2)

js_data_path = os.path.join(here, "stats_data.js")
with open(js_data_path, "w", encoding="utf-8") as f:
    f.write("const statsData = " + json.dumps(stats, ensure_ascii=False, indent=2) + ";\n")

print(f"✅ Hoàn tất tính toán:")
print(f"- File khảo sát gốc: {N_EXISTING} dòng (57 Có + 3 Không)")
print(
    f"- Cần gửi thêm: {N_NEED_TOTAL} lượt ({N_NEED_VALID} Có + {N_NEED_FILTERED} Không) -> đã lưu vào {csv_sim_path}"
)
print(f"- Tổng hợp sau khi gửi đủ: {len(combined_rows)} mẫu -> đã lưu vào {csv_comb_path}")
