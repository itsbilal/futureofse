
const initialState = {
  num: 0,
  stages: [],
  programs: {},
  courses: {},
  current: {},
  editor: {},
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
      let current = state.stages[action.stage] || {}
      var editor = {}

      if (current.type == 'programdesign') {
        editor = Object.assign({}, state.programs[current.program], {extras: { courses: current.extras || [] }})
      }

      return Object.assign({}, state, {
        num: action.stage,
        current: (state.stages[action.stage] || {}),
        editor,
      })
    case 'EDITOR_COURSE_MOVED':
      var editor = Object.assign({}, state.editor)
      let {from, to, course} = action

      if (typeof course != "string") {
        course = course.course
      }

      let idx = editor[from].courses.indexOf(course)
      if (idx !== -1) {
        editor[from].courses.splice(idx, 1)
      }
      editor[to].courses.push(course)

      return Object.assign({}, state, {editor})
    default:
      return state
  }
}

export default reducer
