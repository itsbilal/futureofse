
import React from 'react'
import {connect} from 'react-redux'

import Program from './program'
import Sidebar from './sidebar'

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
        <div className="row">
          <div className={"stage-program-main " + (this.props.sidebarShown ? "col-8" : "col-12")}>
            <Program editable="false" program={this.props.programs[this.props.current.program]} courses={this.props.courses} />
          </div>
          <Sidebar />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.stage.current,
    programs: state.stage.programs,
    courses: state.stage.courses,
    sidebarShown: state.sidebar.open,
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
