
import React from 'react'

import Course from './course'

class Term extends React.Component {
  render() {
    let courses = this.props.term.courses.map((course) => (
      Object.assign({}, {course}, this.props.courses[course])))

    return (
      <div className="term">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <div className="courses-list">
              {courses.map((course) => (
                <Course key={course.course} course={course} editable={this.props.editable} />
              ))}
              {(this.props.term.nces || []).map((nce) => (
                <div key={`nce-${nce}`} className="course course-nce">
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

export default Term
