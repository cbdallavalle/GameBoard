export const mockData = {
  mockUsers: {
    YRrtMzWo0jNquYjLCQGT8ftqz703:{
      favorites: {}, 
      friends: [], 
      lastFavorited: {}, 
      user: {
        email: "kubla@email.com",
        firstName: "kubla",
        id: "GZZGrEW9aYXzbxrdphXuq04ng6E3",
        lastName: "khan"
      }
    },
    GZZGrEW9aYXzbxrdphXuq04ng6E3:{
      favorites: {}, 
      friends: [], 
      lastFavorited: {}, 
      user: {
        email: "wren@wren.com",
        firstName: "wren",
        id: "GZZGrEW9aYXzbxrdphXuq04ng6E3",
        lastName: "little" 
      }
    }
  },
  mockAllUsersWithoutSearcher: [
    {
      email: "kubla@email.com", 
      firstName: "kubla", 
      id: "GZZGrEW9aYXzbxrdphXuq04ng6E3", 
      lastName: "khan", 
      key: "YRrtMzWo0jNquYjLCQGT8ftqz703"
    }
  ],
  mockAllUsers: [
    {
      email: "kubla@email.com", 
      firstName: "kubla", 
      id: "GZZGrEW9aYXzbxrdphXuq04ng6E3", 
      lastName: "khan", 
      key: "YRrtMzWo0jNquYjLCQGT8ftqz703"
    },
    {
      email: "wren@wren.com",
      firstName: "wren",
      id: "GZZGrEW9aYXzbxrdphXuq04ng6E3",
      lastName: "little" 
    }
  ],
  mockFriends: ['123', '456', '778'],
  mockFavorites: { 'Race for the Galaxy': {game: 'info'} },
  mockFriendsFavorites: {
    kubla: { 'Race for the Galaxy': {game: 'info'} },
    wren: { 'Captain Sonar': {game: 'info'} }
  },
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    displayCreate: 'login'
  },
  mockLogInEvent: {
    target: {
      name: 'email', 
      value: 'coda@gmail.com'
    }, 
    preventDefault: () => {}
  },
  mockDefaultSearchState: {
    games: [],
    search: '',
    game: {},
    error: '',
    loading: false,
    gameAdded: 'not-added'
  },
  mockSearchEvent: {
    target: {
      name: 'search',
      value: 'Meeple Circus'
    },
    preventDefault: () => {}
  }, 
  mockSearch: [{ 
    id: '123', 
    name: 'Mysterium' 
  }],
  mockSearchGame: { 
    id: '123', 
    name: 'Mysterium', 
    thumbnail: 'src', 
    image: 'src', 
    description: 'A mystery game with pictures' 
  },
  mockMSTPUserState: {
    user: {
      uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'
    }
  },
  mockMSTPUser: {
    user: {
      uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'
    }
  }
};