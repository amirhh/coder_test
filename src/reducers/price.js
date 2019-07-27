import _ from 'lodash'
const defaultState = []

const price = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      if (_.indexOf(state, _.find(state, { id: action.id })) === -1) { // check if id is not already exists (-1 : not exists)
        return [
          ...state,
          {
            id: action.id,
            price: action.price,
            name: action.name,
            platform: action.platform,
            sum: state.reduce((prev, cur) => prev + cur.price, 0) + action.price
          }
        ]
      } else {
        // return state.splice(action.id, 1, {id:action.id, price: action.price,name: action.name,platform: action.platform,sum: action.price});
        let tempState = state[0];
        tempState.price = action.price;
        tempState.name = action.name;
        tempState.platform = action.platform;
        tempState.sum = action.price;
        return [tempState];
      }

    case 'DELETE':
      return state.filter(element => element.id !== action.id);

    case 'TOGGLE':
      return state.map(value =>
        value.id === action.id ? { ...value, completed: !value.completed } : value
      )
      
    default:
      return state
  }
}

export default price;