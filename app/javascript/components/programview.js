
import React from 'react'
import {connect} from 'react-redux'

class ProgramView extends React.Component {
  submit() {
    // Should never be called
  }
  constructor(props) {
    super(props)
    props.submitHook(this.submit.bind(this))
  }
  render() {
    
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.stage.current,
  }
}

const mapDispatchToProps = (state) => {
  return {}
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramView)

export default Cont
