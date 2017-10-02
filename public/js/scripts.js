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

console.log($('.hex-code').find('h3'))

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

$('.lock-icon').click(() =>
	$('.lock-icon').each((index, card) => {
		$(card).css('background-image', 'url(' + lockedIcon + ')')
	})
)
