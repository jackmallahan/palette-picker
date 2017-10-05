$(document).ready(() => setColorCards())
$(document).keyup(e => {
	console.log(e.keyCode)
	if (e.keyCode === 32) {
		setColorCards()
	}
})

$('.generator-btn').click(() => setColorCards())

$('.lock-icon').click(e => toggleLock(e))

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
		if ($(card).hasClass('locked')) {
			return $(card)
		}
		let randomCode = getRandomColor()
		$(card).css('background-color', randomCode)
		$(card)
			.find('h3')
			.text(randomCode)
	})
}

function toggleLock(e) {
	$(e.target.parentNode).toggleClass('locked')
}
