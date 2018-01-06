
import React from 'react'
import { connect } from 'react-redux'

import Program from './program'
import Sidebar from './sidebar'

import { sidebarProgramChanged } from 'actions/sidebar'

class ProgramDesign extends React.Component {
  submit() {
    // TODO
  }
  constructor(props) {
    super(props)
    props.submitHook(this.submit.bind(this))
    this.state = {
      comment: "",
    }
  }
  onCommentChange(e) {
    this.setState({
      comment: e.target.value,
    })
  }
  compare() {
    this.props.setCompareProgram(this.props.programs[this.props.current.compare])
  }
  render() {
    let compareBtn = null

    if (this.props.current.compare) {
      compareBtn = (<button type="button" onClick={this.compare.bind(this)} className="btn btn-link">
          Compare to current curriculum
        </button>)
    }

    return (
      <div className="stage-program stage-programdesign container-fluid">
        <div className="stage-program-title">
          {this.props.current.title}
          {compareBtn}
        </div>
        <div className="row">
          <div className={"stage-program-main " + (this.props.sidebarShown ? "col-8" : "col-12")}>
            <Program details="true" editable="true" program={this.props.program} courses={this.props.courses} />
          </div>
          <Sidebar />
        </div>

        <div className="form-group">
          <label htmlFor="programview-comment1">
            {this.props.current.commentbox}
          </label>
          <textarea className="form-control" value={this.state.comment} id="programview-comment1" onChange={this.onCommentChange.bind(this)}>
          </textarea>
        </div>
      </div>
    )
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

