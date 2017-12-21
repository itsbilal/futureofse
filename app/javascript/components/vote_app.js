
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import voteReducers from 'reducers/vote'

let store = createStore(voteReducers)

const VoteApp = (props) => {
  return <Provider store={store}>
    <div className="container">
    </div>
  </Provider>

}

export default VoteApp
