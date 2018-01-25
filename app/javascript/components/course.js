
import React from 'react'
import {connect} from 'react-redux'
import { DragSource } from 'react-dnd';

import { sidebarCourseChanged } from 'actions/sidebar'
import { editorCourseMoved } from 'actions/editor'

const dragSpec = {
  beginDrag(props) {
    return {
      course: props.course,
      currentTerm: props.term,
    }
  },
  canDrag(props, monitor) {
    return props.editable === true || props.editable === 'true'
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource('COURSE', dragSpec, collect)
class Course extends React.Component {
  render() {
    return this.props.connectDragSource(
      <div className={`course course-course ${this.props.editable == 'true' ? 'course-movable' : ''}`}>
        <span>{this.props.course.course}</span>
        { (this.props.course.droppable && (this.props.term != 'extras') && (this.props.editable == 'true')) ? (
          <button className="btn btn-link text-danger" type="button" onClick={this.props.courseDropped.bind(this, this.props.course, this.props.term)}>
            Drop
          </button>
        ) : null }
        <button className="btn btn-link" type="button" onClick={this.props.courseClicked.bind(this, this.props.course)}>
          Details
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    courseClicked: (course) => dispatch(sidebarCourseChanged(course)),
    courseDropped: (course, term) => dispatch(editorCourseMoved(course.course, term, 'extras')),
  }
}

const CourseCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course)

export default CourseCont
