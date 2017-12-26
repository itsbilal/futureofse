
const initialState = {
  key: '',
  cls: 2019,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'VOTER_KEY_SET':
      return Object.assign({}, state, {
        key: action.key
      })
    case 'VOTER_CLASS_SET':
      return Object.assign({}, state, {
        cls: parseInt(action.cls),
      })
    default:
      return state
  }
}

export default reducer
