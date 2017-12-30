
const initialState = {
  num: 0,
  stages: [],
  programs: {},
  courses: {},
  current: {},
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'STAGES_LOADED':
      return Object.assign({}, state, {
        stages: action.stages.stages.slice(0),
        programs: action.stages.programs,
        courses: action.stages.courses,
        current: action.stages.stages[state.num],
      })
    case 'STAGE_NEXT':
      action.stage = state.num + 1
      // passthrough
    case 'STAGE_CHANGED':
      return Object.assign({}, state, {
        num: action.stage,
        current: (state.stages[action.stage] || {}),
      })
    default:
      return state
  }
}

export default reducer
