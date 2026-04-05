// --- LÓGICA DO PLAYER SPOTIFY COM PLAYLIST ---

// 1. Crie sua playlist aqui! 
const playlist = [
    {
        title: "Minha Namorada",
        artist: "Kamisa 10",
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
        title: "Ainda Bem",
        artist: "Thiaguinho",
        file: "audio/musica4.mp3",
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
        artist: "Grupo Menos é Mais",
        file: "audio/musica5.mp3",
        cover: "img/capa-spotify.jpg"
    },
    {
        title: "Um Beijo por Minuto",
        artist: "Natanzinho Lima",
        file: "audio/musica6.mp3",
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

// NOVOS ELEMENTOS DOS ÍCONES PARA O IPHONE
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

let currentSongIndex = 0; // Começa na primeira música (posição 0)
let isPlaying = false;

// Função para carregar as informações da música na tela
function loadSong(song) {
    titleText.innerText = song.title;
    artistText.innerText = song.artist;
    audio.src = song.file;
    cover.src = song.cover;
}

// Função para dar Play (Corrigida para o iPhone)
function playSong() {
    isPlaying = true;
    audio.play();
    
    // Esconde o Play, mostra o Pause
    if(iconPlay && iconPause) {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    }
    
    cover.classList.add('playing');
}

// Função para dar Pause (Corrigida para o iPhone)
function pauseSong() {
    isPlaying = false;
    audio.pause();
    
    // Esconde o Pause, mostra o Play
    if(iconPlay && iconPause) {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    }
    
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


// --- LÓGICA DO CONTADOR (Exata com Calendário) ---
// Data do pedido de namoro: 06/04/2025 às 16:30
const startDate = new Date('2025-04-05T17:30:00');


function updateCounter() {
    const now = new Date();

    // Cálculo inicial das diferenças brutas
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Ajuste "emprestando" tempo do valor maior
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }

    // Se os dias forem negativos, precisamos saber quantos dias tinha o mês anterior
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }

    // Se os meses forem negativos, tira um ano
    if (months < 0) {
        months += 12;
        years--;
    }

    // --- NOVA LÓGICA: Calcula o total real de meses ---
    const totalMonths = (years * 12) + months;
    
    // Atualiza o card de "Meses Incríveis" nas Estatísticas
    const totalMonthsElement = document.getElementById('total-months');
    if (totalMonthsElement) {
        totalMonthsElement.innerText = totalMonths;
    }
    // --------------------------------------------------

    document.getElementById('timer').innerHTML = `
        <div class="counter-item"><span>${years}</span> Anos</div>
        <div class="counter-item"><span>${months}</span> Meses</div>
        <div class="counter-item"><span>${days}</span> Dias</div>
        <div class="counter-item"><span>${hours}</span> Horas</div>
        <div class="counter-item"><span>${minutes}</span> Min</div>
        <div class="counter-item"><span>${seconds}</span> Seg</div>
    `;
}
setInterval(updateCounter, 1000);
updateCounter();

// --- LÓGICA DO GERADOR DE MOTIVOS ---
const reasons = [
    "Seu jeitinho calmo.",
    "É linda e bem feita que Deus benza.",
    "Me aconselha e me apoia.",
    "Tem um coração generoso.",
    "Ama animais.",
    "Tem o sorriso mais lindo das galáxias.",
    "Tem visão de futuro.",
    "Muito educada e inteligente.",
    "Respeita nosso relacionamento.",
    "Com você faz até os dias comuns parecerem especiais."
];

const reasonBtn = document.getElementById('reason-btn');
const reasonText = document.getElementById('reason-text');

reasonBtn.addEventListener('click', () => {
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    reasonText.textContent = `${randomReason}`;
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