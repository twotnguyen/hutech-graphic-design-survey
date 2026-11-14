const survey = {
  "source": "https://docs.google.com/forms/d/e/1FAIpQLSdCEQxjoGleSijds0xkMTISCxu1AemPcSNKtPQMrobgKuvNeA/viewform?usp=send_form",
  "response_url": "https://docs.google.com/forms/d/e/1FAIpQLSdCEQxjoGleSijds0xkMTISCxu1AemPcSNKtPQMrobgKuvNeA/formResponse",
  "title": "CÁC NHÂN TỐ ẢNH HƯỜNG ĐẾN SỰ PHÁT TRIỂN THƯƠNG HIỆU CÁ NHÂN CỦA SINH VIÊN NGÀNH THIẾT KẾ ĐỒ HỌA TẠI TRƯỜNG ĐẠI HỌC CÔNG NGHỆ TP.HCM (HUTECH)",
  "description": "PHẦN 1: LỜI MỞ ĐẦU & CÂU HỎI GẠN LỌC\nKính chào Anh/Chị và các bạn Sinh viên!\n\nBảng khảo sát này được thực hiện nhằm thu thập dữ liệu sơ cấp cho đề tài luận văn thạc sĩ nghiên cứu về “Các nhân tố ảnh hưởng đến sự phát triển thương hiệu cá nhân của sinh viên ngành Thiết kế đồ họa tại HUTECH”.\n\nÝ kiến đóng góp khách quan của Anh/Chị và các bạn đóng vai trò vô cùng quan trọng đối với sự thành công của nghiên cứu. Mọi thông tin cung cấp đều được bảo mật tuyệt đối và chỉ sử dụng duy nhất cho mục đích phân tích học thuật.\n\n• Thời gian hoàn thành: Khoảng 4 – 6 phút.\n• Cách thức trả lời: Xin vui lòng chọn phương án phù hợp nhất với trải nghiệm thực tế của bạn.",
  "scale": [
    "Hoàn toàn không đồng ý",
    "Không đồng ý",
    "Trung lập / Bình thường",
    "Đồng ý",
    "Hoàn toàn đồng ý"
  ],
  "sections": [
    {
      "id": "sec1",
      "title": "PHẦN 1: LỜI MỞ ĐẦU & CÂU HỎI GẠN LỌC",
      "description": "Kính chào Anh/Chị và các bạn Sinh viên! Vui lòng trả lời câu hỏi gạn lọc trước khi tiếp tục.",
      "questions": [
        {
          "id": "q_filter",
          "googleId": 239030257,
          "text": "Bạn có đang là sinh viên chính quy ngành Thiết kế đồ họa tại Trường Đại học Công nghệ TP.HCM (HUTECH) không?",
          "required": true,
          "type": "single",
          "options": [
            "Có",
            "Không"
          ],
          "branching": {
            "Có": "sec2",
            "Không": "end"
          }
        }
      ]
    },
    {
      "id": "sec2",
      "title": "PHẦN 2: NỘI DUNG KHẢO SÁT CHÍNH (35 BIẾN QUAN SÁT)",
      "description": "Xin bạn vui lòng đánh giá mức độ đồng ý của bản thân đối với các phát biểu dưới đây theo Thang đo Likert 5 mức độ:\n\n• [1] = Hoàn toàn không đồng ý​\n• [2] = Không đồng ý​\n• [3] = Trung lập / Bình thường\n• [4] = Đồng ý​​​\n• [5] = Hoàn toàn đồng ý",
      "questions": [
        {
          "id": "se1",
          "code": "SE1",
          "group": "Khả năng thể hiện bản thân (Self-Expression - SE)",
          "factor": "SE",
          "googleId": 1356567028,
          "text": "Tôi thể hiện được phong cách sáng tạo riêng thông qua các sản phẩm thiết kế của mình.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "se2",
          "code": "SE2",
          "group": "Khả năng thể hiện bản thân (Self-Expression - SE)",
          "factor": "SE",
          "googleId": 2127287008,
          "text": "Tôi có thể truyền đạt rõ ràng ý tưởng và thông điệp thị giác trong từng đồ án thiết kế.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "se3",
          "code": "SE3",
          "group": "Khả năng thể hiện bản thân (Self-Expression - SE)",
          "factor": "SE",
          "googleId": 1316305961,
          "text": "Tôi biết cách làm nổi bật những thế mạnh thiết kế riêng biệt của bản thân với người khác.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "se4",
          "code": "SE4",
          "group": "Khả năng thể hiện bản thân (Self-Expression - SE)",
          "factor": "SE",
          "googleId": 1714614847,
          "text": "Tôi thể hiện được bản sắc nghệ thuật cá nhân thông qua việc thiết kế portfolio và cá nhân hóa sản phẩm.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "se5",
          "code": "SE5",
          "group": "Khả năng thể hiện bản thân (Self-Expression - SE)",
          "factor": "SE",
          "googleId": 1990047959,
          "text": "Tôi có khả năng tạo ra sự khác biệt trong cách giới thiệu hình ảnh bản thân với nhà tuyển dụng/khách hàng.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sp1",
          "code": "SP1",
          "group": "Nhận thức về bản thân (Self-Perception - SP)",
          "factor": "SP",
          "googleId": 826650548,
          "text": "Tôi hiểu rõ những thế mạnh chuyên môn của bản thân trong lĩnh vực thiết kế đồ họa.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sp2",
          "code": "SP2",
          "group": "Nhận thức về bản thân (Self-Perception - SP)",
          "factor": "SP",
          "googleId": 832519179,
          "text": "Tôi nhận biết rõ những kỹ năng thiết kế chuyên sâu mà bản thân cần tiếp tục cải thiện.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sp3",
          "code": "SP3",
          "group": "Nhận thức về bản thân (Self-Perception - SP)",
          "factor": "SP",
          "googleId": 1140889316,
          "text": "Tôi xác định được phong cách nghệ thuật hoặc ngách thiết kế chuyên sâu (2D, 3D, UI/UX, Branding...) phù hợp với bản thân.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sp4",
          "code": "SP4",
          "group": "Nhận thức về bản thân (Self-Perception - SP)",
          "factor": "SP",
          "googleId": 985253067,
          "text": "Tôi có định hướng mục tiêu nghề nghiệp rõ ràng trong ngành công nghiệp sáng tạo.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sp5",
          "code": "SP5",
          "group": "Nhận thức về bản thân (Self-Perception - SP)",
          "factor": "SP",
          "googleId": 1004317750,
          "text": "Tôi hiểu được giá trị khác biệt mà giải pháp thiết kế của tôi có thể mang lại cho dự án/doanh nghiệp",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "ps1",
          "code": "PS1",
          "group": "Kỹ năng cá nhân (Personal Skills - PS)",
          "factor": "PS",
          "googleId": 1421496169,
          "text": "Tôi thành thạo các công cụ thiết kế chuyên ngành: Adobe CC (Illustrator, Photoshop, InDesign, After Effects...), công cụ UI/UX (Figma) hoặc phần mềm 3D (Blender, C4D).",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "ps2",
          "code": "PS2",
          "group": "Kỹ năng cá nhân (Personal Skills - PS)",
          "factor": "PS",
          "googleId": 1539906568,
          "text": "Tôi có năng lực tư duy thị giác tốt (Typography, Layout/Editorial, Color Theory, Brand Identity, Storyboarding) để giải quyết các bài toán thiết kế.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "ps3",
          "code": "PS3",
          "group": "Kỹ năng cá nhân (Personal Skills - PS)",
          "factor": "PS",
          "googleId": 896413027,
          "text": "Tôi có khả năng thuyết trình và thuyết phục về ý tưởng thiết kế (design pitch) với khách hàng/đối tác.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "ps4",
          "code": "PS4",
          "group": "Kỹ năng cá nhân (Personal Skills - PS)",
          "factor": "PS",
          "googleId": 1002041288,
          "text": "Tôi có khả năng tiếp thu và chuyển hóa các phản hồi chuyên môn (feedback) để nâng cao chất lượng sản phẩm.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "ps5",
          "code": "PS5",
          "group": "Kỹ năng cá nhân (Personal Skills - PS)",
          "factor": "PS",
          "googleId": 1480973755,
          "text": "Tôi duy trì tinh thần kỷ luật nghề nghiệp tốt: quản lý thời gian hiệu quả, làm việc nhóm và luôn bám sát deadline.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sm1",
          "code": "SM1",
          "group": "Sử dụng mạng xã hội (Social Media Usage - SM)",
          "factor": "SM",
          "googleId": 1884677566,
          "text": "Tôi thường xuyên công bố các sản phẩm/dự án thiết kế trên các nền tảng sáng tạo chuyên ngành (Behance, Dribbble, ArtStation, Instagram, LinkedIn...).",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sm2",
          "code": "SM2",
          "group": "Sử dụng mạng xã hội (Social Media Usage - SM)",
          "factor": "SM",
          "googleId": 1817962770,
          "text": "Tôi chủ động lựa chọn nội dung đăng tải phù hợp với định vị thương hiệu cá nhân muốn xây dựng.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sm3",
          "code": "SM3",
          "group": "Sử dụng mạng xã hội (Social Media Usage - SM)",
          "factor": "SM",
          "googleId": 1996546987,
          "text": "Tôi duy trì tần suất cập nhật nhất quán các dự án và tiến trình sáng tạo (Work in progress - WIP) trên trang cá nhân.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sm4",
          "code": "SM4",
          "group": "Sử dụng mạng xã hội (Social Media Usage - SM)",
          "factor": "SM",
          "googleId": 1335051671,
          "text": "Tôi chủ động tối ưu hóa trang hồ sơ trực tuyến (Online Portfolio) để tạo ấn tượng chuyên nghiệp với người xem.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "sm5",
          "code": "SM5",
          "group": "Sử dụng mạng xã hội (Social Media Usage - SM)",
          "factor": "SM",
          "googleId": 1953953990,
          "text": "Tôi chủ động khai thác mạng xã hội để cập nhật các xu hướng thiết kế và công nghệ sáng tạo mới (AI, 3D Motion...).",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "si1",
          "code": "SI1",
          "group": "Tương tác xã hội (Social Interaction - SI)",
          "factor": "SI",
          "googleId": 1779518164,
          "text": "Tôi chủ động trao đổi và tham khảo ý kiến nhận xét chuyên môn từ giảng viên và bạn học trong quá trình làm đồ án.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "si2",
          "code": "SI2",
          "group": "Tương tác xã hội (Social Interaction - SI)",
          "factor": "SI",
          "googleId": 1038991375,
          "text": "Tôi tích cực thảo luận, chia sẻ kiến thức trong các cộng đồng và hội nhóm thiết kế chuyên nghiệp.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "si3",
          "code": "SI3",
          "group": "Tương tác xã hội (Social Interaction - SI)",
          "factor": "SI",
          "googleId": 1670624374,
          "text": "Tôi tích cực tham gia các cuộc thi thiết kế, triển lãm nghệ thuật hoặc workshop chuyên ngành.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "si4",
          "code": "SI4",
          "group": "Tương tác xã hội (Social Interaction - SI)",
          "factor": "SI",
          "googleId": 905695122,
          "text": "Tôi chủ động kết nối với các chuyên gia, nhân sự cấp cao (senior) và nhà tuyển dụng trong ngành thiết kế.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "si5",
          "code": "SI5",
          "group": "Tương tác xã hội (Social Interaction - SI)",
          "factor": "SI",
          "googleId": 786661766,
          "text": "Tôi duy trì tương tác thường xuyên với các mối quan hệ xã hội có thể hỗ trợ phát triển nghề nghiệp tương lai.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "co1",
          "code": "CO1",
          "group": "Cơ hội nghề nghiệp (Career Opportunities - CO) - Biến trung gian",
          "factor": "CO",
          "googleId": 626074977,
          "text": "Tôi có cơ hội tiếp cận cao với các vị trí thực tập tại các công ty/agency thiết kế uy tín.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "co2",
          "code": "CO2",
          "group": "Cơ hội nghề nghiệp (Career Opportunities - CO) - Biến trung gian",
          "factor": "CO",
          "googleId": 515303344,
          "text": "Tôi có nhiều cơ hội trực tiếp giới thiệu năng lực thiết kế với nhà tuyển dụng hoặc khách hàng tiềm năng.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "co3",
          "code": "CO3",
          "group": "Cơ hội nghề nghiệp (Career Opportunities - CO) - Biến trung gian",
          "factor": "CO",
          "googleId": 1471725805,
          "text": "Tôi dễ dàng tiếp cận và nhận các dự án thiết kế tự do (freelance) phù hợp với năng lực chuyên môn.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "co4",
          "code": "CO4",
          "group": "Cơ hội nghề nghiệp (Career Opportunities - CO) - Biến trung gian",
          "factor": "CO",
          "googleId": 454174262,
          "text": "Tôi nhận thấy bản thân có cơ hội mở rộng mạng lưới kết nối nghề nghiệp với các chuyên gia trong ngành.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "co5",
          "code": "CO5",
          "group": "Cơ hội nghề nghiệp (Career Opportunities - CO) - Biến trung gian",
          "factor": "CO",
          "googleId": 45136807,
          "text": "Tôi tin tưởng vào khả năng tiếp cận các cơ hội việc làm chất lượng đúng chuyên ngành sau khi tốt nghiệp.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "pbd1",
          "code": "PBD1",
          "group": "Sự phát triển Thương hiệu cá nhân (Personal Brand Development - PBD) - Biến phụ thuộc",
          "factor": "PBD",
          "googleId": 1047609921,
          "text": "Tôi đã định hình rõ ràng phong cách sáng tạo và dấu ấn cá nhân trong lĩnh vực thiết kế đồ họa.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "pbd2",
          "code": "PBD2",
          "group": "Sự phát triển Thương hiệu cá nhân (Personal Brand Development - PBD) - Biến phụ thuộc",
          "factor": "PBD",
          "googleId": 1042845055,
          "text": "Portfolio của tôi ngày càng thể hiện rõ nét năng lực chuyên môn và sự tiến bộ về bản sắc cá nhân.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "pbd3",
          "code": "PBD3",
          "group": "Sự phát triển Thương hiệu cá nhân (Personal Brand Development - PBD) - Biến phụ thuộc",
          "factor": "PBD",
          "googleId": 476843527,
          "text": "Tôi tự tin quảng bá thương hiệu cá nhân đến cộng đồng chuyên môn và doanh nghiệp.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "pbd4",
          "code": "PBD4",
          "group": "Sự phát triển Thương hiệu cá nhân (Personal Brand Development - PBD) - Biến phụ thuộc",
          "factor": "PBD",
          "googleId": 897122576,
          "text": "Hình ảnh nghề nghiệp của tôi được thể hiện nhất quán trên cả nền tảng số và ngoài thực tế.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        },
        {
          "id": "pbd5",
          "code": "PBD5",
          "group": "Sự phát triển Thương hiệu cá nhân (Personal Brand Development - PBD) - Biến phụ thuộc",
          "factor": "PBD",
          "googleId": 281664316,
          "text": "Mức độ nhận diện và uy tín cá nhân của tôi ngày càng gia tăng trong cộng đồng sinh viên và doanh nghiệp thiết kế.",
          "required": true,
          "type": "scale",
          "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "scaleLabels": [
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập / Bình thường",
            "Đồng ý",
            "Hoàn toàn đồng ý"
          ]
        }
      ]
    },
    {
      "id": "sec3",
      "title": "PHẦN 3: THÔNG TIN NHÂN KHẨU HỌC & ĐẶC ĐIỂM NGƯỜI THAM GIA",
      "description": "Xin bạn vui lòng cung cấp một số thông tin cá nhân dưới đây (Thông tin chỉ dùng cho thống kê mô tả cơ cấu mẫu): ",
      "questions": [
        {
          "id": "demo_gender",
          "googleId": 1611485146,
          "text": "1. Giới tính:",
          "required": true,
          "type": "single",
          "options": [
            "Nam",
            "Nữ",
            "Khác"
          ]
        },
        {
          "id": "demo_year",
          "googleId": 579068369,
          "text": "2. Khóa học / Năm học hiện tại tại HUTECH:",
          "required": true,
          "type": "single",
          "options": [
            "Năm 1",
            "Năm 2",
            "Năm 3",
            "Năm 4"
          ]
        },
        {
          "id": "demo_social",
          "googleId": 1152849830,
          "text": "3. Kênh mạng xã hội chuyên ngành sử dụng chính để hiển thị sản phẩm (Có thể chọn nhiều phương án):",
          "required": true,
          "type": "multiple",
          "options": [
            "Behance",
            "Dribbble / ArtStation",
            "Instagram",
            "LinkedIn",
            "Facebook / TikTok / Khác"
          ]
        },
        {
          "id": "demo_experience",
          "googleId": 921031272,
          "text": "4. Kinh nghiệm làm việc / Thực tế hiện tại:",
          "required": true,
          "type": "single",
          "options": [
            "Chưa từng làm dự án thực tế (chỉ mới làm bài tập/đồ án trường)",
            "Đã và đang nhận các dự án thiết kế tự do (Freelance)",
            "Đã/Đang thực tập (Internship) tại công ty/agency thiết kế",
            "Đã làm việc bán thời gian / chính thức (Part-time / Full-time) đúng chuyên ngành"
          ]
        }
      ]
    }
  ]
};
