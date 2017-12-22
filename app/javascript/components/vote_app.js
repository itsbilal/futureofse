
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {stagesLoaded} from 'actions/stage';

import voteReducers from 'reducers/vote'

import StageView from './stage'
import NavBar from './navbar'

let store = createStore(voteReducers)

fetch('/api/stage')
.then(resp => resp.json())
.then(data => {
  store.dispatch(stagesLoaded(data))
})

const VoteApp = (props) => {
  return <Provider store={store}>
    <div className="container">
      <NavBar />
      <StageView />
    </div>
  </Provider>

}

export default VoteApp
