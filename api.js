async function fetchPersonajes() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        return data.results.slice(0, 20);
    } catch (error) {
        console.error('No se cargaron los personajes', error);
        return [];
    }
}

function crearPersonajesCard(character) {
    const col = document.createElement('div');
    col.className = 'col';

    col.innerHTML = `
        <div class="card h-100">
            <img src="${character.image}" class="card-img-top fs-6 " alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <span class="badge bg-success text-white fs-5">${character.species}</span>
            </div>
        </div>
    `;
    return col;
}

async function renderPersonajes() {
    const container = document.getElementById('characters-container');
    container.innerHTML = '';

    const characters = await fetchPersonajes();

    if (characters.length === 0) {
        container.innerHTML = '<div class="alert alert-danger">No se cargaron</div>';
        return;
    }

    characters.forEach(character => {
        const card = crearPersonajesCard(character);
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderPersonajes);