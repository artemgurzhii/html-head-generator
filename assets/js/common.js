  document.addEventListener('DOMContentLoaded', () => {

  // Selecting main node elements
  const wrap = document.querySelector('.wrapper');
  const output = wrap.querySelector('.output');
  const formInputs = wrap.querySelector('.form-inputs');
  const choose = wrap.querySelector('.choose-social');

  const subjects = choose.querySelector('.apps-wrapper');

  const submit = subjects.querySelector('.submit-btn');
  const inputCheckbox = subjects.querySelectorAll('label input');
  const selectAllSections = subjects.querySelector('label input[data-type="all"]');

  const copyBtn = formInputs.querySelector('.copy-btn');

  const inputs = formInputs.querySelectorAll('input[type="text"]');

  // Sections to show
  let socialSections = [];

  // Input types
  const inputFields = {
    title: '',
    description: '',
    url: '',
    summaryImage: '',
    twitterPublisher: '',
    twitterAuthor: '',
    contentType: '',
    siteName: ''
    // publishedTime: '',
    // modifiedTime: '',
    // articleSection: '',
    // articleTag: '',
    // fbAdminId: ''
  };

  // Function declaration section
  // ============================
  // Return choosed sections
  const choosedSections = e => {
    e.preventDefault();
    const labels = subjects.querySelectorAll('label input:checked');

    if (labels.length) {
      [].forEach.call(labels, label => {
        socialSections.push(label.dataset.type);
      });
      choose.classList.add('valid');
      document.querySelector('.container').classList.add('visible-container');
    } else {
      if (!subjects.querySelector('.error')) {
        const span = document.createElement('span');
        span.classList.add('error');
        span.textContent = 'Please, choose at least one item';
        subjects.appendChild(span);
      }
    }
  };

  // Return needed data
  const initialize = () => {


    Object.keys(inputFields).map(key => {
      inputFields[key] = document.querySelector(`.${key}`).value || '';
    });

    let lines = [];

    lines.push('<!-- Copy everything from input and paste it in your html file -->');

    // MAIN
    lines.push('<head>');
    lines.push('');
    lines.push('\t<meta charset="utf-8">');
    lines.push('\t<meta http-equiv="X-UA-Compatible" content="IE=edge">');
    lines.push('\t<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimal-ui">');
    lines.push(`\t<title>${inputFields.title}</title>`);
    lines.push(`\t<meta name="description" content="${inputFields.description}"/>`);

    lines.push('');

    if (socialSections.includes('google')) {
      lines.push('\t<!-- Schema.org markup (Google) -->');
      lines.push(`\t<meta itemprop="name" content="${inputFields.title}">`);
      lines.push(`\t<meta itemprop="description" content="${inputFields.description}">`);
      lines.push(`\t<meta itemprop="image" content="${inputFields.summaryImage}">`);
      lines.push('');
    }

    // TWITTER
    if (socialSections.includes('twitter')) {
      lines.push('\t<!-- Twitter Card markup-->');
      lines.push('\t<meta name="twitter:card" content="summary">');
      lines.push(`\t<meta name="twitter:site" content="${inputFields.twitterPublisher}">`);
      lines.push(`\t<meta name="twitter:title" content="${inputFields.title}">`);
      lines.push(`\t<meta name="twitter:description" content="${inputFields.description}">`);
      lines.push('\t<!-- The image must be a minimum size of 120px by 120px and must be less than 1MB in file size. The image will be cropped to a square on all platforms.	 -->');


      if (inputFields.summaryImage) {
        lines.push(`\t<meta name="twitter:image" content="${inputFields.summaryImage}">`);
      } else {
        lines.push('\t<meta name="twitter:image" content="summary">');
      }

      lines.push(`\t<meta name="twitter:image:alt" content="${inputFields.description}">`);
      lines.push(`\t<meta name="twitter:creator" content="${inputFields.twitterAuthor}">`);
      lines.push('');
    }

    // FACEBOOK, PINTEREST
    if (socialSections.includes('facebook') || socialSections.includes('pinterest')) {
      lines.push('\t<!-- Open Graph markup (Facebook, Pinterest) -->');
      lines.push(`\t<meta property="og:title" content="${inputFields.title}"/>`);
      lines.push('\t<meta property="og:type" content="article"/>');
      lines.push(`\t<meta property="og:url" content="${inputFields.url}"/>`);
      lines.push(`\t<meta property="og:image" content="${inputFields.summaryImage}"/>`);
      lines.push(`\t<meta property="og:description" content="${inputFields.description}"/>`);
      lines.push(`\t<meta property="og:site_name" content="${inputFields.siteName}"/>`);
    }

    lines.push('</head>');
    return lines.join('\n');
  };

  // Make all checkboxes toogle their state(checked: true || false)
  const selectAll = bool => {
    [].forEach.call(inputCheckbox, elem => {
      elem.checked = bool;
    });
  };

  // Event section
  // ============================
  // Adding keyup event to listen for all changes and update immediately
  [].forEach.call(inputs, input => {
    input.addEventListener('keyup', () => {
      output.value = initialize();
    }, false);
  });

  // copying text to clipboard on copy button click
  copyBtn.addEventListener('click', e => {
    e.preventDefault();
    output.select();
    document.execCommand('copy');
  }, false);

  // Making all input[type="checkbox"] checked when ckicking on 'Select All'
  selectAllSections.addEventListener('click', () => selectAllSections.checked ? selectAll(true) : selectAll(false));

});

// TODO: add input[type="checkbox"] to page where user typing data, so user can manually add any sections