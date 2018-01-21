
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import Course from './course'

import { editorCourseMoved } from 'actions/editor'

const dropSpec = {
  canDrop(props, monitor) {
    let isExtras = (!props.isExtras || monitor.getItem().course.droppable)
    return (props.editable === true || props.editable === 'true') && isExtras
  },
  drop(props, monitor) {
    let item = monitor.getItem()

    props.courseMoved(item.course.course, item.currentTerm, props.name)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

@DropTarget('COURSE', dropSpec, collect)
class Term extends React.Component {
  render() {
    let courses = this.props.term.courses.map((course) => (
      Object.assign({}, {course}, this.props.courses[course])))

    let dropHint = (<div className={`course course-drophint ${this.props.canDrop ? 'course-drophint-visible' : ''} ${this.props.isOver ? 'course-drophint-active' : ''}`}>
        </div>)

    return this.props.connectDropTarget(
      <div className={"term" + (this.props.isExtras ? " term-extras" : "")}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.title ? this.props.title : this.props.name}</h5>
            <div className="courses-list">
              {courses.map((course, idx) => (
                <Course key={course.course + idx} course={course} term={this.props.name} editable={this.props.editable} />
              ))}
              {dropHint}
              {(this.props.term.nces || []).map((nce) => (
                <div key={`nce-${nce}`} className={"course course-nce" + (nce == "WKRPT" ? " course-wkrpt" : "")}>
                  {nce}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    courseMoved: (course, from, to) => {
      dispatch(editorCourseMoved(course, from, to))
    },
  }
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Term)

export default Cont
