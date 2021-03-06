## Synopsis

This was a two week personal project built for the Turing School of Software and Design, using React.js, React-Router, Redux, and Google Firebase. The idea and implementation of this application was created and carried out on an individual basis. As a novice board game user interested in expanding my gaming experience, I wanted to make an application that allows users to explore the new and exciting board games available.

## Code Example

This website allows users to keep track of the board games they own, rate them, and see what their friends are playing! The most popular website that lets people find board games, add them to a collection, rate them and friend other users is [BoardGameGeek.com](https://boardgamegeek.com/), which is not user friendly and intimidating to new board game users. My app seeks to let new board game users come and start building a community with other board game users, so users can see what games are highly rated and what games their friends own that they can play together. 

## Implementation

The project is built in React.js with Google Firebase as a backend for user authentification and database storage. The create-react-app was used as the starter, which documentation can be found [here](https://github.com/facebook/create-react-app). 

## API Reference

The board game api is taken from [BoardGameGeek](https://boardgamegeek.com/wiki/page/BGG_XML_API2). Users can search for the name of a game and the api will return the names of the board games that match that searched name. Then users can click on the game they want to see, which makes an additional api call to get the details of the game. The api returns data in XML, so an XML to JSON npm package is used to convert the data from XML to a JSON object.

## Tests

Jest and Enzyme are used to test the application and can be run using ```npm test```

## Installation

Clone down the repo and run ```npm install```

Since Firebase is used as the backend, you will need to create a firebase database for this repository and copy the individual config code firebase provides. You should create a file called firebase-key.js in the src/firebase directory.

The application is now ready to run using the code ```npm start```

## Contributors

Thank you to joshuajhun and Jeff-Duke for helping me handle the XML to JSON conversion, as well as, helping me create a smoother UI.

## Screenshots
![screencapture-localhost-3000-login-1519933765249](https://user-images.githubusercontent.com/28467245/36866260-0c1788e4-1d4f-11e8-828f-af75bf371dab.png)

![screencapture-localhost-3000-dashboard-your-games-1519933852616](https://user-images.githubusercontent.com/28467245/36866341-43864f18-1d4f-11e8-9da9-3dae8e3f54a9.png)

![screencapture-localhost-3000-dashboard-search-users-1519933983038](https://user-images.githubusercontent.com/28467245/36866451-88ec38ec-1d4f-11e8-8c7d-a7b1404b7719.png)

![screencapture-localhost-3000-dashboard-search-games-1519933974919](https://user-images.githubusercontent.com/28467245/36866454-8c6dd3a4-1d4f-11e8-80c6-46bd6f5874b6.png)

![screencapture-localhost-3000-dashboard-friends-games-1519933930564](https://user-images.githubusercontent.com/28467245/36866461-8fbec446-1d4f-11e8-915c-9b295263e2bc.png)
