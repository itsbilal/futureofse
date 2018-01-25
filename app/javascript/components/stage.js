import React from 'react'
import {connect} from 'react-redux'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import IdentStageView from './ident'
import QuestionsStageView from './questions'
import FinalStageView from './final'
import { ProgramViewBound } from './programview'
import ProgramDesign from './programdesign'

import { nextStage } from 'actions/stage'

@DragDropContext(HTML5Backend)
class StageView extends React.Component {
  onNext(e) {
    if (this.props.numStages - 1 == this.props.currentStage) {
      return
    }

    // Submit the current stage if validation succeeds
    this.submitFunc()
      .then(() => this.props.nextStage())
  }
  submitHook(submitFunc) {
    this.submitFunc = submitFunc;
  }
  render() {
    let stage = null

    if (this.props.current == undefined || !this.props.current.hasOwnProperty('type')) {
      return <div></div>
    }
    switch (this.props.current.type) {
      case 'ident':
        stage = <IdentStageView submitHook={this.submitHook.bind(this)} />
        break
      case 'final':
        // Set dirty to false
        window.dirty = false;
        stage = <FinalStageView submitHook={this.submitHook.bind(this)} />
        break
      case 'questions':
        stage = <QuestionsStageView submitHook={this.submitHook.bind(this)} />
        break
      case 'programview':
        stage = <ProgramViewBound submitHook={this.submitHook.bind(this)} comments='true' />
        break
      case 'programdesign':
        stage = <ProgramDesign submitHook={this.submitHook.bind(this)} comments='true' />
        break
      default:
        console.log(`error: got ${this.props.current.type} as stage type`)
    }

    return <div className="stage">
      { stage }
      { (this.props.current.type != 'final') ? (<div className="container controls">
        <button type="button" className="btn btn-primary" onClick={this.onNext.bind(this)}>Next</button>
      </div>) : null}
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
