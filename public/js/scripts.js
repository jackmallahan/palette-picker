$(document).ready(() => {
  titleColors()
  setColorCards()
})

$(document).keyup(e => {
	if (e.keyCode === 32) {
		setColorCards()
	}
})

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


// style='color:${mappedColor}'

function titleColors() {
  const title = "Palette Picker".split('')
  const colors = ["#092140", "#024959", "#F2C777", "#F24738", "#BF2A2A"]
  title.forEach((letter, i) => {
    let mappedColor = colors[i % colors.length];
    $('.title').append(`
      <span class='letter' style='color:${mappedColor}'>
      ${title[i]}
      </span>
    `);
  })
}

function toggleLock(e) {
	$(e.target.parentNode).toggleClass('locked')
}
