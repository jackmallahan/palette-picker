$(document).ready(() => {
	titleColors();
	setColorCards();
});

$(document).keyup(e => {
	if (e.keyCode === 32) {
		setColorCards();
	}
});

$('.lock-icon').click(e => toggleLock(e));
$('.project-btn').click(() => saveProject());

function getRandomColor() {
	const characters = '0123456789ABCDEF';
	let hex = '#';
	for (let i = 0; i < 6; i++) {
		hex += characters[Math.floor(Math.random() * 16)];
	}
	return hex;
}

function setColorCards() {
	$('.color-card').each((index, card) => {
		if ($(card).hasClass('locked')) {
			return $(card);
		}
		let randomCode = getRandomColor();
		$(card).css('background-color', randomCode);
		$(card)
			.find('h3')
			.text(randomCode);
	});
}

function titleColors() {
	const title = 'Palette Picker'.split('');
	const colors = [];

	title.forEach((letter, i) => {
		let randomCode = getRandomColor();
		colors.push(randomCode);
		let mappedColor = colors[i % colors.length];
		$('.title').append(`
      <span class='letter' style='color:${mappedColor}'>
      ${title[i]}
      </span>
    `);
	});
}

function toggleLock(e) {
	$(e.target.parentNode).toggleClass('locked');
}

function saveProject() {
	const name = $('#project-input').val();
	$('#project-input').val('');
	console.log('name', name);

	fetch('/api/v1/projects', {
		method: 'POST',
		body: JSON.stringify({ name: name }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log('data', data);
			if (data[0].id) {
				prependProject(name, data[0].id);
			}
		})
		.catch(error => console.log(error));
}

function prependProject(name, id) {
	$('.project-container').prepend(`
    <div class='project ${id}'>
      <h5>${name}</h5>
    </div>
  `);
	$('.project-drop-down').prepend(`
    <option value='${id}'>${name}</option>
  `);
}
