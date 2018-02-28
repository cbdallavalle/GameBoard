export const cleanSearch = (searches) => {
  return searches.elements[0].elements.map( search => {
    const id = search.attributes.id;
    const name = search.elements[0].attributes.value;
    return { id, name };
  } );
};

export const cleanGameDetails = game => {
  const he = require('he');
  const id = game.elements[0].elements[0].attributes.id;
  const gameDetails = game.elements[0].elements[0].elements
    .reduce( (cleanedGame, gameDetail) => {
      if (gameDetail.name === 'thumbnail' 
        || gameDetail.name === 'image' 
        || gameDetail.name === 'description'
      ) {
        cleanedGame[gameDetail.name] = he.decode(gameDetail.elements[0].text);
      }
      return cleanedGame;
    }, {} );
  return { ...gameDetails, id };
};

export const fetchBoardGames = async url => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const rootUrl = 'https://www.boardgamegeek.com/xmlapi2/';
  try {
    const response = await fetch(`${proxy}${rootUrl}${url}`);
    if (response.status < 300) {
      return convertXMLToJSON(response);
    } else {
      throw new Error('unable to load game data :(');
    }
  } catch (error) {
    throw new Error('unable to load game data :(');
  }
};

export const convertXMLToJSON = async(response) => {
  const responseText = await response.text();
  const convert = require('xml-js');
  const options = {ignoreComment: true, alwaysChildren: true };
  const result = convert.xml2js(responseText, options);
  console.log(result);
  return result;
};