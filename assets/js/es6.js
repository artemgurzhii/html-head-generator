document.addEventListener('DOMContentLoaded', () => {

  // Main variables
  // ============================
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
	const inputs = formInputs.querySelectorAll('input[type="text"], select');

	// All Inputs with their types
	const inputFields = {
		title: '',
		description: '',
		url: '',
		summaryImage: '',
		twitterPublisher: '',
		twitterAuthor: '',
		type: '',
		siteName: ''
	};

	const fieldsRequired = {
		all: Array.from(Object.keys(inputFields)),
		facebook: ['title', 'description', 'url', 'summaryImage', 'type', 'siteName'],
		twitter: ['title', 'description', 'url', 'summaryImage', 'twitterPublisher', 'twitterAuthor'],
		google: ['title', 'description', 'summaryImage']
	};

	// Sections to show
	let socialSections = [];

  // Function declaration section
  // ============================
  // Create error (append span to the parent with the error text)
	function error(append, text) {
		const span = document.createElement('span');
		span.classList.add('error');
		span.textContent = text;
		append.appendChild(span);
	}

	// Validate meta tag value length
	function validateLength(input, len) {
		const parent = input.parentNode;
		if (input.value.length >= len && !parent.querySelector('.error')) {
			error(parent, `The length of the ${input.classList[0]} input should not exceed ${len} characters`);
		} else if (input.value.length < len && parent.querySelector('.error')) {
			parent.removeChild(parent.querySelector('.error'));
		}
	}

	const validateText = (input, char) => {
		const parent = input.parentNode;
		if (!input.value.includes(char) && !parent.querySelector('.error')) {
			error(parent, `Element ${input.classList[0]} should contain ${char}`);
		} else if (input.value.includes(char) && parent.querySelector('.error')) {
			parent.removeChild(parent.querySelector('.error'));
		}
	};

  // Return choosed sections
  // Throw error if no sections were choosed
	const choosedSections = e => {
		e.preventDefault();
		const labels = subjects.querySelectorAll('label input[type="checkbox"]:checked');

		if (labels.length) {
			[].forEach.call(labels, label => {
				socialSections.push(label.dataset.type);
			});
			choose.classList.add('valid');
			document.querySelector('.container').classList.add('visible-container');
		} else {
			if (!subjects.querySelector('.error')) {
				error(subjects, 'Please, choose at least one item');
			}
		}
	};

  // Return needed data
	function initialize() {
		Object.keys(inputFields).map(key => {
			inputFields[key] = document.querySelector(`.${key}`).value || '';
		});
		let lines = [];
		lines.push('<!-- Copy everything from input and paste it in your html file -->');

    // GOOGLE
		if (socialSections.includes('google')) {
			lines.push('<!-- Update your html tag to include the itemscope and itemtype attributes. -->');
			lines.push('<html lang="en" itemscope="" itemtype="http://schema.org/Webpage">');
		} else {
			lines.push('<html lang="en">');
		}

    // MAIN
		lines.push('\t<head>');
		lines.push('');
		lines.push('\t\t<meta charset="utf-8">');
		lines.push('\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">');
		lines.push('\t\t<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimal-ui">');
		lines.push(`\t\t<title>${inputFields.title}</title>`);
		lines.push(`\t\t<meta name="description" content="${inputFields.description}"/>`);

		lines.push('');

    // GOOGLE
		if (socialSections.includes('google')) {
			lines.push('\t\t<!-- Schema.org (For Google+) -->');
			lines.push(`\t\t<meta itemprop="name" content="${inputFields.title}">`);
			lines.push(`\t\t<meta itemprop="description" content="${inputFields.description}">`);
			lines.push(`\t\t<meta itemprop="image" content="${inputFields.summaryImage}">`);
			lines.push('');
		}

    // TWITTER
		if (socialSections.includes('twitter')) {
			lines.push('\t\t<!-- Twitter Card markup-->');
			lines.push('\t\t<meta name="twitter:card" content="summary">');
			lines.push(`\t\t<meta name="twitter:creator" content="${inputFields.twitterAuthor}">`);
			lines.push(`\t\t<meta name="twitter:url" content="${inputFields.url}">`);
			lines.push(`\t\t<meta name="twitter:title" content="${inputFields.title}">`);
			lines.push(`\t\t<meta name="twitter:description" content="${inputFields.description}">`);
			lines.push(`\t\t<meta name="twitter:site" content="${inputFields.twitterPublisher}">`);
			lines.push('\t\t<!-- The image must be a minimum size of 120px by 120px and must be less than 1MB in file size. The image will be cropped to a square on all platforms.	 -->');

			if (inputFields.summaryImage) {
				lines.push(`\t\t<meta name="twitter:image" content="${inputFields.summaryImage}">`);
				lines.push(`\t\t<meta name="twitter:image:alt" content="${inputFields.description}">`);
			} else {
				lines.push('\t\t<meta name="twitter:image" content="summary">');
			}

			lines.push('');
		}

    // FACEBOOK
		if (socialSections.includes('facebook')) {
			lines.push('\t\t<!-- Open Graph markup (Facebook) -->');
			lines.push(`\t\t<meta property="og:url" content="${inputFields.url}/"/>`);
			lines.push(`\t\t<meta property="og:type" content="${inputFields.type}"/>`);
			lines.push(`\t\t<meta property="og:title" content="${inputFields.title}"/>`);
			lines.push(`\t\t<meta property="og:description" content="${inputFields.description}"/>`);
			lines.push(`\t\t<meta property="og:image" content="${inputFields.summaryImage}"/>`);
			lines.push('\t\t<meta property="og:locale" content="en_US"/>');
			lines.push(`\t\t<meta property="og:site_name" content="${inputFields.siteName}"/>`);
			lines.push('');
		}

		lines.push('\t</head>');
		lines.push('\t<body>');
		lines.push('\t</body>');
		lines.push('<html/>');
		return lines.join('\n');
	}

  // Make all checkboxes toogle their state(checked: true || false)
	function selectAll(bool) {
		[].forEach.call(inputCheckbox, elem => {
			elem.checked = bool;
		});
	}

  // Event section
  // ============================
  // Adding keyup event to listen for all changes and update immediately
	[].forEach.call(inputs, input => {
		if (input.nodeName === 'SELECT') {
			input.addEventListener('change', () => {
				output.value = initialize();
			}, false);
		} else {
			input.addEventListener('keyup', () => {
				output.value = initialize();

				validateLength(formInputs.querySelector('.description'), 155);
				validateLength(formInputs.querySelector('.title'), 70);

				validateText(formInputs.querySelector('.twitterPublisher'), '@');
				validateText(formInputs.querySelector('.twitterAuthor'), '@');
				validateText(formInputs.querySelector('.summaryImage'), '.png');
			}, false);
		}
	});

	// Returning inputs and setting textarea text on btn click
	submit.addEventListener('click', e => {
		choosedSections(e);
		output.value = initialize();

		socialSections.forEach(items => {
			fieldsRequired[items].forEach(item => {
				formInputs.querySelector(`.${item}`).parentNode.classList.remove('none');
				formInputs.querySelector(`.${item}`).parentNode.classList.add('block');
			});
		});

	}, false);

	// Copying text to the clipboard on copy button click
	copyBtn.addEventListener('click', e => {
		e.preventDefault();
		output.select();
		document.execCommand('copy');
	}, false);

	// Making all input[type="checkbox"] checked when ckicking on 'Select All'
	selectAllSections.addEventListener('click', () => selectAllSections.checked ? selectAll(true) : selectAll(false), false);

}, false);
