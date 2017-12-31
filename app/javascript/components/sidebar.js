
import React from 'react'
import { connect } from 'react-redux'

import { sidebarToggled } from 'actions/sidebar'

class Sidebar extends React.Component {
  render() {
    let flowify = (course) => course.replace(/ /g, '').toLowerCase()

    let sidebarContent = <div />

    if (this.props.display == "course" && this.props.course) {
      let flowPart = (<div>
            <a href={`https://uwflow.com/course/${flowify(this.props.course.course)}`}>View on UWFlow</a>
          </div>)

      sidebarContent = (<div className="sidebar-content">
          <h4>{this.props.course.course}</h4>
          <h5>{this.props.course.title}</h5>
          <p>{this.props.course.desc}</p>
          <div>
            {this.props.course.elective ? null : flowPart }
          </div>
          <div className="sidebar-content-course-prereqs">
            Prerequisites:
            <ul>
              {(this.props.course.prereqs || []).map((prereq) => (
                <li key={prereq}>{prereq}</li>
              ))}
            </ul>
          </div>
        </div>)
    }
    return (
      <div className={"col-4 sidebar " + (this.props.open ? "sidebar-open" : "sidebar-closed")}>
        <button onClick={this.props.toggle.bind(this)} type="button" className="btn btn-outline-primary">
          Close sidebar
        </button><br />
        { sidebarContent }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.sidebar.open,
    display: state.sidebar.display,
    course: state.sidebar.course,
    program: state.sidebar.program,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: () => dispatch(sidebarToggled())
  }
}

const SidebarCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar)

export default SidebarCont
