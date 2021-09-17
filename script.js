const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function tellJoke(joke) {
  VoiceRSS.speech({
    key: 'cb6f150501864808b1ed2b3bc1af333d',
    src: joke,
    hl: 'en-gb',
    v: '',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get Jokes from Joke API
async function getJoke() {
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    let joke = '';
    const response = await fetch(apiUrl);
    const data = await response.json();
    if ( data.type === 'single' ) {
      joke = data.joke;
    } else if (data.type === 'twopart') {
      joke = data.setup + ' ' + data.delivery;
    } else {
      console.error('Could not locate a joke!');
    }
    tellJoke(joke);
  } catch(error) {
    // Catch errors here
    console.error('Whoops: ', error);
  }
}

button.addEventListener('click', getJoke);

// disable button while audio is playing
audioElement.addEventListener('play', () => {
  button.disabled = true;
  button.classList.add('disableHover');
});
audioElement.addEventListener('ended', () => {
  button.disabled = false;
  button.classList.remove('disableHover');
});