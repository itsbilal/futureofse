
import React from 'react'
import {connect} from 'react-redux'

import IdentStageView from './ident'

import { nextStage } from 'actions/stage'

class StageView extends React.Component {
  onNext(stageView, e) {
    if (this.props.numStages - 1 == this.props.currentStage) {
      return
    }

    // Submit the current stage if validation succeeds
    stageView.submit()
      .then(() => this.props.nextStage())
  }
  render() {
    let stage = null

    if (this.props.current == undefined || !this.props.current.hasOwnProperty('type')) {
      return <div></div>
    }
    switch (this.props.current.type) {
      case 'ident':
        stage = <IdentStageView />
        break
      case 'final':
        stage = <FinalStageView />
        break
      case 'questions':
        stage = <QuestionsStageView />
        break
      default:
        console.log(`error: got ${this.props.current.ident} as stage type`)
    }

    return <div className="container stage">
      { stage }
      <button type="button" className="btn btn-primary" onClick={this.onNext.bind(this, stage)}>Next</button>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    numStages: state.stage.stages.length,
    currentStage: state.stage.num,
    current: state.stage.current,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nextStage: () => dispatch(nextStage()),
  }
}

const StageViewCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(StageView)

export default StageViewCont
