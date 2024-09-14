// details.js

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const word = urlParams.get('word');
    
    if (word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (response.ok) {
            displayDetails(data);
        } else {
            document.getElementById('details').innerHTML = `<p>Nenhum detalhe encontrado.</p>`;
        }
    }
};

function displayDetails(data) {
    const detailsDiv = document.getElementById('details');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    detailsDiv.innerHTML = '';

    data.forEach(entry => {
        const word = entry.word;
        const phonetic = entry.phonetic || 'Não disponível';
        const meanings = entry.meanings.map(meaning => 
            `<li>${meaning.partOfSpeech}: ${meaning.definitions.map(def => def.definition).join(', ')}</li>`
        ).join('');
        
        detailsDiv.innerHTML = `
            <h1>${word}</h1>
            <p><em>${phonetic}</em></p>
            <ul>${meanings}</ul>
        `;

        // Atualize a URL do áudio
        if (entry.phonetics && entry.phonetics[0] && entry.phonetics[0].audio) {
            audioSource.src = entry.phonetics[0].audio;
            audioPlayer.style.display = 'block'; // Garanta que o player é exibido
        } else {
            audioPlayer.style.display = 'none'; // Oculta o player se não houver URL de áudio
        }
    });
}

function goBack() {
    window.history.back();
}
