document.addEventListener('DOMContentLoaded', () => {

  // Selecting main node elements
  const wrap = document.querySelector('.wrapper');
  const output = wrap.querySelector('.output');
  const formInputs = wrap.querySelector('.form-inputs');
  const choose = wrap.querySelector('.choose-social');

  const subjects = choose.querySelector('.apps-wrapper');

  const submit = subjects.querySelector('.submit-btn');
  const inputCheckbox = subjects.querySelectorAll('label input');
  const allSections = subjects.querySelector('label input[data-type="all"]');

  const inputs = formInputs.querySelectorAll('input[type="text"]');

  // Sections to show
  let socialSections = [];

  // Input types
  let inputFields = {
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

    let fields = {};

    Object.keys(inputFields).map(key => {
      fields[key] = document.querySelector(`.${key}`).value || '';
      inputFields[key] = document.querySelector(`.${key}`).value || '';
    });

    let lines = [];

    lines.push('<!-- Copy everything from input and paste it in your html file -->');

    // MAIN
    lines.push('<head>');
    lines.push('');
    lines.push('<!-- Place this data between the <head> tags of your website -->');
    lines.push('<meta charset="utf-8">');
    lines.push('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
    lines.push('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimal-ui">');
    lines.push(`<title>${fields.title}</title>`);
    lines.push(`<meta name="description" content="${fields.description}"/>`);

    lines.push('');

    if (socialSections.includes('google')) {
      lines.push('<!-- Schema.org markup (Google) -->');
      lines.push(`<meta itemprop="name" content="${fields.title}">`);
      lines.push(`<meta itemprop="description" content="${fields.description}">`);
      lines.push(`<meta itemprop="image" content="${fields.summaryImage}">`);
      lines.push('');
    }

    // TWITTER
    if (socialSections.includes('twitter')) {
      lines.push('<!-- Twitter Card markup-->');
      lines.push('<meta name="twitter:card" content="summary">');
      lines.push(`<meta name="twitter:site" content="${fields.twitterPublisher}">`);
      lines.push(`<meta name="twitter:title" content="${fields.title}">`);
      lines.push(`<meta name="twitter:description" content="${fields.description}">`);
      lines.push('<!-- The image must be a minimum size of 120px by 120px and must be less than 1MB in file size. The image will be cropped to a square on all platforms.	 -->');

      if (fields.summaryImage.value) {
        lines.push(`<meta name="twitter:image" content="${fields.summaryImage}">`);
      } else {
        lines.push('<meta name="twitter:image" content="summary">');
      }

      lines.push(`<meta name="twitter:image:alt" content="${fields.description}">`);
      lines.push(`<meta name="twitter:creator" content="${fields.twitterAuthor}">`);
      lines.push('');
    }

    // FACEBOOK, PINTEREST
    if (socialSections.includes('facebook') || socialSections.includes('pinterest')) {
      lines.push('<!-- Open Graph markup (Facebook, Pinterest) -->');
      lines.push(`<meta property="og:title" content="${fields.title}/>`);
      lines.push('<meta property="og:type" content="article"/>');
      lines.push(`<meta property="og:url" content="${fields.url}/>`);
      lines.push(`<meta property="og:image" content="${fields.summaryImage}/>`);
      lines.push(`<meta property="og:description" content="${fields.description}/>`);
      lines.push(`<meta property="og:site_name" content="${fields.siteName}/>`);
    }

    lines.push('</head>');
    return lines.join('\n');
  };

  // Event section
  // ============================
  // Adding keyup event to listen for all changes and update immediately
  [].forEach.call(inputs, input => {
    input.addEventListener('keyup', () => {
      output.value = initialize();
    }, false);
  });

  // Outputing first data for choosed sections
  submit.addEventListener('click', e => {
    choosedSections(e);
    output.value = initialize();
  }, false);

  // Making all input[type="checkbox"] checked when ckicking on 'Select All'
  allSections.addEventListener('click', e => {
    if (allSections.checked) {
      [].forEach.call(inputCheckbox, elem => {
        elem.checked = true;
      });
    } else {
      [].forEach.call(inputCheckbox, elem => {
        elem.checked = false;
      });
    }
  });

});

// TODO: add input[type="checkbox"] to page where user typing data, so user can manually add any sections
