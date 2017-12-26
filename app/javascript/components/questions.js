
import React from 'react'
import {connect} from 'react-redux'

class QuestionsStageView extends React.Component {
  submit() {
    let answers = this.questionRefs.map(ref => ref.value)
    let requestBody = {
      voterKey: this.props.voterKey,
      stage: {
        questions: answers,
      },
    }

    return fetch(`/api/stage/${this.props.currentStage}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(resp => resp.json())
  }
  constructor(props) {
    super(props)
    this.questionRefs = Array(this.props.questions.length)
  }
  componentDidMount() {
    this.props.submitHook(this.submit.bind(this))

  }
  render() {
    return (<div className="questions-stage">
        { this.props.current.questions.map((question, idx) => (
          <div key={idx} className="form-group">
            <label className="col-form-label">
              {question}
              <textarea ref={(ref) => {this.questionRefs[idx] = ref}} placeholder="Answer" className="form-control">
              </textarea>
            </label>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentStage: state.stage.num,
    current: state.stage.current,
    questions: state.stage.current.questions,
    voterKey: state.voter.key,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsStageView)

export default Cont
