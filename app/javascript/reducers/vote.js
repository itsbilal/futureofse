
// Index of reducers for the vote app

import { combineReducers } from 'redux'

import stage from './stage'
import voter from './voter'
import sidebar from './sidebar'

const voteReducers = combineReducers({
  stage,
  voter,
  sidebar,
})

export default voteReducers
