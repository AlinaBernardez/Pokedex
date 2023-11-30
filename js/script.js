const searchInput= document.getElementById('searchInput')
const seatchBtn= document.getElementById('searchBtn')
const prevBtn= document.getElementById('prevBtn')
const nextBtn= document.getElementById('nextBtn')
const resetBtn= document.getElementById('resetBtn')
const appdiv= document.getElementById('app')
const favBtn= document.getElementById('favBtn')
const favoritos = document.getElementById('favoritos')

let next;
let prev;

localStorage.clear();

const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/?limit=10'

const getData = async(url) => {
    appdiv.innerHTML = '';
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('Error!')
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Algo no funciona!')
    }
};

const getPokemon = async(url) => {
    const info = await getData(url);
    next = info.next
    prev = info.previous
    const listaPokemon = info.results;
    listaPokemon.forEach(poke => {
        const pokemon = async() => {
            let pokeUrl = poke.url
            cadaPokemon = await getData(pokeUrl)
            let html = `
            <div class='card'>
            <img src="${cadaPokemon.sprites["front_front"]}" />
                <h1>${cadaPokemon.name}</h1>
            </div>
            `
            appdiv.innerHTML += html
            const card = document.querySelectorAll('.card')
            card.forEach((item, i) => {
                item.addEventListener('click', () => {
                    localStorage.setItem('PokeFav'[i], item)
                    console.log(localStorage)
                })
            })
        }
        pokemon();
    })
}

getPokemon(POKEAPI);



nextBtn.addEventListener('click', () => {
    if(next !== null) {
        getPokemon(next)
    }
});

prevBtn.addEventListener('click', () => {
    if(prev !== null) {
        getPokemon(prev)
    }
});

const getFavoirtos = () => {
    console.log(localStorage)
    localStorage.getItem('PokeFav')
}

getFavoirtos();

