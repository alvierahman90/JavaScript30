/* Get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

/* Build functions */

function togglePlay() {
	if(video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updateButton() {
	toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdates() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

/* Stolen from https://stackoverflow.com/a/36672683 */
function fullscreen() {
	var isInFullScreen = 
		(document.fullscreenElement 
			&& document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement 
			&& document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement 
			&& document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement 
			&& document.msFullscreenElement !== null);

	var docElm = player;
	if (!isInFullScreen) {
		if (docElm.requestFullscreen) {
			docElm.requestFullscreen();
		} else if (docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		} else if (docElm.webkitRequestFullScreen) {
			docElm.webkitRequestFullScreen();
		} else if (docElm.msRequestFullscreen) {
			docElm.msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
}
/* Event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(b => b.addEventListener('click', skip));
ranges.forEach(r => r.addEventListener('change', handleRangeUpdates));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullscreenButton.addEventListener('click', fullscreen);
