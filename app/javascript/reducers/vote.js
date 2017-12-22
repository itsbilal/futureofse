
// Index of reducers for the vote app

import { combineReducers } from 'redux'

import stage from './stage'
import voter from './voter'

const voteReducers = combineReducers({
  stage,
  voter,
})

export default voteReducers
