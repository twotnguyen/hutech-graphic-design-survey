// app.js - Render questions, client-side validation, and trial submission
const form = document.querySelector('#survey-form');
const sectionsRoot = document.querySelector('#sections');
const summary = document.querySelector('#validation-summary');
const success = document.querySelector('#success');

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// Set Title
document.querySelector('#survey-title').textContent = survey.title;

// Render Sections
survey.sections.forEach((section, sectionIndex) => {
  const panel = element('section', 'survey-section');
  panel.setAttribute('aria-labelledby', `section-${sectionIndex}`);

  const heading = element('h2', 'section-heading', section.title);
  heading.id = `section-${sectionIndex}`;
  heading.tabIndex = -1;
  panel.append(heading);

  if (section.description) {
    const desc = element('div', 'card section-description', section.description);
    panel.append(desc);
  }

  let currentGroup = null;

  section.questions.forEach((question, qIdx) => {
    // Group header for Likert factors
    if (question.group && question.group !== currentGroup) {
      currentGroup = question.group;
      const grpHeader = element('div', 'group-header');
      const tag = element('span', 'group-code', question.factor);
      const title = element('h3', 'group-title', question.group);
      grpHeader.append(tag, title);
      panel.append(grpHeader);
    }

    const fieldset = element('fieldset', 'card question');
    fieldset.id = question.id;
    fieldset.dataset.type = question.type;

    const legend = element('legend');
    if (question.code) {
      const codeTag = element('span', 'q-code-tag', question.code);
      legend.append(codeTag);
    }
    legend.append(document.createTextNode(question.text));

    if (question.required) {
      const req = element('span', 'asterisk', '*');
      req.setAttribute('aria-label', 'bắt buộc');
      legend.append(req);
    }
    fieldset.append(legend);

    // Branching notice container
    if (question.branching) {
      const branchNotice = element('div', 'branch-warning');
      branchNotice.id = 'branch-notice';
      branchNotice.textContent = 'Lưu ý: Bảng khảo sát này chỉ áp dụng đối với sinh viên chính quy ngành Thiết kế đồ họa tại Trường Đại học Công nghệ TP.HCM (HUTECH).';
      branchNotice.hidden = true;
      fieldset.append(branchNotice);
    }

    // Input options
    if (question.type === 'scale') {
      // 5-point Likert Scale
      const scaleDiv = element('div', 'scale');
      question.options.forEach((val, i) => {
        const label = element('label', 'scale-option');
        const numSpan = element('span', 'scale-number', val);
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = question.id;
        radio.value = val;
        radio.required = true;
        radio.setAttribute('aria-label', `${val} — ${question.scaleLabels[i]}`);
        label.append(numSpan, radio);
        scaleDiv.append(label);
      });
      fieldset.append(scaleDiv);

      const endpoints = element('div', 'scale-endpoints');
      endpoints.setAttribute('aria-hidden', 'true');
      endpoints.append(
        element('span', '', `1: ${question.scaleLabels[0]}`),
        element('span', '', `5: ${question.scaleLabels[4]}`)
      );
      fieldset.append(endpoints);
    } else if (question.type === 'multiple') {
      // Checkbox multiple choices
      const optionsDiv = element('div', 'options');
      question.options.forEach((opt) => {
        const label = element('label', 'option');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `${question.id}[]`;
        checkbox.value = opt;
        label.append(checkbox, element('span', '', opt));
        optionsDiv.append(label);
      });
      fieldset.append(optionsDiv);
    } else {
      // Single choice radio
      const optionsDiv = element('div', 'options');
      question.options.forEach((opt) => {
        const label = element('label', 'option');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = question.id;
        radio.value = opt;
        radio.required = question.required;

        label.append(radio, element('span', '', opt));

        if (opt === 'Khác') {
          const otherInput = document.createElement('input');
          otherInput.type = 'text';
          otherInput.className = 'option-other-input';
          otherInput.placeholder = 'Nhập cụ thể...';
          otherInput.disabled = true;
          radio.addEventListener('change', () => {
            otherInput.disabled = !radio.checked;
            if (radio.checked) otherInput.focus();
          });
          label.append(otherInput);
        }
        optionsDiv.append(label);
      });
      fieldset.append(optionsDiv);
    }

    const error = element('p', 'error-msg', 'Vui lòng hoàn thành câu hỏi này.');
    error.hidden = true;
    fieldset.append(error);

    panel.append(fieldset);
  });

  sectionsRoot.append(panel);
});

// Real-time screening branch handler
const filterQuestion = document.querySelector('#q_filter');
if (filterQuestion) {
  filterQuestion.addEventListener('change', (e) => {
    const branchNotice = document.querySelector('#branch-notice');
    if (e.target.value === 'Không') {
      branchNotice.hidden = false;
    } else {
      branchNotice.hidden = true;
    }
  });
}

function setInvalid(fieldset, invalid) {
  fieldset.classList.toggle('invalid', invalid);
  const errorMsg = fieldset.querySelector('.error-msg');
  if (errorMsg) errorMsg.hidden = !invalid;
}

// Form change clears errors
form.addEventListener('change', (e) => {
  const fieldset = e.target.closest('fieldset');
  if (fieldset) setInvalid(fieldset, false);
  summary.textContent = '';
});

// Form Submit Validation
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fieldsets = [...form.querySelectorAll('fieldset')];
  const unanswered = [];

  fieldsets.forEach((fieldset) => {
    const type = fieldset.dataset.type;
    let answered = false;

    if (type === 'multiple') {
      // Checkbox: at least one checked
      answered = !!fieldset.querySelector('input[type="checkbox"]:checked');
    } else {
      // Radio single or scale
      answered = !!fieldset.querySelector('input[type="radio"]:checked');
    }

    if (!answered) {
      unanswered.push(fieldset);
      setInvalid(fieldset, true);
    } else {
      setInvalid(fieldset, false);
    }
  });

  if (unanswered.length > 0) {
    summary.textContent = `⚠️ Còn ${unanswered.length} câu hỏi bắt buộc chưa hoàn thành. Vui lòng kiểm tra lại.`;
    const first = unanswered[0];
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = first.querySelector('input');
    if (firstInput) firstInput.focus({ preventScroll: true });
    return;
  }

  // Check screening logic
  const screeningAns = form.querySelector('input[name="q_filter"]:checked')?.value;
  if (screeningAns === 'Không') {
    alert('Khảo sát chỉ ghi nhận kết quả của sinh viên chính quy ngành Thiết kế đồ họa HUTECH.');
    return;
  }

  // Show Success
  form.hidden = true;
  success.hidden = false;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Reset Function
function resetSurvey() {
  form.reset();
  form.querySelectorAll('fieldset').forEach((fs) => setInvalid(fs, false));
  const branchNotice = document.querySelector('#branch-notice');
  if (branchNotice) branchNotice.hidden = true;
  form.querySelectorAll('.option-other-input').forEach((inp) => {
    inp.disabled = true;
    inp.value = '';
  });
  summary.textContent = '';
  form.hidden = false;
  success.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('#clear').addEventListener('click', () => {
  if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ câu trả lời đã điền?')) {
    resetSurvey();
  }
});

document.querySelector('#restart').addEventListener('click', resetSurvey);
