
// Index of reducers for the vote app

import { combineReducers } from 'redux'

import stage from './stage'

const voteReducers = combineReducers({
  stage,
})

export default voteReducers
