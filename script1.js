const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    carousel = document.getElementById('carousel'),
    carouselItems = document.querySelectorAll('.carousel-item');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: '🌸 Aa mil 🌸',
        artist: 'Zaeden, Lisa Mishra',
    },
    {
        path: 'assets/2.mp3',
        displayName: '🌸 O soniye 🌸',
        artist: 'Vibha Saraf, Arijit Singh',
    },
    {
        path: 'assets/3.mp3',
        displayName: '🌸 River flows in you 🌸',
        artist: 'Yiruma',
    }
];

let musicIndex = 0;
let isPlaying = false;
let activeIndex = 0;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    updateCarousel();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// Carousel related functions
function updateCarousel() {
    const centerIndex = Math.floor(carouselItems.length / 2);

    carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        // Calculate the position relative to the active item
        let offset = index - activeIndex;
        // Adjust offset to wrap around the carousel
        if (offset < -centerIndex) {
            offset += carouselItems.length;
        } else if (offset > centerIndex) {
            offset -= carouselItems.length;
        }
        item.style.order = offset;
    });

    // Update the active class for the center item
    carouselItems[activeIndex].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % carouselItems.length;
    updateCarousel();
});

updateCarousel();
loadMusic(songs[musicIndex]);
