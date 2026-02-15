// ========== HAZBIN HOTEL — PARA SOF 🩷 ==========

// ========== VARIABLES GLOBALES ==========
let currentAudio = null;
let currentSong = null;
let isPlaying = false;
let fadeInterval = null;
let targetVolume = 0.7;
let triviaScore = 0;
let finalUnlocked = false;
const UNLOCK_SCORE = 10;

// ========== GALERÍA ==========
const galleryImages = [
  { src: 'images/loserbabycaratula.jpeg', alt: 'Loser Baby', category: 'duo', title: 'Loser Baby 🐱🕷️' },
  { src: 'images/poisoncaratula.jpeg', alt: 'Poison', category: 'angel', title: 'Poison 🕷️' },
  { src: 'images/addictcaratula.jpeg', alt: 'Addict', category: 'angel', title: 'Addict 🕷️' },
  { src: 'images/huskbartender.avif', alt: 'Husk Bartender', category: 'husk', title: 'Husk el Barman 🐱' },
  { src: 'images/angelpose.png', alt: 'Angel Dust', category: 'angel', title: 'Angel Dust 🕷️' },
  { src: 'images/huskyangel.png', alt: 'Husk y Angel', category: 'duo', title: 'Mejores enemigos 🐱🕷️' },
  { src: 'images/fatnuggets.webp', alt: 'Fat Nuggets', category: 'duo', title: 'Fat Nuggets 🐷' },
  { src: 'images/alastor.webp', alt: 'Alastor', category: 'duo', title: 'Alastor 📻' },
  { src: 'images/foto-sof.jpg', alt: 'Nosotros', category: 'nosotros', title: '💖 Tú y yo' },
];

// ========== TRIVIA ==========
const triviaQuestions = [
  { q: "¿Qué tipo de demonio es Husk?", opts: ["Gato alado", "Lobo", "Murciélago", "Zorro"], correct: 0, fun: "¡Un gato alado enorme con cara de pocos amigos! 🐱" },
  { q: "¿Cuál es el apellido completo de Angel Dust?", opts: ["Morningstar", "Spiders", "Arackniss", "Pentious"], correct: 1, fun: "Angel Spiders. Su familia entera es de la mafia. 🕷️" },
  { q: "¿En qué hotel está ambientada la serie?", opts: ["Hotel Hazbin", "Hotel Paradise", "Hazbin Hotel", "Hotel Hell"], correct: 2, fun: "¡Hazbin Hotel! Hogar de redención para pecadores. 🏨" },
  { q: "¿Quién fundó el Hazbin Hotel?", opts: ["Lucifer", "Charlie", "Vaggie", "Alastor"], correct: 1, fun: "Charlie Morningstar, la princesa del infierno. ❤️" },
  { q: "¿Cuál es el apodo de Angel Dust antes de morir?", opts: ["Anthony", "Angelo", "Tony", "Marco"], correct: 2, fun: "Tony Hawk— no, ¡Anthony! Su nombre real es Anthony. 🕷️" },
  { q: "¿Qué adicción tuvo Angel Dust en vida?", opts: ["Alcohol", "Tabaco", "Drogas", "Juego"], correct: 2, fun: "Las drogas... por eso se llama Angel DUST. 💊" },
  { q: "¿Cuántos brazos tiene Angel Dust en total?", opts: ["2", "4", "6", "8"], correct: 2, fun: "¡6 brazos! Práctico para hacer múltiples cosas a la vez. 🕷️" },
  { q: "¿Qué tipo de ente sobrenatural es Alastor?", opts: ["Demonio mayor", "Ángel caído", "Overlord / Señor", "Pecador"], correct: 2, fun: "Alastor es un Overlord poderoso. Nadie sabe bien su verdadero poder. 📻" },
  { q: "¿Cómo se llama la mascota cerdo de Angel Dust?", opts: ["Pinky", "Bacon", "Fat Nuggets", "Hammy"], correct: 2, fun: "¡Fat Nuggets! El cerdo más adorable del infierno. 🐷" },
  { q: "¿Qué canción cantan juntos Husk y Angel?", opts: ["Poison", "Addict", "Loser, Baby", "Hell's Greatest Dad"], correct: 2, fun: "¡Loser, Baby! La canción que te hace llorar Y bailar. 🎵" },
  { q: "¿Cuántas balas tiene el revólver en la Ruleta Rusa?", opts: ["4", "5", "6", "8"], correct: 2, fun: "6 recámaras. Probabilidades de 1 en 6. No muy halagüeño. 🔫" },
  { q: "¿De qué familia mafiosa es Angel Dust?", opts: ["Valentino", "Vox", "Spiders", "Velvette"], correct: 2, fun: "La familia Spiders. Mafia del crimen organizado del infierno. 🕷️" },
  { q: "¿Quién es el novio/jefe de Angel Dust que lo explota?", opts: ["Alastor", "Vox", "Valentino", "Velvette"], correct: 2, fun: "Valentino el Sobreseñor. El villano más odioso de toda la serie. 😡" },
  { q: "¿Qué perdió Husk en una apuesta con Alastor?", opts: ["Su vida", "Su magia", "Su alma / poderes", "Su bar"], correct: 2, fun: "Sus poderes y su alma, en una apuesta perdida. Clásico Husk. 🐱" },
  { q: "¿Cómo se llama la serie hermana/spin-off de Hazbin Hotel?", opts: ["Helluva Boss", "Hell's Kitchen", "Devil Town", "Sinners"], correct: 0, fun: "¡Helluva Boss! También de Vivziepop. 😈" },
];

// ========== HISTORIA INTERACTIVA ==========
const storyNodes = {
  start: {
    image: '🍸',
    text: 'Es una noche tranquila en el Hazbin Hotel. El bar huele a whiskey y a decisiones malas. Husk limpia un vaso con cara de pocos amigos, y Angel Dust está sentado en la barra mirando el techo. De repente, te ven entrar.',
    choices: [
      { label: '😾 Hablar con Husk', next: 'husk1' },
      { label: '🕷️ Hablar con Angel', next: 'angel1' },
      { label: '🍺 Pedir algo de beber', next: 'drink1' },
    ]
  },
  husk1: {
    image: '😾',
    text: 'Husk levanta la vista con su mirada cansada de siempre. "¿Qué quieres?" gruñe, aunque no parece tan malhumorado como pretende. Hay algo casi... amable en cómo acomoda su sombrero.',
    choices: [
      { label: '🎵 Pedirle que ponga música', next: 'husk_music' },
      { label: '💬 Preguntarle cómo está', next: 'husk_talk' },
      { label: '🃏 Retarlo a las cartas', next: 'husk_cards' },
    ]
  },
  husk_music: {
    image: '🎵',
    text: '"¿Música?" Husk bufó, pero giró hacia la vieja jukebox. Sus dedos encontraron Loser, Baby casi sin pensarlo. "No le digas a nadie que hice esto", murmuró, y tú juraste que vi una sonrisa pequeñísima bajo su bigote.',
    choices: [
      { label: '😊 Empezar a bailar', next: 'ending_good' },
      { label: '🕷️ Llamar a Angel a bailar', next: 'ending_dance' },
    ]
  },
  husk_talk: {
    image: '🐱',
    text: '"¿Cómo estoy?" Husk te miró un segundo más de lo normal. "Igual que siempre. Eternamente en el infierno sirviendo tragos." Pero luego, bajito, añadió: "...aunque hoy está tranquilo. No está tan mal."',
    choices: [
      { label: '💖 "Me alegra eso, Husk"', next: 'ending_good' },
      { label: '🍺 Pedir un trago para los dos', next: 'ending_drink' },
    ]
  },
  husk_cards: {
    image: '🃏',
    text: 'Husk arqueó una ceja. "¿Cartas conmigo? Vas a perder." Sacó un mazo de ninguna parte y empezaron a jugar. Tres manos después, tú ganabas. Husk te miró incrédulo. "...No eres tan mala idea después de todo."',
    choices: [
      { label: '🏆 Celebrar la victoria', next: 'ending_good' },
    ]
  },
  angel1: {
    image: '🕷️',
    text: 'Angel Dust giró dramáticamente en su taburete, sus seis brazos extendidos en pose teatral. "¡Ohhh, una visita! El infierno finalmente tiene buenas noticias." Sus ojos rosados brillaron con genuina alegría.',
    choices: [
      { label: '💬 Preguntarle por su música', next: 'angel_music' },
      { label: '🌟 Hacerle un cumplido', next: 'angel_compliment' },
      { label: '😾 Mencionar a Husk', next: 'angel_husk' },
    ]
  },
  angel_music: {
    image: '🎤',
    text: '"¿Mi música?" Angel se iluminó como si nunca hubiera tenido tanta atención genuina. "Poison es mía, ¿sabes? La escribí yo. Habla de..." dudó, más honesto de lo normal, "...de querer algo mejor para uno mismo."',
    choices: [
      { label: '💖 "Es la mejor canción que escuché"', next: 'ending_good' },
      { label: '🎵 Pedirle que cante algo', next: 'ending_dance' },
    ]
  },
  angel_compliment: {
    image: '🌟',
    text: 'Le dices que es increíble, talentoso, que merece mucho más de lo que tiene. Angel Dust te miró un segundo sin su pose dramática habitual. Sus ojos brillaron diferente. "Oye... gracias en serio. No mucha gente dice eso y lo dice de verdad."',
    choices: [
      { label: '🤝 Ofrecerle amistad', next: 'ending_good' },
    ]
  },
  angel_husk: {
    image: '🐱🕷️',
    text: '"¿Husk?" Angel sonrió de lado. "Es un gruñón con corazón de oro. Aunque nunca se lo digas, se le subiría el ego." Husk, desde el otro lado del bar, definitivamente escuchó, y definitivamente fingió no escuchar.',
    choices: [
      { label: '😄 "Los dos son adorables"', next: 'ending_dance' },
    ]
  },
  drink1: {
    image: '🍹',
    text: 'Husk te puso un vaso enfrente sin preguntar nada. "La casa invita", dijo, y eso sí que fue raro. Angel Dust susurró: "Solo hace eso con la gente que le cae bien. Buen presagio."',
    choices: [
      { label: '🥃 Brindar con los dos', next: 'ending_drink' },
      { label: '💬 Quedarse a platicar', next: 'ending_good' },
    ]
  },
  ending_good: {
    image: '🩷',
    text: 'Pasaste la noche en el mejor rincón del infierno. Con Husk y su gruñido que en realidad era cariño, y Angel con su risa que llenaba el bar. Al salir, el infierno se sentía un poco menos infernal. Eso, en el fondo, es lo que hace el Hotel: encontrar lo bueno incluso en el caos.',
    choices: [{ label: '🔄 Jugar de nuevo', next: 'start' }]
  },
  ending_dance: {
    image: '🎵🩷',
    text: 'Loser, Baby sonó por el bar y algo mágico pasó: todos bailaron. Husk medio se movió (aunque nunca lo admitiría), Angel bailó con todos sus brazos, y tú estuviste en el centro. En el infierno, en ese momento, todo fue perfecto.',
    choices: [{ label: '🔄 Jugar de nuevo', next: 'start' }]
  },
  ending_drink: {
    image: '🥃🩷',
    text: 'Los tres brindaron. Husk murmuró algo inaudible que sonó mucho a "salud". Angel levantó su copa dramáticamente. Y en ese momento, rodeada del caos y el neon y el whiskey del infierno, te sentiste completamente en casa.',
    choices: [{ label: '🔄 Jugar de nuevo', next: 'start' }]
  },
};

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
  currentAudio = document.getElementById('jukebox-audio');
  initLoadingScreen();
  initAudio();
  initNavigation();
  initJukebox();
  initGallery();
  initBar();
  initTabNavigation();
  initTrivia();
  initSoulsGame();
  initChat();
  initStory();
  initFinalSection();
  initClock();
  initDuoIntro();
});

// ========== LOADING SCREEN ==========
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const progress = document.getElementById('loading-progress');
  const loadingText = document.getElementById('loading-text');
  const messages = ['Calentando el infierno...', 'Preparando el Jukebox...', 'Convenciendo a Husk...', '¡Casi listo, Sof!'];
  let msgIdx = 0;

  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
      }, 400);
    } else {
      width += Math.random() * 25 + 5;
      if (width > 100) width = 100;
      progress.style.width = width + '%';
      if (width > (msgIdx + 1) * 25 && msgIdx < messages.length - 1) {
        msgIdx++;
        loadingText.textContent = messages[msgIdx];
      }
    }
  }, 250);
}

// ========== RELOJ INFERNAL ==========
function initClock() {
  function updateClock() {
    const now = new Date();
    const hours = String(23 - now.getHours() % 24).padStart(2, '0');
    const minutes = String(66 - now.getMinutes() % 60).padStart(2, '0');
    document.getElementById('hell-clock').textContent = `${hours}:${minutes}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(() => {
    document.getElementById('sin-counter').innerHTML = `❤️ ${Math.floor(Math.random() * 666 + 100)}`;
  }, 3000);
}

// ========== INTRO DUO ==========
function initDuoIntro() {
  const text = "Este pequeño rincón del infierno... es para ti, Sof.\n\nPorque incluso en el caos,\nalguien siempre se queda.";
  const introText = document.getElementById('intro-text');
  const enterBtn = document.getElementById('enter-btn');
  let i = 0;

  function type() {
    if (i < text.length) {
      introText.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
      i++;
      setTimeout(type, 35);
    } else {
      setTimeout(() => enterBtn.classList.remove('hidden'), 300);
    }
  }
  type();

  let hasPlayed = false;
  enterBtn.addEventListener('click', () => {
    document.getElementById('duo-intro').style.display = 'none';
    if (!hasPlayed) {
      hasPlayed = true;
      setTimeout(() => {
        const firstCard = document.querySelector('.song-card');
        if (firstCard) firstCard.querySelector('.play-song-btn').click();
      }, 400);
    }
  });
}

// ========== NAVEGACIÓN ==========
function initNavigation() {
  const dockBtns = document.querySelectorAll('.dock-btn');
  const sections = document.querySelectorAll('.section');

  dockBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sections.forEach(s => s.classList.remove('active'));
      dockBtns.forEach(b => b.classList.remove('active'));
      document.getElementById(btn.dataset.section).classList.add('active');
      btn.classList.add('active');
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });
}

// ========== TABS DEL BAR ==========
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const tab = document.getElementById(btn.dataset.tab + '-tab');
      if (tab) tab.classList.add('active');
    });
  });
}

// ========== AUDIO ==========
function initAudio() {
  currentAudio.volume = targetVolume;
  const volumeSlider = document.getElementById('volume-slider');
  volumeSlider.addEventListener('input', e => {
    targetVolume = parseFloat(e.target.value);
    currentAudio.volume = targetVolume;
  });

  currentAudio.addEventListener('play', () => {
    isPlaying = true;
    document.getElementById('vinyl').classList.add('spin');
    document.getElementById('tonearm').classList.add('playing');
    applySongTheme(currentAudio.src);
  });

  currentAudio.addEventListener('pause', () => {
    isPlaying = false;
    document.getElementById('vinyl').classList.remove('spin');
    document.getElementById('tonearm').classList.remove('playing');
    document.getElementById('now-playing').innerHTML = '⏸️ Pausado';
  });

  currentAudio.addEventListener('ended', () => {
    isPlaying = false;
    document.getElementById('vinyl').classList.remove('spin');
    document.getElementById('tonearm').classList.remove('playing');
    document.getElementById('now-playing').innerHTML = '⏹️ Terminado';
    document.querySelectorAll('.song-card').forEach(c => c.classList.remove('playing'));
    // Pasar a siguiente canción
    playNextSong();
  });
}

function playNextSong() {
  const cards = document.querySelectorAll('.song-card');
  let currentIdx = -1;
  cards.forEach((c, i) => { if (c.classList.contains('playing')) currentIdx = i; });
  const next = cards[(currentIdx + 1) % cards.length];
  if (next) next.querySelector('.play-song-btn').click();
}

// ========== JUKEBOX ==========
function initJukebox() {
  const songCards = document.querySelectorAll('.song-card');
  songCards.forEach(card => {
    const btn = card.querySelector('.play-song-btn');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const songUrl = card.dataset.url;
      let base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
      if (!base.endsWith('/')) base += '/';
      const fullUrl = base + songUrl;

      if (currentSong === fullUrl && isPlaying) {
        fadeOut(() => { card.classList.remove('playing'); });
      } else {
        switchSong(fullUrl, card, songCards, card.querySelector('.song-title').textContent);
      }
    });
  });
}

function switchSong(url, card, allCards, title) {
  if (isPlaying) {
    fadeOut(() => loadAndPlay(url, card, allCards, title));
  } else {
    loadAndPlay(url, card, allCards, title);
  }
}

function loadAndPlay(url, card, allCards, title) {
  clearInterval(fadeInterval);
  currentAudio.pause();
  currentAudio.src = url;
  currentAudio.load();
  currentSong = url;
  allCards.forEach(c => c.classList.remove('playing'));
  card.classList.add('playing');
  document.getElementById('vinyl-label').textContent = title.substring(0, 6).toUpperCase();
  currentAudio.volume = 0;
  currentAudio.play()
    .then(() => fadeIn(currentAudio))
    .catch(err => {
      console.error('Error al reproducir:', err);
      document.getElementById('now-playing').innerHTML = '❌ Error — verifica los archivos MP3';
    });
}

function fadeIn(audio) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(audio.volume + 0.04, targetVolume);
    } else {
      clearInterval(fadeInterval);
    }
  }, 80);
}

function fadeOut(callback) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (currentAudio.volume > 0.04) {
      currentAudio.volume -= 0.04;
    } else {
      clearInterval(fadeInterval);
      currentAudio.pause();
      currentAudio.volume = targetVolume;
      if (callback) callback();
    }
  }, 80);
}

function applySongTheme(songUrl) {
  document.body.classList.remove('theme-loser', 'theme-poison', 'theme-addict');
  document.querySelectorAll('.theme-video').forEach(v => {
    v.classList.remove('active');
    v.pause();
    v.currentTime = 0;
  });

  let theme = '', coverFile = '', songTitle = '';
  if (songUrl.includes('loser')) {
    theme = 'theme-loser'; coverFile = 'loserbabycaratula.jpeg'; songTitle = 'Loser, Baby';
    const vid = document.getElementById('video-loser');
    if (vid) { vid.classList.add('active'); vid.play().catch(() => {}); }
  } else if (songUrl.includes('poison')) {
    theme = 'theme-poison'; coverFile = 'poisoncaratula.jpeg'; songTitle = 'Poison';
    const vid = document.getElementById('video-poison');
    if (vid) { vid.classList.add('active'); vid.play().catch(() => {}); }
  } else if (songUrl.includes('addict')) {
    theme = 'theme-addict'; coverFile = 'addictcaratula.jpeg'; songTitle = 'Addict';
    const vid = document.getElementById('video-addict');
    if (vid) { vid.classList.add('active'); vid.play().catch(() => {}); }
  }

  if (theme) document.body.classList.add(theme);
  if (coverFile) updateVinylCover(coverFile, songTitle);
  document.getElementById('now-playing').innerHTML = `🎵 Sonando: ${songTitle}`;
}

function updateVinylCover(imageFile, songTitle) {
  const vinyl = document.getElementById('vinyl');
  const vinylLabel = document.getElementById('vinyl-label');
  const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = base + 'images/' + imageFile;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.filter = 'blur(8px) brightness(0.8) contrast(1.2)';
    ctx.drawImage(img, 0, 0, 200, 200);
    ctx.filter = 'none';
    const g = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
    g.addColorStop(0, 'rgba(0,0,0,0.1)');
    g.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 200, 200);
    vinyl.style.backgroundImage = `url('${canvas.toDataURL()}')`;
    vinyl.classList.add('has-cover');
    if (vinylLabel) vinylLabel.textContent = songTitle.substring(0, 6).toUpperCase();
  };
}

// ========== GALERÍA ==========
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');

  function renderGallery(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? galleryImages : galleryImages.filter(i => i.category === filter);
    if (!filtered.length) {
      grid.innerHTML = '<p style="color:#888;text-align:center;padding:20px">No hay imágenes aquí</p>';
      return;
    }
    filtered.forEach((img, idx) => {
      if (img.category === 'nosotros') return; // se muestra arriba ya
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.style.animationDelay = `${idx * 0.05}s`;
      card.innerHTML = `
        <img src="${img.src}" alt="${img.alt}" loading="lazy"
          onerror="this.parentElement.style.display='none'">
        <div class="card-overlay">${img.title}</div>`;
      card.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalCaption.innerHTML = img.title;
      });
      grid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Mostrar/ocultar foto especial
      const special = document.getElementById('special-photo-wrapper');
      if (btn.dataset.filter === 'nosotros' || btn.dataset.filter === 'all') {
        special.style.display = '';
      } else {
        special.style.display = 'none';
      }
      renderGallery(btn.dataset.filter);
    });
  });

  document.querySelector('.close-modal').addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  renderGallery('all');
}

// ========== BAR ==========
function initBar() {
  const orderBtn = document.getElementById('order-random-btn');
  const drinkResult = document.getElementById('drink-result');
  const huskSpeech = document.getElementById('husk-speech');
  const drinkItems = document.querySelectorAll('.drink-item');

  const huskPhrases = {
    whiskey: ['Whiskey del infierno... como mi ex. Toma.', 'Esto quema más que tu futuro. Salú.', 'Para olvidar que existes.'],
    cocktail: ["El Angel's Kiss... asquerosamente dulce.", 'Con este te creerás bonito. No funciona.', 'Una copa rosa para el alma negra.'],
    beer: ['Cerveza de Charlie. La única bebida optimista.', 'Sabe a esperanza fallida. Disfruta.', 'La más suave... para los débiles.'],
    special: ['La casa nunca gana... excepto cuando gana.', 'Secreto de la casa: no preguntes qué tiene.', 'Una vez alguien sobrevivió a esto. Una vez.'],
  };

  drinkItems.forEach(item => {
    item.addEventListener('click', () => {
      drinkItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });

  orderBtn.addEventListener('click', () => {
    const selected = document.querySelector('.drink-item.selected');
    const type = selected ? selected.dataset.drink : 'special';
    const phrases = huskPhrases[type] || huskPhrases.special;
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    huskSpeech.textContent = `"${phrase}"`;
    const names = { whiskey: '🥃 Whiskey del infierno', cocktail: "🍹 Angel's Kiss", beer: '🍺 Cerveza de Charlie', special: '🎲 La casa nunca gana' };
    drinkResult.innerHTML = `<strong>${names[type]}</strong><br><span style="color:#ff0055">${phrase}</span>`;
    if (navigator.vibrate) navigator.vibrate(50);
  });
}

// ========== TRIVIA ==========
function initTrivia() {
  let lives = 3, score = 0, streak = 0, questionIdx = 0;
  let shuffled = [];
  let active = false;

  const startBtn = document.getElementById('trivia-start-btn');
  const retryBtn = document.getElementById('trivia-retry-btn');

  startBtn.addEventListener('click', startTrivia);
  retryBtn.addEventListener('click', startTrivia);

  function startTrivia() {
    lives = 3; score = 0; streak = 0; questionIdx = 0; active = true;
    shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5);
    document.getElementById('trivia-end').classList.add('hidden');
    startBtn.style.display = 'none';
    updateHUD();
    showQuestion();
  }

  function updateHUD() {
    document.getElementById('trivia-lives').textContent = '❤️'.repeat(lives) || '💔';
    document.getElementById('trivia-score').textContent = score;
    document.getElementById('trivia-streak').textContent = streak;
  }

  function showQuestion() {
    if (questionIdx >= shuffled.length) { endTrivia(true); return; }
    const q = shuffled[questionIdx];
    document.getElementById('trivia-question').textContent = q.q;
    document.getElementById('trivia-feedback').textContent = '';

    const opts = document.getElementById('trivia-options');
    opts.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(i, q, btn));
      opts.appendChild(btn);
    });

    setHuskComment('question');
  }

  function handleAnswer(idx, q, btn) {
    if (!active) return;
    const allBtns = document.querySelectorAll('.trivia-option');
    allBtns.forEach(b => b.disabled = true);
    allBtns[q.correct].classList.add('correct');

    if (idx === q.correct) {
      streak++;
      const pts = 5 + (streak > 2 ? 5 : 0);
      score += pts;
      triviaScore = score;
      document.getElementById('trivia-feedback').textContent = `✅ +${pts} pts ${streak > 2 ? '🔥 RACHA!' : ''}`;
      document.getElementById('trivia-feedback').style.color = '#00ff80';
      setHuskComment('correct');
    } else {
      btn.classList.add('wrong');
      lives--;
      streak = 0;
      document.getElementById('trivia-feedback').textContent = `❌ Era: ${q.opts[q.correct]}`;
      document.getElementById('trivia-feedback').style.color = '#ff6699';
      setHuskComment('wrong');
    }

    document.getElementById('trivia-husk-comment').querySelector('span:last-child').textContent = q.fun;
    updateHUD();
    updateLockProgress();

    if (lives <= 0) { setTimeout(() => endTrivia(false), 1200); return; }
    questionIdx++;
    setTimeout(showQuestion, 1500);
  }

  function setHuskComment(type) {
    const comments = {
      question: ['😾 "Demuéstrame que sabes algo..."', '😾 "Tic tac, tic tac..."', '😾 "No te hagas la lista..."'],
      correct: ['😾 "... No estás tan mal."', '😾 "Suerte de principiante."', '😽 "Mmm. Correcto."'],
      wrong: ['😾 "Ja. Lo sabía."', '😾 "Debería cobrarte por esa."', '😾 "Patético. Pero puedes hacerlo mejor."'],
    };
    const list = comments[type] || comments.question;
    document.getElementById('trivia-comment-text').textContent = list[Math.floor(Math.random() * list.length)];
  }

  function endTrivia(won) {
    active = false;
    const endDiv = document.getElementById('trivia-end');
    endDiv.classList.remove('hidden');
    document.getElementById('trivia-end-title').textContent = won ? '🏆 ¡Eres una experta en Hazbin!' : '💀 Fin del juego';
    document.getElementById('trivia-end-score').textContent = `Puntuación final: ${score} puntos`;
    triviaScore = score;
    updateLockProgress();
  }
}

function updateLockProgress() {
  const pct = Math.min((triviaScore / UNLOCK_SCORE) * 100, 100);
  const bar = document.getElementById('lock-progress-bar');
  const hint = document.getElementById('lock-score-hint');
  if (bar) bar.style.width = pct + '%';
  if (hint) hint.textContent = `${triviaScore} / ${UNLOCK_SCORE} puntos necesarios`;

  if (triviaScore >= UNLOCK_SCORE && !finalUnlocked) {
    finalUnlocked = true;
    unlockFinal();
  }
}

function unlockFinal() {
  const locked = document.getElementById('final-locked');
  const reveal = document.getElementById('final-reveal');
  if (!locked || !reveal) return;
  locked.innerHTML = `
    <div style="text-align:center;padding:30px">
      <div style="font-size:3rem;margin-bottom:15px">🔓</div>
      <p style="color:#d4af37;font-weight:700;font-size:1.1rem">¡Desbloqueado!</p>
      <p style="color:#aaa;margin-top:8px">Toca "Para Sof" en la barra de abajo 🩷</p>
    </div>`;

  // Actualizar ícono del dock
  const finalDockBtn = document.querySelector('.dock-btn[data-section="final"]');
  if (finalDockBtn) {
    finalDockBtn.style.color = '#ff69b4';
    finalDockBtn.style.animation = 'pulse 1s infinite';
  }

  setTimeout(() => {
    locked.style.display = 'none';
    reveal.classList.remove('hidden');
    spawnParticles();
  }, 1500);
}

// ========== MINIJUEGO: ATRAPA ALMAS ==========
function initSoulsGame() {
  const startBtn = document.getElementById('souls-start-btn');
  if (!startBtn) return;
  startBtn.addEventListener('click', startSoulsGame);
}

function startSoulsGame() {
  const arena = document.getElementById('souls-arena');
  let score = 0, misses = 0, timeLeft = 30;
  const MAX_MISSES = 5;

  document.getElementById('souls-start-msg').style.display = 'none';
  document.getElementById('souls-score').textContent = '0';
  document.getElementById('souls-misses').textContent = '0';
  document.getElementById('souls-timer').textContent = '30';

  const angelComments = [
    'Angel: "¡Eso es, cariño! ¡Más!"',
    'Angel: "Oooh, te estás calentando..."',
    'Angel: "¡Wow, eres rápida!"',
    'Angel: "¿Eso es todo lo que tienes?"',
    'Angel: "¡Sigue así, bebé! 🕷️"',
    'Angel: "Husk, ¡mira qué buena es!"',
  ];

  const huskComments = [
    'Husk: "No está mal... supongo."',
    'Husk: "Meh."',
    'Husk: "Sigue así y te invito un trago."',
  ];

  function updateComment() {
    const comments = score > 5 ? angelComments : huskComments;
    document.getElementById('souls-comment-text').textContent = comments[Math.floor(Math.random() * comments.length)];
  }

  // Timer
  const timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('souls-timer').textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  // Spawn targets
  const spawnInterval = setInterval(() => {
    if (timeLeft <= 0) return;
    const isSoul = Math.random() > 0.3;
    const target = document.createElement('div');
    target.className = `soul-target ${isSoul ? 'soul' : 'skull'}`;
    target.textContent = isSoul ? '👻' : '💀';

    const arenaRect = arena.getBoundingClientRect();
    const x = Math.random() * (arenaRect.width - 60) + 10;
    const y = Math.random() * (arenaRect.height - 80) + 10;
    target.style.left = x + 'px';
    target.style.top = y + 'px';

    target.addEventListener('pointerdown', e => {
      e.stopPropagation();
      if (target.classList.contains('caught')) return;
      target.classList.add('caught');

      if (isSoul) {
        score++;
        document.getElementById('souls-score').textContent = score;
        if (score % 3 === 0) updateComment();
      } else {
        misses++;
        document.getElementById('souls-misses').textContent = misses;
        target.textContent = '💥';
        if (misses >= MAX_MISSES) { clearInterval(timerInterval); clearInterval(spawnInterval); endGame(); }
      }

      setTimeout(() => target.remove(), 300);
    });

    // Auto-remove
    arena.appendChild(target);
    const lifetime = 1500 + Math.random() * 1000;
    setTimeout(() => {
      if (!target.classList.contains('caught')) {
        if (isSoul) {
          misses++;
          document.getElementById('souls-misses').textContent = misses;
          if (misses >= MAX_MISSES) { clearInterval(timerInterval); clearInterval(spawnInterval); endGame(); }
        }
        target.remove();
      }
    }, lifetime);

  }, Math.max(600, 1200 - score * 30)); // se acelera con el score

  function endGame() {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    arena.querySelectorAll('.soul-target').forEach(t => t.remove());

    const msg = score >= 20 ? '🏆 ¡IMPRESIONANTE!' : score >= 10 ? '⭐ ¡Buen trabajo!' : '🎮 ¡Sigue practicando!';
    arena.innerHTML = `
      <div class="souls-start-msg">
        <div class="souls-big-emoji">${score >= 15 ? '🌟' : '👻'}</div>
        <p style="font-size:1.2rem;font-weight:700;color:#d4af37">${msg}</p>
        <p style="color:#fff">Atrapaste ${score} almas 👻</p>
        <p style="color:#ff6699">Fallaste ${misses} veces 💀</p>
        <button class="game-btn" onclick="startSoulsGame()" style="margin-top:15px">🔄 JUGAR DE NUEVO</button>
      </div>`;

    // Bonus de puntos hacia final unlock
    triviaScore += Math.floor(score / 2);
    updateLockProgress();

    document.getElementById('souls-comment-text').textContent =
      score >= 15 ? 'Angel: "¡DIOS MÍO, eres una leyenda! 🕷️"' : 'Husk: "... No está mal del todo."';
  }
}

// ========== CHAT CON IA ==========
const chatSystemPrompts = {
  husk: `Eres Husk de Hazbin Hotel. Eres un gato alado grande y gruñón, ex-señor de los juegos que perdió su alma en una apuesta con Alastor. Ahora trabajas como bartender en el Hotel Hazbin. Tu personalidad: eres brusco, sarcástico y de pocas palabras, pero en el fondo tienes un corazón de oro y te preocupas por las personas aunque nunca lo admitas. Hablas en español de forma casual. Usas frases cortas y contundentes. A veces sueltas humor negro. Puedes mencionar a Angel Dust con quien tienes una relación complicada (son amigos aunque él te irrite). NUNCA seas amable en exceso, siempre gruñe primero. Máximo 3-4 oraciones por respuesta.`,
  angel: `Eres Angel Dust de Hazbin Hotel. Eres una araña demonio con 6 brazos, ex-actor del crimen organizado. Eres dramático, coqueto y con humor picante, pero tienes una capa de vulnerabilidad que raramente muestras. Te gusta el protagonismo y los chistes de doble sentido (sin ser explícito). Hablas en español de forma casual y teatral. Usas expresiones como "cariño", "bebé", "honey". En el fondo eres muy leal con quien te importa. Puedes mencionar a Husk (tu amigo gruñón favorito), a Fat Nuggets (tu cerdo adorado). Máximo 3-4 oraciones por respuesta. Sé divertido y con personalidad, no vulgar.`
};

let chatCharacter = 'husk';
let chatHistory = [];

function initChat() {
  const charBtns = document.querySelectorAll('.char-btn');
  const sendBtn = document.getElementById('chat-send-btn');
  const input = document.getElementById('chat-input');

  charBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      charBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chatCharacter = btn.dataset.char;
      switchChatCharacter(chatCharacter);
    });
  });

  sendBtn.addEventListener('click', sendChatMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

function switchChatCharacter(char) {
  chatHistory = [];
  const messagesDiv = document.getElementById('chat-messages');
  document.getElementById('chat-avatar').textContent = char === 'husk' ? '😾' : '🕷️';
  document.getElementById('chat-name').textContent = char === 'husk' ? 'Husk' : 'Angel Dust';
  const greeting = char === 'husk'
    ? '¿Qué quieres? No tengo todo el día... bueno, técnicamente tengo la eternidad, pero igualmente.'
    : '¡Ohhh, alguien quiere hablar conmigo! Smart choice, cariño. 🕷️';
  messagesDiv.innerHTML = `<div class="chat-bubble bot-bubble"><span>${greeting}</span></div>`;
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  const messagesDiv = document.getElementById('chat-messages');
  const loading = document.getElementById('chat-loading');

  // Añadir burbuja del usuario
  messagesDiv.innerHTML += `<div class="chat-bubble user-bubble"><span>${msg}</span></div>`;
  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Mostrar typing
  loading.classList.remove('hidden');

  // Historial para la API
  chatHistory.push({ role: 'user', content: msg });
  if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: chatSystemPrompts[chatCharacter],
        messages: chatHistory,
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || '...';

    chatHistory.push({ role: 'assistant', content: reply });
    loading.classList.add('hidden');

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot-bubble';
    bubble.innerHTML = `<span>${reply}</span>`;
    messagesDiv.appendChild(bubble);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  } catch (err) {
    loading.classList.add('hidden');
    // Fallback offline con respuestas pregrabadas
    const fallback = getFallbackReply(chatCharacter, msg);
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot-bubble';
    bubble.innerHTML = `<span>${fallback}</span>`;
    messagesDiv.appendChild(bubble);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

function getFallbackReply(char, msg) {
  const huskFallbacks = [
    '¿Y qué se supone que debo decir a eso? ... Meh.',
    'Interesante. Ahora déjame en paz.',
    'No pago para pensar en respuestas profundas. Soy bartender.',
    'Eso es lo más ridículo que he escuchado. Y escucho a Angel todo el día.',
    '...¿Y? Toma, un trago. Te lo explica mejor que yo.',
  ];
  const angelFallbacks = [
    '¡Oh honey, qué interesante! Cuéntame más, cariño. 🕷️',
    'Espera espera espera. ¿EN SERIO? Drama. Total drama.',
    '¡Eso es increíble! Soy la única que sabe apreciarlo.',
    '¿Le dijiste eso a Husk? Porque su cara ahora mismo sería ÉPICA.',
    'Oye, para eso estoy yo. Para hacer que todo sea más interesante. 🕷️',
  ];
  const list = char === 'husk' ? huskFallbacks : angelFallbacks;
  return list[Math.floor(Math.random() * list.length)];
}

// ========== HISTORIA INTERACTIVA ==========
let currentNode = 'start';
let storyDepth = 0;

function initStory() {
  renderStoryNode('start');
}

function renderStoryNode(nodeId) {
  const node = storyNodes[nodeId];
  if (!node) return;
  currentNode = nodeId;

  document.getElementById('story-image').textContent = node.image;
  const textEl = document.getElementById('story-text');
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent = node.text;
    textEl.style.transition = 'opacity 0.5s ease';
    textEl.style.opacity = '1';
  }, 100);

  const choicesEl = document.getElementById('story-choices');
  choicesEl.innerHTML = '';
  node.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'story-choice-btn';
    btn.textContent = choice.label;
    btn.addEventListener('click', () => {
      if (choice.next === 'start') {
        storyDepth = 0;
        renderStoryNode('start');
      } else {
        storyDepth++;
        renderStoryNode(choice.next);
      }
      updateStoryProgress();
    });
    choicesEl.appendChild(btn);
  });
}

function updateStoryProgress() {
  const pct = Math.min((storyDepth / 4) * 100, 100);
  document.getElementById('story-progress-bar').style.width = pct + '%';
  if (storyDepth >= 3) {
    triviaScore += 3;
    updateLockProgress();
  }
}

// ========== MENSAJE FINAL ==========
function initFinalSection() {
  const replayBtn = document.getElementById('final-replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Navegar a lounge y reproducir Loser Baby
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('lounge').classList.add('active');
      document.querySelector('.dock-btn[data-section="lounge"]').classList.add('active');
      const loserCard = document.querySelector('.song-card[data-song="loser"]');
      if (loserCard) loserCard.querySelector('.play-song-btn').click();
    });
  }

  // Si ya tenía puntos (no debería en primera visita, pero por si acaso)
  updateLockProgress();
}

function spawnParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  const colors = ['#ff69b4', '#d4af37', '#ff0055', '#ffffff', '#ffb6c1', '#ffd700'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 6 + 4) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 4 + 3) + 's';
    p.style.animationDelay = (Math.random() * 3) + 's';
    container.appendChild(p);
  }
}

// ========== FEEDBACK TÁCTIL ==========
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, .drink-item, .gallery-card').forEach(el => {
    el.addEventListener('touchstart', () => { el.style.transform = 'scale(0.97)'; }, { passive: true });
    el.addEventListener('touchend', () => { el.style.transform = ''; }, { passive: true });
  });
});

console.log('🔥 Hazbin Hotel — Para Sof 🩷');