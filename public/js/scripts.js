$(document).ready(() => {
	titleColors();
	setColorCards();
	showProjects();
});

$(document).keyup(e => {
	if (e.keyCode === 32) {
		setColorCards();
	}
});

$('.lock-icon').click(e => toggleLock(e));
$('.project-btn').click(() => saveProject());
$('.palette-btn').click(() => createPalette());

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

function showProjects() {
	fetch('/api/v1/projects')
		.then(response => response.json())
		.then(data => {
			data.forEach(project => prependProject(project.name, project.id));
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

function createPalette() {
	const paletteName = $('#palette-input').val();
	const projectId = $('.project-drop-down').val();
	console.log('projectId', projectId);
	const colorArray = [];

	$('.hex-code').each((i, colorCode) => {
		colorArray.push($(colorCode).text());
	});

	postPalette(paletteName, colorArray, projectId);
	$('#palette-input').val('');
}

function postPalette(paletteName, colorArray, projectId) {
	fetch('/api/v1/palettes', {
		method: 'POST',
		body: JSON.stringify({
			name: paletteName,
			color1: colorArray[0],
			color2: colorArray[1],
			color3: colorArray[2],
			color4: colorArray[3],
			color5: colorArray[4],
			projectId
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log('data in palette', data);
			return appendPalette(paletteName, colorArray, projectId, data[0].id);
		})
		.catch(error => console.log(error));
}

function appendPalette(paletteName, colorArray, projectId, paletteId) {
	$(`.${projectId}`).append(`
    <article class='palette ${paletteId}'>
      <div class="palette-info">
        <p>${paletteName}</p>
        <button class='delete-btn'></button>
      </div>
      <section class="palette-display">
        <div class="palette-color ${paletteId}" color='${colorArray[0]}'></div>
        <div class="palette-color ${paletteId}" color='${colorArray[1]}'></div>
        <div class="palette-color ${paletteId}" color='${colorArray[2]}'></div>
        <div class="palette-color ${paletteId}" color='${colorArray[3]}'></div>
        <div class="palette-color ${paletteId}" color='${colorArray[4]}'></div>
      </section>
    </article>
  `);
	$(`div.${paletteId}`).each((i, div) => $(div).css('backgroundColor', colorArray[i]));
}
