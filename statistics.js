// statistics.js - Render statistics dashboard with SVG charts
const chartColors = ['#005baa', '#f37021', '#10b981', '#6366f1', '#ec4899', '#8b5cf6'];
const percentFormat = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 });
const countFormat = new Intl.NumberFormat('vi-VN');

// Tab Management
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(selectedTab) {
  tabs.forEach((tab) => {
    const active = tab === selectedTab;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    const panelId = tab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (panel) panel.hidden = !active;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    let target = null;
    if (e.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (e.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length];
    if (e.key === 'Home') target = tabs[0];
    if (e.key === 'End') target = tabs[tabs.length - 1];
    if (target) {
      e.preventDefault();
      selectTab(target);
      target.focus();
    }
  });
});

// SVG Element Helper
function svgNode(tag, attrs = {}, text = '') {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  if (text) node.textContent = text;
  return node;
}

// Generate Pie Chart SVG
function createPieChart(dataEntries, total) {
  const svg = svgNode('svg', { viewBox: '0 0 160 160', class: 'pie-chart', 'aria-hidden': 'true' });
  let angle = -Math.PI / 2;

  dataEntries.forEach(([label, count], i) => {
    if (!count || !total) return;
    const sweep = (count / total) * 2 * Math.PI;
    const end = angle + sweep;
    const r = 70;
    const cx = 80;
    const cy = 80;

    const pt = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const startPt = pt(angle);
    const endPt = pt(end);

    let shape;
    if (count === total) {
      shape = svgNode('circle', { cx, cy, r, fill: chartColors[i % chartColors.length] });
    } else {
      const largeArc = sweep > Math.PI ? 1 : 0;
      shape = svgNode('path', {
        d: `M${cx},${cy} L${startPt[0]},${startPt[1]} A${r},${r} 0 ${largeArc},1 ${endPt[0]},${endPt[1]} Z`,
        fill: chartColors[i % chartColors.length],
        stroke: '#ffffff',
        'stroke-width': '1.5',
      });
    }

    const title = svgNode('title', {}, `${label}: ${countFormat.format(count)} (${percentFormat.format((count / total) * 100)}%)`);
    shape.append(title);
    svg.append(shape);

    angle = end;
  });

  return svg;
}

// Render Statistics Dashboard
async function initStatistics() {
  try {
    let data;
    if (typeof statsData !== 'undefined') {
      data = statsData;
    } else {
      const res = await fetch('demo_data.json');
      if (!res.ok) throw new Error('Không thể tải file demo_data.json');
      data = await res.json();
    }
    const statsRoot = document.querySelector('#statistics-content');
    if (!statsRoot) return;
    statsRoot.innerHTML = '';

    // Update badge in tab
    const badge = document.querySelector('#response-badge');
    const validN = data.validTotal || data.total;
    if (badge) badge.textContent = `${countFormat.format(validN)} / ${countFormat.format(data.total)} phiếu`;

    // Overview Cards
    const overviewGrid = document.createElement('div');
    overviewGrid.className = 'stats-summary-grid';

    const overallMeans = Object.values(data.factors).map((f) => f.mean);
    const avgOverall = (overallMeans.reduce((a, b) => a + b, 0) / overallMeans.length).toFixed(2);

    overviewGrid.innerHTML = `
      <div class="stats-summary-card">
        <div class="stats-summary-label">Mẫu phân tích hợp lệ</div>
        <div class="stats-summary-value">${countFormat.format(validN)}</div>
        <div class="stats-summary-sub">Đạt 83.0% tổng số phiếu</div>
      </div>
      <div class="stats-summary-card">
        <div class="stats-summary-label">Tổng lượt thu thập</div>
        <div class="stats-summary-value">${countFormat.format(data.total)}</div>
        <div class="stats-summary-sub">Gồm ${data.filteredTotal || 0} phiếu gạn lọc</div>
      </div>
      <div class="stats-summary-card">
        <div class="stats-summary-label">Biến quan sát Likert</div>
        <div class="stats-summary-value">35</div>
        <div class="stats-summary-sub">7 nhóm nhân tố (1–5)</div>
      </div>
      <div class="stats-summary-card">
        <div class="stats-summary-label">Điểm trung bình chung</div>
        <div class="stats-summary-value" style="color: #005baa;">${avgOverall} / 5.0</div>
        <div class="stats-summary-sub">Mức độ tích cực cao</div>
      </div>
    `;
    statsRoot.append(overviewGrid);

    // 1. Demographics Section
    const demoHeading = document.createElement('h3');
    demoHeading.className = 'stats-title';
    demoHeading.style.margin = '28px 0 16px';
    demoHeading.textContent = 'I. Cơ cấu nhân khẩu học & Đặc điểm mẫu';
    statsRoot.append(demoHeading);

    const pieGrid = document.createElement('div');
    pieGrid.className = 'pie-grid';

    // Helper for Pie Card
    function renderPieCard(title, dict) {
      const card = document.createElement('div');
      card.className = 'pie-card';
      const heading = document.createElement('h3');
      heading.textContent = title;
      card.append(heading);

      const layout = document.createElement('div');
      layout.className = 'pie-layout';

      const entries = Object.entries(dict);
      const total = entries.reduce((sum, [, c]) => sum + c, 0);

      const chart = createPieChart(entries, total);
      layout.append(chart);

      const table = document.createElement('table');
      table.className = 'pie-table';
      entries.forEach(([label, c], idx) => {
        const tr = document.createElement('tr');
        const pct = total ? (c / total) * 100 : 0;
        tr.innerHTML = `
          <td><span class="chart-swatch" style="background: ${chartColors[idx % chartColors.length]}"></span>${label}</td>
          <td>${countFormat.format(c)}</td>
          <td>${percentFormat.format(pct)}%</td>
        `;
        table.append(tr);
      });
      layout.append(table);
      card.append(layout);
      return card;
    }

    pieGrid.append(renderPieCard('Câu hỏi gạn lọc (SV chính quy HUTECH)', data.filter));
    pieGrid.append(renderPieCard('Giới tính (Mẫu hợp lệ)', data.demographics.gender));
    pieGrid.append(renderPieCard('Năm học hiện tại', data.demographics.year));
    pieGrid.append(renderPieCard('Kinh nghiệm làm việc thực tế', data.demographics.experience));
    // Social Media Channels
    const socialCard = document.createElement('div');
    socialCard.className = 'pie-card';
    socialCard.innerHTML = '<h3>Kênh mạng xã hội chuyên ngành sử dụng chính</h3>';
    const socialEntries = Object.entries(data.demographics.social).sort((a, b) => b[1] - a[1]);
    const maxVal = Math.max(...socialEntries.map(([, v]) => v));

    const barBox = document.createElement('div');
    barBox.style.display = 'grid';
    barBox.style.gap = '10px';
    barBox.style.marginTop = '12px';

    socialEntries.forEach(([chan, val], idx) => {
      const pct = (val / validN) * 100;
      const row = document.createElement('div');
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
          <span><strong>${chan}</strong></span>
          <span>${val} lượt (${percentFormat.format(pct)}%)</span>
        </div>
        <div style="height:10px; background:#e2e8f0; border-radius:5px; overflow:hidden;">
          <div style="height:100%; width:${(val / maxVal) * 100}%; background:var(--primary); border-radius:5px;"></div>
        </div>
      `;
      barBox.append(row);
    });
    socialCard.append(barBox);
    pieGrid.append(socialCard);

    statsRoot.append(pieGrid);

    // 2. Likert Factor Groups Section
    const factorHeading = document.createElement('h3');
    factorHeading.className = 'stats-title';
    factorHeading.style.margin = '40px 0 12px';
    factorHeading.textContent = 'II. Thống kê 35 Biến quan sát theo 7 Nhóm nhân tố';
    statsRoot.append(factorHeading);

    // Scale Legend explanation
    const legendCard = document.createElement('div');
    legendCard.className = 'scale-legend-card';
    legendCard.innerHTML = `
      <span style="font-weight:600;">Quy ước mức độ:</span>
      <span class="scale-legend-item"><span class="color-dot" style="background:#ef4444;"></span> 1: Hoàn toàn không đồng ý</span>
      <span class="scale-legend-item"><span class="color-dot" style="background:#f97316;"></span> 2: Không đồng ý</span>
      <span class="scale-legend-item"><span class="color-dot" style="background:#eab308;"></span> 3: Trung lập / Bình thường</span>
      <span class="scale-legend-item"><span class="color-dot" style="background:#3b82f6;"></span> 4: Đồng ý</span>
      <span class="scale-legend-item"><span class="color-dot" style="background:#10b981;"></span> 5: Hoàn toàn đồng ý</span>
    `;
    statsRoot.append(legendCard);

    Object.entries(data.factors).forEach(([fCode, fData]) => {
      const card = document.createElement('div');
      card.className = 'factor-section-card';

      // Header
      card.innerHTML = `
        <div class="factor-header">
          <div class="factor-title-box">
            <span class="factor-tag">${fCode}</span>
            <h4 class="factor-name">${fData.name}</h4>
          </div>
          <span class="factor-mean-badge">Điểm TB nhóm: <strong>${fData.mean.toFixed(2)}</strong></span>
        </div>
      `;

      // Question rows
      fData.questions.forEach((qId) => {
        const qInfo = data.questions[qId];
        const row = document.createElement('div');
        row.className = 'likert-stat-row';

        const p = qInfo.percentages;
        row.innerHTML = `
          <div class="likert-text-row">
            <span class="likert-item-text"><strong>[${qInfo.code}]</strong> ${qInfo.text}</span>
            <span class="likert-item-mean">x̄ = ${qInfo.mean.toFixed(2)}</span>
          </div>
          <div class="stacked-bar-container" title="1: ${p['1']}% | 2: ${p['2']}% | 3: ${p['3']}% | 4: ${p['4']}% | 5: ${p['5']}%">
            <div class="stacked-bar-segment" data-score="1" style="width: ${p['1']}%;"></div>
            <div class="stacked-bar-segment" data-score="2" style="width: ${p['2']}%;"></div>
            <div class="stacked-bar-segment" data-score="3" style="width: ${p['3']}%;"></div>
            <div class="stacked-bar-segment" data-score="4" style="width: ${p['4']}%;"></div>
            <div class="stacked-bar-segment" data-score="5" style="width: ${p['5']}%;"></div>
          </div>
          <div class="bar-legend">
            <span>1: ${p['1']}%</span>
            <span>2: ${p['2']}%</span>
            <span>3: ${p['3']}%</span>
            <span>4: ${p['4']}%</span>
            <span>5: ${p['5']}%</span>
          </div>
        `;
        card.append(row);
      });

      statsRoot.append(card);
    });
  } catch (err) {
    console.error('Lỗi tải thống kê:', err);
    const statsRoot = document.querySelector('#statistics-content');
    if (statsRoot) {
      statsRoot.innerHTML = `<p style="color:var(--error);">Lỗi nạp dữ liệu thống kê: ${err.message}</p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', initStatistics);
