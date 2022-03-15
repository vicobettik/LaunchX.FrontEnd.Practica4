const nombre = document.getElementById('nombrePokemon');
const foto = document.getElementById('foto');
const fotoBack = document.getElementById('fotoBack');
const movesTable = document.getElementById('movesTable');
const nMoves = document.getElementById('nMoves');
const tiposDiv = document.getElementById('tiposDiv');
const result = document.getElementById('result');
const noResult = document.getElementById('noResult');

let nombreStats = [];
let valueStats = [];

document.addEventListener("DOMContentLoaded", function(event) {
    result.style.display = "none";
    noResult.style.display = "block";
});

const fetchPokemon = async(pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const res = await fetch(url,{
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    });
console.log(res)
    if (res.status != 200) {
        result.style.display = "none";
        noResult.style.display = "block";
        alert('No se encontró ese pokémon')
    }

    const data = await res.json();
    const moves = data.moves;
    const stats = data.stats;
    const types = data.types;

    limpiarTabla();
    limpiarTipos();
    limpiarStats();

    if (moves.length != 0) {
        let n = 1;
        nMoves.innerText = moves.length;
        moves.forEach( ({move}) => {
            var row = movesTable.insertRow(-1);
            
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = n;
            cell2.innerHTML = move.name;
            n++;
        });
    }

    if (stats.length != 0) {
        let n = 1;
        stats.forEach( (stat) => {
            valueStats.push(stat.base_stat);
            nombreStats.push(stat.stat.name);
        });
    }

    if (types.length != 0) {
        let n = 1;
        types.forEach( ({type}) => {
            var img = document.createElement('img');
            img.src = `./assets/img/${type.name}.gif`
            tiposDiv.append(img);
        });
    }


    document.querySelector(".chartEstadisticas").innerHTML = '<canvas id="myChart" width="400" height="400"></canvas>';
    
    let ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: nombreStats,
            datasets: [{
                label: 'Estadísticas',
                data: valueStats,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
        
        }
    });


    nombre.innerText = data.name.toUpperCase();
    foto.src = data.sprites.front_default;
    fotoBack.src = data.sprites.back_default;

    result.style.display = "block";
    noResult.style.display = "none";

}


const imprimir = () => {
    const pokeName = document.getElementById('pokeName');
    let pokeInput = pokeName.value.toLowerCase();

    fetchPokemon(pokeInput);
    
}

const random = () => {
    let number = Math.floor(Math.random() * (800 - 1) + 1)
    console.log(number)
    fetchPokemon(number);
    
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}

const limpiarTabla = () => {
    movesTable.innerHTML = "";
}

const limpiarTipos = () => {
    tiposDiv.innerHTML = "";
}

const limpiarStats = () => {
    nombreStats = [];
    valueStats = [];
}