"""Gửi các dòng trong sim_responses.csv lên Google Form.
Dùng:
  python3 submit_sim.py [URL] [--start N] [--count N] [--send]

- Không có --send: Chạy thử (dry run), in payload ra màn hình.
- Có --send: Gửi thật lên Google Form, ghi log vào submit_log.jsonl để không gửi trùng lặp.
"""
import argparse
import csv
import json
import os
import random
import sys
import time
import requests
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(here, "..", "googleform-autofill-and-submit"))
import form  # noqa: E402
import main as gf  # noqa: E402

DEFAULT_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdCEQxjoGleSijds0xkMTISCxu1AemPcSNKtPQMrobgKuvNeA/viewform?usp=send_form"

ap = argparse.ArgumentParser()
ap.add_argument("url", nargs="?", default=DEFAULT_URL, help="Google Form URL")
ap.add_argument("--start", type=int, default=0, help="Dòng bắt đầu (0-based)")
ap.add_argument("--count", type=int, default=1, help="Số dòng cần gửi")
ap.add_argument("--send", action="store_true", help="Gửi thật lên máy chủ (mặc định chỉ in thử)")
a = ap.parse_args()

pages, next_pages, email = form.parse_form_entries(a.url)
assert not email, "Form yêu cầu email"
entries = [e for p in pages for e in p]

csv_file = os.path.join(here, "sim_responses.csv")
assert os.path.exists(csv_file), f"Chưa có file {csv_file}, hãy chạy python3 make_sim.py trước."

rows = list(csv.reader(open(csv_file, encoding="utf-8-sig")))
header, data = rows[0], rows[1:]

# Đọc tiến trình đã gửi từ submit_log.jsonl
log_path = os.path.join(here, "submit_log.jsonl")
done = set()
if os.path.exists(log_path):
    for line in open(log_path, encoding="utf-8"):
        if line.strip():
            done.add(json.loads(line)["row"])
n = 0
with requests.Session() as session:
    for idx in range(a.start, len(data)):
        if n >= a.count:
            break
        if idx in done:
            continue

        row_values = data[idx][1:]  # Bỏ cột Dấu thời gian
        body = {}
        for e, v in zip(entries, row_values):
            if not v:
                continue
            # Checkbox nhiều lựa chọn ngăn cách bằng ' | '
            val = v.split(" | ") if e["type"] == 4 else v
            body[f"entry.{e['id']}"] = val

        # Xử lý rẽ nhánh: 'Không' chuyển thẳng mục 3 (lời cảm ơn), 'Có' đi qua đầy đủ các trang
        body["pageHistory"] = "0,3" if row_values[0] == "Không" else "0,1,2,3"

        if not a.send:
            print(f"[DRY-RUN] Dòng {idx} ({row_values[0]}): {json.dumps(body, ensure_ascii=False)[:250]}...")
        else:
            gf.submit(a.url, body, session=session)
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"row": idx, "ts": time.strftime("%F %T")}) + "\n")
                f.flush()
            print(f"[{n+1}/{a.count}] Đã gửi thành công dòng {idx} ({row_values[0]})", flush=True)
            time.sleep(random.uniform(0.4, 0.9))

        n += 1

print(f"Hoàn thành {n} lượt.")
