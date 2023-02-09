import * as stats from './stats.js';

const player1PokeWebHook = document.getElementById('Player1Pokemon');
const player2PokeWebHook = document.getElementById('Player2Pokemon');

const loadPokemonFromAPI = async (id, playerNumber, pokeObject, level = 100) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokeman = await res.json();
	return displayPokemonToWebpage(pokeman, playerNumber, pokeObject, level);
};

//The popup for when you click a pokemon, using pulled data
const displayPokemonToWebpage = (thePokemon, playerNumber, pokeObject, level) => {
	const typeStr = thePokemon.types.map((type) => type.type.name).join(',');
	var typeArray = typeStr.split(',');

	const statNumStr = thePokemon.stats.map((stat) => stat.base_stat).join(',');
	var statArray = statNumStr.split(',');

	var calcHealth = stats.calculateMaxHP(statArray[0], level);

	//Used to create the nice icons showing pokemon type
	var iconStringHolder = '';

	//set the object that was passed in: don't need to import it then!
	pokeObject.setPokemon(thePokemon, typeArray, statArray, level);

	if (typeArray[1]) {
		iconStringHolder = `
        <div class="type-ico-grid">
            <div class="icon ${typeArray[0]}">
                <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeArray[0]}.svg"/>
            </div>
            <div class="icon ${typeArray[1]}">
                <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeArray[1]}.svg"/>
            </div>
        </div>
        `;
	} else {
		iconStringHolder = `
        <div class="type-ico-single">
            <div class="icon ${typeArray[0]}">
                <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeArray[0]}.svg"/>
            </div>
        </div>
        `;
	}

	//build the popup
	const htmlString =
		`
                <img class="card-image" src="${thePokemon.sprites['front_default']}"/>
                <h2 class="card-title">${thePokemon.name}  - #${thePokemon.id}</h2>
                ` +
		iconStringHolder +
		`
                <p><small>Height:</small> ${thePokemon.height} | <small>Weight:</small> ${
			thePokemon.weight
		}</p>
                <p>Base Stats: ${statNumStr}</p>
				<h3>Stats at level ${pokeObject.getLevel()}: </h3>
                <h2>Max Health: ${calcHealth} </h2>
				<h3>Att: ${pokeObject.getAttack()} , SpAtt: ${pokeObject.getSpecialAttack()}, </br> Def: ${pokeObject.getDefense()} , SpDef: ${pokeObject.getSpecialDefense()}, Speed: ${pokeObject.getSpeed()}
				</h3>

    `;

	if (playerNumber == 1) {
		player1PokeWebHook.innerHTML = htmlString + player1PokeWebHook.innerHTML;
	} else if (playerNumber == 2) {
		player2PokeWebHook.innerHTML = htmlString + player2PokeWebHook.innerHTML;
	}
};

export { loadPokemonFromAPI, displayPokemonToWebpage };
