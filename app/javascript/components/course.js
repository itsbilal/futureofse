
import React from 'react'
import {connect} from 'react-redux'
import { DragSource } from 'react-dnd';

import { sidebarCourseChanged } from 'actions/sidebar'

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
      <div className="course course-course">
        {this.props.course.course}
        <button className="btn btn-link float-right" type="button" onClick={this.props.courseClicked.bind(this, this.props.course)}>
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
  }
}

const CourseCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course)

export default CourseCont
