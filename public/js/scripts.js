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

function toggleLock(e) {
	console.log('event', e.target.parentNode)
	$(e.target.parentNode).toggleClass('locked')
}

$('.lock-icon').click(e => toggleLock(e))
