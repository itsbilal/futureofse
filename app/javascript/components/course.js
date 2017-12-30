
import React from 'react'

class Course extends React.Component {
  render() {
    return (
      <div className="course course-course">
        {this.props.course.course} &mdash; {this.props.course.title}
      </div>
    )
  }
}

export default Course
