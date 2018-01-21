
import React from 'react'
import {connect} from 'react-redux'

import Program from './program'
import Sidebar from './sidebar'

import { sidebarProgramChanged } from 'actions/sidebar'

class ProgramView extends React.Component {
  submit() {
    let requestBody = {
      voterKey: this.props.voterKey,
      stage: {
        comment: this.state.comment,
      },
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
  toggleCompare() {
    this.setState({ compare: !this.state.compare });
  }
  isEditable() {
    return 'false'
  }
  getProgram() {
    return this.props.programs[this.props.current.program]
  }
  getCompareProgram() {
    return this.props.programs[this.props.current.compare]
  }
  getDivClass() {
    return 'stage-programview'
  }
  getExtras() {
    return null
  }
  program() {
    return (
      <div className="stage-program-main">
        <Program details="true" editable={this.isEditable()} program={this.getProgram()} courses={this.props.courses} />
      </div>
    );
  }
  programDiff() {
    return (
      <div className="stage-program-main">
        <Program details="true" editable={this.isEditable()} program={this.getProgram()} courses={this.props.courses} diff={this.getCompareProgram()} />
      </div>
    );
  }
  render() {
    let compareBtn = null

    if (this.props.current.compare) {
      const compareText = this.state.compare ?
        "Stop comparing" : "Compare to current curriculum";
      compareBtn = (
        <button type="button" onClick={this.toggleCompare.bind(this)} className="btn btn-link">
          {compareText}
        </button>
      );
    }

    return (
      <div className={`stage-program ${this.getDivClass()}`}>
        <div className="container">
          <div className="stage-program-title">
            {this.props.current.title}
            {compareBtn}
          </div>
        </div>
        <div className="sidebar-container">
          { this.state.compare ? this.programDiff() : this.program() }
          <Sidebar />
        </div>

        <div className="container">
          { this.getExtras() }
          <div className="form-group">
            <label htmlFor="programview-comment1">
              {this.props.current.commentbox}
            </label>
            <textarea className="form-control" value={this.state.comment} id="programview-comment1" onChange={this.onCommentChange.bind(this)}>
            </textarea>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    voterKey: state.voter.key,
    currentStage: state.stage.num,
    current: state.stage.current,
    programs: state.stage.programs,
    courses: state.stage.courses,
    sidebarShown: state.sidebar.open,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCompareProgram: (program) => dispatch(sidebarProgramChanged(program)),
  }
}

const ProgramViewBound = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramView)

export {
  ProgramView,
  ProgramViewBound,
}
