const Menu = () => {
    return (
        <div>
            <h1 class="titulo">
                <img
                    src="./assets/pokeapi_256.png"
                    alt="PokéApi"
                    class="imgPokeApi"
                />
                Adivina el Pókemon
            </h1>
            <p>
                <h3 id="bienvenida" class="mensajeBienvenida">
                    !Presiona cualquier tecla para empezar!
                </h3>
            </p>
            <br />
            <img alt="Pokémon" class="imgPokemon" id="pokemon" />
            <div class="palabra">
                <h4>
                    Nombre : <span id="adivinarPalabra"></span>
                </h4>
            </div>
            <br />
            <div class="necesitoEspacio">
                <h4>
                    Puntos:
                    <span class="variableColor">
                        <span id="totalPalabras"></span>
                        /10
                    </span>
                </h4>
            </div>
            <div class="necesitoEspacio">
                <h4>
                    Intentos Restantes:
                    <span id="intentosRestantes" class="variableColor"></span>
                </h4>
            </div>
            <div class="necesitoEspacio">
                <h4>
                    Letras Incorrectas:
                    <span id="letrasIncorrectas" class="variableColor"></span>
                </h4>
            </div>
        </div>
    );
};
