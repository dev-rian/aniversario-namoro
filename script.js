// --- LÓGICA DO PLAYER SPOTIFY COM PLAYLIST ---

// 1. Crie sua playlist aqui! 
// Se quiser capas diferentes, mude o caminho da imagem. Se for a mesma, repita o arquivo.
const playlist = [
    {
        title: "Minha Namorada",
        artist: "Kamiza 10",
        file: "audio/musica1.mp3",
        cover: "img/capa-spotify.jpg"
    },
    {
        title: "Pra Você Acreditar",
        artist: "Ferrugem",
        file: "audio/musica2.mp3",
        cover: "img/capa-spotify.jpg"
    },
    {
        title: "Duas Metades",
        artist: "Jorge & Mateus",
        file: "audio/musica3.mp3",
        cover: "img/capa-spotify.jpg"
    },
    {
        title: "Ainda Bem",
        artist: "Thiaguinho",
        file: "audio/musica4.mp3",
        cover: "img/capa-spotify.jpg"
    }
];

// Elementos do HTML
const audio = document.getElementById('our-song');
const playBtn = document.getElementById('play-pause-btn');
const prevBtnMusic = document.getElementById('prev-music-btn');
const nextBtnMusic = document.getElementById('next-music-btn');
const cover = document.getElementById('spin-cover');
const titleText = document.getElementById('song-title');
const artistText = document.getElementById('song-artist');

let currentSongIndex = 0; // Começa na primeira música (posição 0)
let isPlaying = false;

// Função para carregar as informações da música na tela
function loadSong(song) {
    titleText.innerText = song.title;
    artistText.innerText = song.artist;
    audio.src = song.file;
    cover.src = song.cover;
}

// Função para dar Play
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '⏸';
    cover.classList.add('playing');
}

// Função para dar Pause
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '▶';
    cover.classList.remove('playing');
}

// Botão Central de Play/Pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Botão Avançar
function nextSong() {
    currentSongIndex++;
    // Se passar da última música, volta para a primeira
    if (currentSongIndex > playlist.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(playlist[currentSongIndex]);
    if (isPlaying) playSong(); // Se já estava tocando, continua tocando a próxima
}

// Botão Voltar
function prevSong() {
    currentSongIndex--;
    // Se voltar antes da primeira, vai para a última
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadSong(playlist[currentSongIndex]);
    if (isPlaying) playSong();
}

nextBtnMusic.addEventListener('click', nextSong);
prevBtnMusic.addEventListener('click', prevSong);

audio.addEventListener('ended', nextSong);

loadSong(playlist[currentSongIndex]);


const startDate = new Date('2025-04-06T17:30:00');

function updateCounter() {
    const now = new Date();
    let diff = now - startDate

    if (diff < 0) diff = 0; // Previne números negativos se abrir antes da data

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(days / 365);
    const remainingDaysAfterYears = days % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const finalDays = remainingDaysAfterYears % 30;

    document.getElementById('timer').innerHTML = `
        <div class="counter-item"><span>${years}</span> Anos</div>
        <div class="counter-item"><span>${months}</span> Meses</div>
        <div class="counter-item"><span>${finalDays}</span> Dias</div>
        <div class="counter-item"><span>${hours}</span> Horas</div>
        <div class="counter-item"><span>${minutes}</span> Min</div>
        <div class="counter-item"><span>${seconds}</span> Seg</div>
    `;
}
setInterval(updateCounter, 1000);
updateCounter();

// --- LÓGICA DO GERADOR DE MOTIVOS ---
const reasons = [
    "O seu sorriso ilumina meu dia.",
    "A forma como você me apoia em tudo.",
    "Nossas risadas juntos.",
    "O seu abraço é o meu lugar favorito.",
    "Como você faz até os dias comuns parecerem especiais."
];

const reasonBtn = document.getElementById('reason-btn');
const reasonText = document.getElementById('reason-text');

reasonBtn.addEventListener('click', () => {
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    reasonText.textContent = `"${randomReason}"`;
});

// --- LÓGICA DO NOVO SLIDESHOW (Pilha 3D) ---
const track = document.querySelector('.slideshow-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Função principal que atualiza as classes CSS na pilha
function updateSlides() {
    const allSlides = track.querySelectorAll('.slide');
    
    // Remove todas as classes de estado anteriores de todos os slides
    allSlides.forEach(slide => {
        slide.classList.remove('active', 'next', 'next-next');
    });

    // Aplica as novas classes para o novo estado da pilha:
    // O primeiro no DOM é o ativo.
    if (allSlides[0]) allSlides[0].classList.add('active');
    // O segundo é o primeiro atrás.
    if (allSlides[1]) allSlides[1].classList.add('next');
    // O terceiro é o segundo atrás.
    if (allSlides[2]) allSlides[2].classList.add('next-next');
}

// Função para passar para a PRÓXIMA foto
function moveNext() {
    // Pega o primeiro slide (ativo) e joga para o final da fila do DOM.
    // Isso cria o loop infinito sem fim visível.
    track.appendChild(track.firstElementChild);
    // Atualiza a visualização com a nova ordem.
    updateSlides();
    resetAutoPlay(); // Reseta o temporizador automático
}

// Função para passar para a foto ANTERIOR
function movePrev() {
    // Pega o último slide (fim da fila) e traz para o começo do DOM.
    track.prepend(track.lastElementChild);
    // Atualiza a visualização com a nova ordem.
    updateSlides();
    resetAutoPlay(); // Reseta o temporizador automático
}

// Controles Manuais (Event Listeners)
nextBtn.addEventListener('click', moveNext);
prevBtn.addEventListener('click', movePrev);

// --- LÓGICA DO AUTOMÁTICO (Loop Eterno a cada 3s) ---
let autoPlayInterval;

function startAutoPlay() {
    // Chama moveNext a cada 3000ms (3 segundos)
    autoPlayInterval = setInterval(moveNext, 3000); 
}

function resetAutoPlay() {
    // Cancela o intervalo atual e começa um novo.
    // Isso impede que a foto mude logo após você clicar manualmente.
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Inicialização: Configura os slides na pilha e começa o automático
updateSlides();
startAutoPlay();