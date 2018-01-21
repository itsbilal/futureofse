
import React from 'react'
import { connect } from 'react-redux'

import { ProgramView } from './programview'
import Term from './term'

import { sidebarProgramChanged } from 'actions/sidebar'

class ProgramDesign extends ProgramView {
  submit() {
    // TODO: Some validation
    let stage = this.props.program
    let comment = this.state.comment

    let requestBody = {
      voterKey: this.props.voterKey,
      stage,
      comment,
    }

    return fetch(`/api/stage/${this.props.currentStage}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success) {
        // reset state
        this.setState({
          comment: "",
        })
      }
      return Promise.resolve(data)
    })
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
  getExtras() {
    return (
      <Term
        courses={this.props.courses}
        editable="true"
        term={this.props.program.extras}
        name="extras"
        title="Extras / Dropped courses"
        isExtras="true" />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    voterKey: state.voter.key,
    current: state.stage.current,
    currentStage: state.stage.num,
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

