
import React from 'react'
import { connect } from 'react-redux'

import { ProgramView } from './programview'
import Term from './term'

import { sidebarProgramChanged } from 'actions/sidebar'

class ProgramDesign extends ProgramView {
  submit() {
    if (this.validatePrereq() !== true ||
      this.validateEnoughCourses() !== true ||
      this.validateDegreeReqs() !== true) {
      alert("Your program is not well formed; take a look at the Summary to see what's wrong.")
      return
    }

    let stage = this.props.program
    let comment = this.state.comment

    let requestBody = {
      voterKey: this.props.voterKey,
      stage,
      comment,
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
  isEditable() {
    return 'true'
  }
  getProgram() {
    return this.props.program
  }
  getDivClass() {
    return 'stage-programdesign'
  }
  getTotalCredits() {
    let program = this.props.program
    let terms = program.terms
    let sum = 0
    for (let term of terms) {
      let courses = this.props.courses
      for (let course of program[term].courses) {
        let weight = courses[course].weight ? courses[course].weight : 1

        sum += weight
      }
    }

    return sum
  }

  validateEnoughCourses() {
    let program = this.props.program
    let terms = program.terms
    for (let term of terms) {
      let courses = this.props.courses
      let sum = 0
      for (let course of program[term].courses) {
        let weight = courses[course].weight ? courses[course].weight : 1

        sum += weight
      }
      if (sum < 4 || sum > 6) {
        return false
      }
    }
    return true
  }

  getEnoughCourses() {
    if (this.validateEnoughCourses()) {
      return <span className="oi oi-check"></span>
    } else {
      return <span className="oi oi-x"></span>
    }
  }

  // Just check if we either have MSCI 261 or ECE 192
  // Hardcoding to save time. Every other degree requirement
  // should be undroppable
  validateDegreeReqs() {
    let program = this.props.program
    let terms = program.terms
    for (let term of terms) {
      let courses = this.props.courses
      for (let course of program[term].courses) {
        if (course == "MSCI 261" || courses[course].replaces == "MSCI 261") {
          return true
        }
      }
    }

    return false
  }

  getDegreeReqs() {
    if (this.validateDegreeReqs()) {
      return <span className="oi oi-check"></span>
    } else {
      return "Need one of ECE192 or MSCI261"
    }
  }

  validatePrereq() {
    let program = this.props.program
    let terms = program.terms
    let completed = {}
    for (let term of terms) {
      let courses = this.props.courses
      for (let course of program[term].courses) {
        for (let prereq of (courses[course].prereqs || [])) {
          if (!completed.hasOwnProperty(prereq) && program[term].courses.indexOf(prereq) == -1) {
            return course
          }
        }
        completed[course] = 1
      }
    }

    return true
  }


  getPrereq() {
    if (this.validatePrereq() === true) {
      return <span className="oi oi-check"></span>
    } else {
      return `Prereqs of ${this.validatePrereq()} not satisfied`
    }
  }

  getExtras() {
    return (
      <div className="row">
        <div className="col-6">
          <Term
            courses={this.props.courses}
            editable="true"
            term={this.props.program.extras}
            name="extras"
            title="Extras / Dropped courses"
            isExtras="true" />
        </div>
        <div className="col-6">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">Summary</h5>
              <p>
                Total number of courses: {this.getTotalCredits()}
              </p>
              <p>
                All terms have between 4 and 6 courses: {this.getEnoughCourses()}
              </p>
              <p>
                Degree requirements satisfied: {this.getDegreeReqs()}
              </p>
              <p>
                Prereq chains maintained: {this.getPrereq()}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    voterKey: state.voter.key,
    current: state.stage.current,
    currentStage: state.stage.num,
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

