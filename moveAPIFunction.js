const loadMoveFromAPI = async (name, pokemonObject) => {
	const url = `https://pokeapi.co/api/v2/move/${name}`;
	fetch(url)
		.then((response) => response.json())
		.then((theMove) => {
			const dataMap = new Map();

			for (const [key, value] of Object.entries(theMove)) {
				dataMap.set(key, value);
			}

			pokemonObject.setMove(dataMap);
		})
		.catch((error) => {
			console.error('Error fetching move data:', error);
		});
};
