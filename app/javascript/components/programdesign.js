
import React from 'react'
import { connect } from 'react-redux'

import { ProgramView } from './programview'

import { sidebarProgramChanged } from 'actions/sidebar'

class ProgramDesign extends ProgramView {
  submit() {
    // TODO
  }
  isEditable() {
    return 'true'
  }
  getProgram() {
    return this.props.program
  }
  getDivClass() {
    return 'stage-programdesign'
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.stage.current,
    program: state.stage.editor,
    courses: state.stage.courses,
    programs: state.stage.programs,
    sidebarShown: state.sidebar.open,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCompareProgram: (program) => dispatch(sidebarProgramChanged(program)),
  }
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramDesign)

export default Cont

