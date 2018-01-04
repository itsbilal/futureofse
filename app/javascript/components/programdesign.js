
import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Program from './program'
import Sidebar from './sidebar'

import { sidebarProgramChanged } from 'actions/sidebar'

@DragDropContext(HTML5Backend)
class ProgramDesign extends React.Component {
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
      <div className="stage-program stage-programview container-fluid">
        <div className="stage-program-title">
          {this.props.current.title}
          {compareBtn}
        </div>
        <div className="row">
          <div className={"stage-program-main " + (this.props.sidebarShown ? "col-8" : "col-12")}>
            <Program details="true" editable="false" program={this.props.programs[this.props.current.program]} courses={this.props.courses} />
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


