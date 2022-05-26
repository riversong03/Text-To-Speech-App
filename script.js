const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [{
        image: './assets/img/guinea-pigs.jpg',
        text: "Guinea Pigs"
    },
    {
        image: './assets/img/hedgehog.jpg',
        text: "Hedgehog"
    },
    {
        image: './assets/img/kitty.jpg',
        text: "Kitten"
    },
    {
        image: './assets/img/lemurs.jpg',
        text: "Lemurs"
    },
    {
        image: './assets/img/owl.jpg',
        text: "Owl"
    },
    {
        image: './assets/img/peacock.jpg',
        text: "Peacock"
    },
    {
        image: './assets/img/rhinos.jpg',
        text: "Rhinocerous"
    },
    {
        image: './assets/img/rooster.jpg',
        text: "Chicken"
    },
    {
        image: './assets/img/squirrel.jpg',
        text: "Squirrel"
    },
    {
        image: './assets/img/tiger.jpg',
        text: "Tiger"
    },
    {
        image: './assets/img/zebras.jpg',
        text: "Zebras"
    }
];


data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
     `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    })

    main.appendChild(box);
}


// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

// Get voice options from API
function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}


// Set text
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}


// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);


// Toggle text box 
toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
);

// Close button 
closeBtn.addEventListener(
    'click', () => document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

getVoices();