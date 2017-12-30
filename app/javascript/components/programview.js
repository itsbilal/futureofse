
import React from 'react'
import {connect} from 'react-redux'

import Program from './program'

class ProgramView extends React.Component {
  submit() {
    // TODO
  }
  constructor(props) {
    super(props)
    props.submitHook(this.submit.bind(this))
  }
  render() {
    return (
      <div className="stage-program stage-programview container-fluid">
        <Program editable="false" program={this.props.programs[this.props.current.program]} courses={this.props.courses} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.stage.current,
    programs: state.stage.programs,
    courses: state.stage.courses,
  }
}

const mapDispatchToProps = (state) => {
  return {}
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramView)

export default Cont
