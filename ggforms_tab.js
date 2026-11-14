// ggforms_tab.js - Render Google Forms native-style response charts
(function () {
  const GF_PIE_COLORS = ['#4285f4', '#db4437', '#f4b400', '#0f9d58', '#aa46bb'];
  const GF_BAR_COLORS = {
    '1': '#3366cc',
    '2': '#dc3912',
    '3': '#ff9900',
    '4': '#109618',
    '5': '#990099',
  };

  const percentFormat = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 });
  const countFormat = new Intl.NumberFormat('vi-VN');

  function showToast(msg) {
    const existing = document.querySelector('.gf-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'gf-toast';
    toast.textContent = msg;
    document.body.append(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  function copySvgChart(svgElement) {
    try {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      navigator.clipboard.writeText(svgString).then(() => {
        showToast('✓ Đã sao chép mã biểu đồ (SVG) vào khay nhớ tạm');
      }).catch(() => {
        showToast('✓ Đã sao chép biểu đồ');
      });
    } catch (e) {
      showToast('✓ Đã sao chép biểu đồ');
    }
  }

  function svgNode(tag, attrs = {}, text = '') {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (text) node.textContent = text;
    return node;
  }

  // 1. Render Google Forms Pie Chart
  function renderGfPieChart(dataEntries, total) {
    const layout = document.createElement('div');
    layout.className = 'gf-pie-layout';

    const svg = svgNode('svg', {
      viewBox: '0 0 280 280',
      class: 'gf-pie-chart',
      'aria-hidden': 'true',
    });

    const legend = document.createElement('div');
    legend.className = 'gf-pie-legend';

    let angle = -Math.PI / 2;
    const cx = 140;
    const cy = 140;
    const r = 120;

    dataEntries.forEach(([label, count], i) => {
      if (!count || !total) return;
      const sweep = (count / total) * 2 * Math.PI;
      const end = angle + sweep;
      const color = GF_PIE_COLORS[i % GF_PIE_COLORS.length];

      const pt = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const startPt = pt(angle);
      const endPt = pt(end);

      let shape;
      if (count === total) {
        shape = svgNode('circle', { cx, cy, r, fill: color });
      } else {
        const largeArc = sweep > Math.PI ? 1 : 0;
        shape = svgNode('path', {
          d: `M${cx},${cy} L${startPt[0]},${startPt[1]} A${r},${r} 0 ${largeArc},1 ${endPt[0]},${endPt[1]} Z`,
          fill: color,
          stroke: '#ffffff',
          'stroke-width': '2',
        });
      }

      const pct = (count / total) * 100;
      const title = svgNode('title', {}, `${label}: ${countFormat.format(count)} (${percentFormat.format(pct)}%)`);
      shape.append(title);
      svg.append(shape);

      // Percentage label on slice if >= 6%
      if (pct >= 6) {
        const midAngle = angle + sweep / 2;
        const textRadius = r * 0.65;
        const tx = cx + textRadius * Math.cos(midAngle);
        const ty = cy + textRadius * Math.sin(midAngle);
        const textNode = svgNode('text', {
          x: tx,
          y: ty,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          fill: '#ffffff',
          'font-size': '13px',
          'font-weight': '600',
          'font-family': 'Roboto, Arial, sans-serif',
        }, `${percentFormat.format(pct)}%`);
        svg.append(textNode);
      }

      // Legend Item
      const legItem = document.createElement('div');
      legItem.className = 'gf-legend-item';
      legItem.innerHTML = `
        <span class="gf-legend-dot" style="background: ${color};"></span>
        <span>${label}</span>
      `;
      legend.append(legItem);

      angle = end;
    });

    layout.append(svg, legend);
    return { layout, svg };
  }

  // Interactive Google Forms Tooltip
  let tooltipEl = null;
  let tooltipArrow = null;
  let tooltipTitle = null;
  let tooltipVal = null;

  function initTooltip() {
    if (tooltipEl) return;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'gf-bar-tooltip';

    tooltipTitle = document.createElement('div');
    tooltipTitle.className = 'gf-bar-tooltip-title';

    tooltipVal = document.createElement('div');
    tooltipVal.className = 'gf-bar-tooltip-val';

    tooltipArrow = document.createElement('div');
    tooltipArrow.className = 'gf-tooltip-arrow';

    tooltipEl.append(tooltipTitle, tooltipVal, tooltipArrow);
    document.body.append(tooltipEl);
  }

  function showBarTooltip(barEl, questionText, score, count, pct) {
    initTooltip();
    tooltipTitle.textContent = questionText;
    tooltipVal.innerHTML = `${score}: ${count} (${pct}%)`;

    tooltipEl.className = 'gf-bar-tooltip visible arrow-bottom';

    const bRect = barEl.getBoundingClientRect();
    const barCenterX = bRect.left + bRect.width / 2 + window.scrollX;
    const barTopY = bRect.top + window.scrollY;

    const tw = tooltipEl.offsetWidth;
    const th = tooltipEl.offsetHeight;

    let left = barCenterX - tw / 2;
    const minLeft = window.scrollX + 12;
    const maxLeft = window.scrollX + document.documentElement.clientWidth - tw - 12;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    let top = barTopY - th - 12;
    let isFlipped = false;

    if (top < window.scrollY + 10) {
      top = barTopY + bRect.height + 12;
      isFlipped = true;
    }

    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;

    if (isFlipped) {
      tooltipEl.className = 'gf-bar-tooltip visible arrow-top';
    } else {
      tooltipEl.className = 'gf-bar-tooltip visible arrow-bottom';
    }

    const arrowX = Math.max(12, Math.min(tw - 12, barCenterX - left));
    tooltipArrow.style.left = `${arrowX}px`;
  }

  function hideBarTooltip() {
    if (tooltipEl) {
      tooltipEl.classList.remove('visible');
    }
  }

  // 2. Render Google Forms Grouped Column Chart (5 sub-questions x 5 bars)
  function renderGfGroupedColumnChart(subQuestions, maxScaleValue = 150) {
    const width = 760;
    const height = 300;
    const padLeft = 45;
    const padRight = 20;
    const padTop = 45;
    const padBottom = 75;

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const svg = svgNode('svg', {
      viewBox: `0 0 ${width} ${height}`,
      class: 'gf-chart-svg',
    });

    // Legend on top
    const legendG = svgNode('g', { transform: `translate(${padLeft}, 18)` });
    ['1', '2', '3', '4', '5'].forEach((val, i) => {
      const itemG = svgNode('g', { transform: `translate(${i * 60}, 0)` });
      const rect = svgNode('rect', {
        x: 0,
        y: 0,
        width: 14,
        height: 14,
        fill: GF_BAR_COLORS[val],
        rx: 1,
      });
      const text = svgNode('text', {
        x: 20,
        y: 11,
        'font-size': '13px',
        fill: '#3c4043',
        'font-family': 'Roboto, Arial, sans-serif',
      }, val);
      itemG.append(rect, text);
      legendG.append(itemG);
    });
    svg.append(legendG);

    // Y Axis Grid lines and labels
    // Step ticks: 0, 50, 100, 150
    const ticks = [0, 50, 100, 150];
    ticks.forEach((tickVal) => {
      const y = padTop + chartH - (tickVal / maxScaleValue) * chartH;
      // Grid line
      const line = svgNode('line', {
        x1: padLeft,
        y1: y,
        x2: width - padRight,
        y2: y,
        stroke: tickVal === 0 ? '#5f6368' : '#e0e0e0',
        'stroke-width': tickVal === 0 ? '1.5' : '1',
      });
      svg.append(line);

      // Y Label
      const yLabel = svgNode('text', {
        x: padLeft - 10,
        y: y + 4,
        'text-anchor': 'end',
        'font-size': '12px',
        fill: '#5f6368',
        'font-family': 'Roboto, Arial, sans-serif',
      }, String(tickVal));
      svg.append(yLabel);
    });

    // 5 Clusters of 5 bars
    const clusterCount = subQuestions.length;
    const clusterWidth = chartW / clusterCount;
    const barWidth = 14;
    const barGap = 2;
    const groupBarsWidth = 5 * barWidth + 4 * barGap; // 78px

    subQuestions.forEach((qData, clusterIdx) => {
      const clusterCenterX = padLeft + clusterIdx * clusterWidth + clusterWidth / 2;
      const startX = clusterCenterX - groupBarsWidth / 2;

      // Draw 5 bars
      const qTotal = Object.values(qData.counts).reduce((a, b) => a + b, 0) || 309;

      ['1', '2', '3', '4', '5'].forEach((score, barIdx) => {
        const count = qData.counts[score] || 0;
        const barH = (count / maxScaleValue) * chartH;
        const x = startX + barIdx * (barWidth + barGap);
        const y = padTop + chartH - barH;

        const rect = svgNode('rect', {
          x,
          y,
          width: barWidth,
          height: Math.max(barH, 1),
          fill: GF_BAR_COLORS[score],
          class: 'gf-bar-rect',
        });
        const pct = ((count / qTotal) * 100).toFixed(1).replace('.', ',');

        rect.addEventListener('mouseenter', () => {
          showBarTooltip(rect, qData.text, score, count, pct);
        });
        rect.addEventListener('mouseleave', () => {
          hideBarTooltip();
        });

        svg.append(rect);
      });

      // Truncate text for label below axis: e.g. "Tôi thể hiện..."
      let shortLabel = qData.text.replace(/^Tôi\s+/i, '').trim();
      if (shortLabel.length > 14) shortLabel = shortLabel.substring(0, 14) + '...';
      shortLabel = 'Tôi ' + shortLabel;

      const labelG = svgNode('g', {
        transform: `translate(${clusterCenterX - 10}, ${padTop + chartH + 18}) rotate(-26)`,
      });
      const xLabel = svgNode('text', {
        x: 0,
        y: 0,
        'text-anchor': 'end',
        'font-size': '12px',
        fill: '#3c4043',
        'font-family': 'Roboto, Arial, sans-serif',
      }, shortLabel);
      xLabel.append(svgNode('title', {}, qData.text));
      labelG.append(xLabel);
      svg.append(labelG);
    });

    return svg;
  }

  // 3. Render Google Forms Horizontal Bar Chart (Question 3 - Social media)
  function renderGfHorizontalBarChart(socialData, validTotal = 309) {
    const width = 720;
    const entries = Object.entries(socialData);
    const rowHeight = 44;
    const padTop = 25;
    const padBottom = 40;
    const padLeft = 190;
    const padRight = 50;

    const chartW = width - padLeft - padRight;
    const chartH = entries.length * rowHeight;
    const height = chartH + padTop + padBottom;

    const maxVal = 250; // ticks: 0, 50, 100, 150, 200, 250

    const svg = svgNode('svg', {
      viewBox: `0 0 ${width} ${height}`,
      class: 'gf-chart-svg',
    });

    // Vertical grid lines
    const ticks = [0, 50, 100, 150, 200, 250];
    ticks.forEach((tickVal) => {
      const x = padLeft + (tickVal / maxVal) * chartW;
      const line = svgNode('line', {
        x1: x,
        y1: padTop,
        x2: x,
        y2: padTop + chartH,
        stroke: '#e0e0e0',
        'stroke-width': '1',
      });
      svg.append(line);

      const label = svgNode('text', {
        x,
        y: padTop + chartH + 20,
        'text-anchor': 'middle',
        'font-size': '12px',
        fill: '#5f6368',
        'font-family': 'Roboto, Arial, sans-serif',
      }, String(tickVal));
      svg.append(label);
    });

    // Y Axis baseline
    svg.append(svgNode('line', {
      x1: padLeft,
      y1: padTop,
      x2: padLeft,
      y2: padTop + chartH,
      stroke: '#5f6368',
      'stroke-width': '1.5',
    }));

    // Rows
    entries.forEach(([name, count], i) => {
      const y = padTop + i * rowHeight + 10;
      const barH = 22;
      const barW = (count / maxVal) * chartW;
      const pct = ((count / validTotal) * 100).toFixed(1).replace('.', ',');

      // Label on the left
      const textLabel = svgNode('text', {
        x: padLeft - 14,
        y: y + barH / 2 + 4,
        'text-anchor': 'end',
        'font-size': '13px',
        fill: '#202124',
        'font-family': 'Roboto, Arial, sans-serif',
      }, name);
      svg.append(textLabel);

      // Horizontal Bar
      const rect = svgNode('rect', {
        x: padLeft,
        y,
        width: Math.max(barW, 2),
        height: barH,
        fill: '#5b4bf3',
      });
      rect.append(svgNode('title', {}, `${name}: ${count} (${pct}%)`));
      svg.append(rect);

      // Value label on the right of bar: "- count (pct%)"
      const valLabel = svgNode('text', {
        x: padLeft + barW + 8,
        y: y + barH / 2 + 4,
        'text-anchor': 'start',
        'font-size': '13px',
        fill: '#202124',
        'font-family': 'Roboto, Arial, sans-serif',
      }, `— ${count} (${pct}%)`);
      svg.append(valLabel);
    });

    return svg;
  }

  // Create Standard Question Card Shell
  function createCard(title, countText) {
    const card = document.createElement('div');
    card.className = 'gf-card';

    const header = document.createElement('div');
    header.className = 'gf-header';

    const titleArea = document.createElement('div');
    titleArea.className = 'gf-title-area';

    const h3 = document.createElement('h3');
    h3.className = 'gf-title';
    h3.textContent = title;
    titleArea.append(h3);

    if (countText) {
      const p = document.createElement('p');
      p.className = 'gf-count';
      p.textContent = countText;
      titleArea.append(p);
    }

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'gf-copy-btn';
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Sao chép biểu đồ
    `;

    header.append(titleArea, copyBtn);
    card.append(header);

    return { card, copyBtn };
  }

  // Main Builder
  function buildGfTab() {
    const container = document.querySelector('#ggforms-content');
    if (!container) return;
    container.innerHTML = '';

    const data = typeof statsData !== 'undefined' ? statsData : (window.statsData || null);
    if (!data) {
      container.innerHTML = '<p style="color:red;">Chưa nạp được dữ liệu statsData.</p>';
      return;
    }

    const validN = data.validTotal || 309;
    const totalN = data.total || 372;

    const wrapper = document.createElement('div');
    wrapper.className = 'gf-container';

    // ── CARD 1: Question 1 (Gạn lọc) ──────────────────────────────────────────
    const q1Card = createCard(
      'Bạn có đang là sinh viên chính quy ngành Thiết kế đồ họa tại Trường Đại học Công nghệ TP.HCM (HUTECH) không?',
      `${countFormat.format(totalN)} câu trả lời`
    );
    const q1Pie = renderGfPieChart(Object.entries(data.filter), totalN);
    q1Card.card.append(q1Pie.layout);
    q1Card.copyBtn.addEventListener('click', () => copySvgChart(q1Pie.svg));
    wrapper.append(q1Card.card);

    // ── PURPLE BANNER: PHẦN 2 ────────────────────────────────────────────────
    const bannerPart2 = document.createElement('div');
    bannerPart2.className = 'gf-section-banner';
    bannerPart2.textContent = 'PHẦN 2: NỘI DUNG KHẢO SÁT CHÍNH (35 BIẾN QUAN SÁT)';
    wrapper.append(bannerPart2);

    // ── CARDS 2..8: 7 LIKERT FACTOR GROUPS ────────────────────────────────────
    const factorOrder = ['SE', 'SP', 'PS', 'SM', 'SI', 'CO', 'PBD'];
    factorOrder.forEach((fCode) => {
      const fInfo = data.factors[fCode];
      if (!fInfo) return;

      const fCard = createCard(fInfo.name, '');
      const subQs = fInfo.questions.map((qId) => data.questions[qId]);
      const columnSvg = renderGfGroupedColumnChart(subQs, 150);

      const scrollWrapper = document.createElement('div');
      scrollWrapper.className = 'gf-chart-scroll-wrapper';
      scrollWrapper.append(columnSvg);

      const scrollBar = document.createElement('div');
      scrollBar.className = 'gf-scrollbar-indicator';

      fCard.card.append(scrollWrapper, scrollBar);
      fCard.copyBtn.addEventListener('click', () => copySvgChart(columnSvg));
      wrapper.append(fCard.card);
    });

    // ── PURPLE BANNER: PHẦN 3 ────────────────────────────────────────────────
    const bannerPart3 = document.createElement('div');
    bannerPart3.className = 'gf-section-banner';
    bannerPart3.textContent = 'PHẦN 3: THÔNG TIN NHÂN KHẨU HỌC & ĐẶC ĐIỂM NGƯỜI THAM GIA';
    wrapper.append(bannerPart3);

    // ── CARD 9: 1. Giới tính ─────────────────────────────────────────────────
    const genderCard = createCard('1. Giới tính:', `${countFormat.format(validN)} câu trả lời`);
    const genderPie = renderGfPieChart(Object.entries(data.demographics.gender), validN);
    genderCard.card.append(genderPie.layout);
    genderCard.copyBtn.addEventListener('click', () => copySvgChart(genderPie.svg));
    wrapper.append(genderCard.card);

    // ── CARD 10: 2. Khóa học / Năm học ───────────────────────────────────────
    const yearCard = createCard('2. Khóa học / Năm học hiện tại tại HUTECH:', `${countFormat.format(validN)} câu trả lời`);
    const yearPie = renderGfPieChart(Object.entries(data.demographics.year), validN);
    yearCard.card.append(yearPie.layout);
    yearCard.copyBtn.addEventListener('click', () => copySvgChart(yearPie.svg));
    wrapper.append(yearCard.card);

    // ── CARD 11: 3. Kênh mạng xã hội (Horizontal bar chart) ───────────────────
    const socialCard = createCard(
      '3. Kênh mạng xã hội chuyên ngành sử dụng chính để hiển thị sản phẩm (Có thể chọn nhiều phương án):',
      `${countFormat.format(validN)} câu trả lời`
    );
    const socialSvg = renderGfHorizontalBarChart(data.demographics.social, validN);
    const socialScroll = document.createElement('div');
    socialScroll.className = 'gf-chart-scroll-wrapper';
    socialScroll.append(socialSvg);
    socialCard.card.append(socialScroll);
    socialCard.copyBtn.addEventListener('click', () => copySvgChart(socialSvg));
    wrapper.append(socialCard.card);

    // ── CARD 12: 4. Kinh nghiệm làm việc ─────────────────────────────────────
    const expCard = createCard('4. Kinh nghiệm làm việc / Thực tế hiện tại:', `${countFormat.format(validN)} câu trả lời`);
    const expPie = renderGfPieChart(Object.entries(data.demographics.experience), validN);
    expCard.card.append(expPie.layout);
    expCard.copyBtn.addEventListener('click', () => copySvgChart(expPie.svg));
    wrapper.append(expCard.card);

    // ── FOOTER PURPLE BANNER ─────────────────────────────────────────────────
    const footerBanner = document.createElement('div');
    footerBanner.className = 'gf-footer-banner';
    footerBanner.textContent = 'Xin chân thành cảm ơn Anh/Chị và các bạn Sinh viên đã dành thời gian quý báu hỗ trợ hoàn thành bảng khảo sát nghiên cứu này! Kính chúc bạn luôn dồi dào năng lượng sáng tạo và gặt hái nhiều thành công trong sự nghiệp!';
    wrapper.append(footerBanner);

    container.append(wrapper);
  }

  document.addEventListener('DOMContentLoaded', buildGfTab);
})();
