
import React from 'react'
import {connect} from 'react-redux'

class FinalStageView extends React.Component {
  submit() {
    // Should never be called
  }
  componentDidMount() {
    this.props.submitHook(this.submit.bind(this))
  }
  render() {
    let classreps = null
    if (this.props.cls && this.props.contact.classreps.hasOwnProperty(cls)) {
      classreps = (<div className="col-md">
          For general class-specific comments/concerns, contact your class reps:
          <ul>
            {this.props.contact.classreps[this.props.cls].map(person => (
              <li key={person.name}>{person.name} &lt;<a href={`mailto:${person.email}`}>{person.email}</a>&gt;</li>
            ))}
          </ul>
        </div>)
    }

    return (<div className="final-stage container">
        <h4>Thanks for submitting your feedback!</h4>
        <p>
          If you have any suggestions/issues/comments about this website, please let me (Bilal) know by email:
          <a href="mailto:me@itsbilal.com">. Or if you're adventurous,
          you can dive into and fix <a href="http://github.com/itsbilal/futureofse">this site's source code</a> yourself - it's all
          open source &#x1f60a;
        </p>
        <div className="row">
          <div className="col-md">
            For more comments/suggetions/feedback on the SE curriculum, feel free to reach out
            to these members of the SE curriculum committee:
            <ul>
              {this.props.contact.curriculum.map(person => (
                <li key={person.name}>{person.name} ({person.type}) &lt;<a href={`mailto:${person.email}`}>{person.email}</a>&gt;</li>
              ))}
            </ul>
          </div>
          {classreps}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (props) => {
  return {
    currentStage: state.stage.num,
    current: state.stage.current,
    contact: state.stage.current.contact,
    cls: state.stage.voter.cls,
  }
}

const mapDispatchToProps = (props) => {
  return {
  }
}

const Cont = connect(
  mapStageToProps,
  mapDispatchToProps,
)(FinalStageView)

export default Cont
