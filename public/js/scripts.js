$(document).ready(() => setColorCards())

$('.generator-btn').click(() => setColorCards())

function getRandomColor() {
	const characters = '0123456789ABCDEF'
	let hex = '#'
	for (let i = 0; i < 6; i++) {
		hex += characters[Math.floor(Math.random() * 16)]
	}
	return hex
}

function setColorCards() {
	$('.color-card').each((index, card) => {
		let randomCode = getRandomColor()
		$(card).css('background-color', randomCode)
		$(card)
			.find('h3')
			.text(randomCode)
	})
}

const lockedIcon = '../assets/locked.svg'

$('.color-card').click(() => console.log($(this).find('.color-card')))

// $(this)
//   .parent()
//   .addClass('locked')
