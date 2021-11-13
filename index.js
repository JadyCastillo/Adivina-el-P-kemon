ReactDOM.render(<Menu />, document.querySelector("#root"));

let pokemon;
let adivinarPokemon;
const maximo = 807;
let url = "https://pokeapi.co/api/v2/pokemon/";
const minimo = 1;
let arrayLetrasPokemones = [];
let intentos = 4;
let pokemonesAdivinados = [];
let puntos = 0;
let pausa = false;
const sonidoPokemonAcertado = new Audio("./assets/win.mp3");
const sonidoPokemonFallado = new Audio("./assets/lose.mp3");
const sonidoGanador = new Audio("./assets/ganador.mp3");
let letrasIncorrectas = [];

const obtenerDatosPokemon = () => {
    const index = Math.floor(Math.random() * (maximo - minimo) + minimo);
    axios.get(url + index).then(({ data }) => {
        pokemon = {
            id: data.id,
            name: data.name.toUpperCase(),
            imagen: data.sprites.other.home.front_default,
        };
        obtenerPokemon();
    });
};

const obtenerPokemon = () => {
    adivinarPokemon = pokemon.name;
    if (
        pokemonesAdivinados.length > 0 &&
        pokemonesAdivinados.includes(adivinarPokemon)
    ) {
        obtenerDatosPokemon();
    } else {
        for (let index = 0; index < adivinarPokemon.length; index++) {
            arrayLetrasPokemones.push("_");
        }
        actualizarPantalla();
    }
};

const iniciarJuego = () => {
    obtenerDatosPokemon();
    //obtenerPokemon();
    //actualizarPantalla();
};

const reiniciarJuego = () => {
    if (pokemonesAdivinados.length === 10) {
        sonidoGanador.play();
        pokemonesAdivinados = [];
        puntos = 0;
        setTimeout(reiniciarJuego, 4000);
    } else {
        pausa = false;
        document.getElementById("bienvenida").className = "mensajeBienvenida";
        arrayLetrasPokemones = [];
        obtenerDatosPokemon();
    }
};

const actualizarPantalla = () => {
    document.getElementById("pokemon").setAttribute("src", pokemon.imagen);
    document.getElementById("totalPalabras").innerText = puntos;
    document.getElementById("adivinarPalabra").innerText =
        arrayLetrasPokemones.join("");
    document.getElementById("intentosRestantes").innerText = intentos;
    document.getElementById("letrasIncorrectas").innerText =
        letrasIncorrectas.join("-");
};

document.onkeydown = (e) => {
    if (comprobarCaracter(e.key) && pausa === false) {
        validarLetra(e.key.toUpperCase());
    }
    document.getElementById("bienvenida").className = "noMensajeBienvenida";
};

const comprobarCaracter = (caracter) => {
    return (
        typeof caracter === "string" &&
        caracter.length === 1 &&
        ((caracter >= "a" && caracter <= "z") ||
            (caracter >= "A" && caracter <= "Z"))
    );
};

const validarLetra = (letra) => {
    let letraEncontrada = false;
    for (let index = 0; index < adivinarPokemon.length; index++) {
        if (letra === adivinarPokemon[index]) {
            arrayLetrasPokemones[index] = letra;
            letraEncontrada = true;
            if (arrayLetrasPokemones.join("") === adivinarPokemon) {
                puntos++;
                pausa = true;
                letrasIncorrectas = [];
                intentos = 4;
                pokemonesAdivinados.push(adivinarPokemon);
                sonidoPokemonAcertado.play();
                actualizarPantalla();
                setTimeout(reiniciarJuego, 4000);
            }
        }
    }
    if (letraEncontrada === false) {
        if (letrasIncorrectas.includes(letra) === false) {
            letrasIncorrectas.push(letra);
            intentos--;
        }
        if (intentos === 0) {
            sonidoPokemonFallado.play();
            pausa = true;
            intentos = 4;
            letrasIncorrectas = [];
            setTimeout(reiniciarJuego, 4000);
        }
    }
    actualizarPantalla();
};

iniciarJuego();
