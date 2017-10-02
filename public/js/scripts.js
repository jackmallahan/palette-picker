function getRandomColor() {
	const characters = '0123456789ABCDEF'
	let hex = '#'
	for (let i = 0; i < 6; i++) {
		hex += characters[Math.floor(Math.random() * 16)]
	}
	return hex
}

$(document).ready(() => setColorCards())

$('.generator-btn').click(() => setColorCards())

function setColorCards() {
	$('.color-card').each((index, card) => {
		$(card).css('background-color', getRandomColor())
	})
}
