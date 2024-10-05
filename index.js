const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: "ice redux action",
  };
}

// (PrevSate ,action) =>nextState

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceState = {
  numberOfIcecream: 20,
};

// Reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};

const iceReducer = (state = initialIceState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger)); //Create Store with reducer arguments
console.log("Initial State", store.getState());
const unSubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
unSubscribe();
