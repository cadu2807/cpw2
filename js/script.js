// script.js

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
        } else {
            document.getElementById('results').innerHTML = `<p>Nenhum resultado encontrado.</p>`;
        }
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    const audioContainer = document.getElementById('audio-container');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    resultsDiv.innerHTML = '';

    data.forEach(entry => {
        const word = entry.word;
        const phonetic = entry.phonetic || 'Não disponível';
        const meanings = entry.meanings.map(meaning => 
            `<li>${meaning.partOfSpeech}: ${meaning.definitions.map(def => def.definition).join(', ')}</li>`
        ).join('');
        
        resultsDiv.innerHTML += `
            <div class="result-item" onclick="playAudio('${entry.word}')">
                <h3>${word}</h3>
                <p><em>${phonetic}</em></p>
                <ul>${meanings}</ul>
                <button class="details-button" onclick="viewDetails('${word}'); event.stopPropagation();">Ver mais detalhes</button>
            </div>
        `;

        // Atualize a URL do áudio
        if (entry.phonetics && entry.phonetics[0] && entry.phonetics[0].audio) {
            audioSource.src = entry.phonetics[0].audio;
            audioContainer.style.display = 'block'; 
        } else {
            audioContainer.style.display = 'none'; 
        }
    });
}

function playAudio(word) {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
        audioPlayer.play();
    }
}

function viewDetails(word) {
    window.location.href = `details.html?word=${encodeURIComponent(word)}`;
}
