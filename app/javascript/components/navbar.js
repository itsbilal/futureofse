import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Navbar = (props) => (
  <nav className="navbar navbar-dark bg-primary">
    <div className="container">
      <a className="navbar-brand" href="#">Future of SE poll</a>
      <span className="navbar-text">
        Page {props.currentStage + 1} of {props.numStages}
      </span>
    </div>
  </nav>
)

Navbar.propTypes = {
  numStages: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  return {
    numStages: state.stage.stages.length,
    currentStage: state.stage.num,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const NavbarCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export default NavbarCont
