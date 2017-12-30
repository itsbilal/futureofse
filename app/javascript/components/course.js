
import React from 'react'
import {connect} from 'react-redux'

import { sidebarCourseChanged } from 'actions/sidebar'

class Course extends React.Component {
  render() {
    return (
      <div className="course course-course">
        <button className="btn btn-link" type="button" onClick={this.props.courseClicked.bind(this, this.props.course)}>
          {this.props.course.course}
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
