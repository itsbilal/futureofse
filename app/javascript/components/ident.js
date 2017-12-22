
import React from 'react'
import {connect} from 'react-redux'

class IdentStageView extends React.Component {
  submit() {
  }
  onAnonChange(known) {
    if (known === true) {
      this.setState({
        known: true
      })
    } else {
      this.setState({
        known: false
      })
    }
  }
  knownForm() {
    if (this.state && this.state.known == true) {
      return (<div>
        <div className="form-group">
          <label htmlFor="inputName">Name</label>
          <input type="text" className="form-control" id="inputName" placeholder="Alice Bob" />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="a29bob@uwaterloo.ca" />
        </div>
      </div>
      )
    } else {
      return <div></div>
    }
  }
  render() {
    return <div className="ident">
      <p>
        {this.props.current.message}
      </p>
      Choose what best describes you:
      <div className="ident-header form-inline">
        I am a &nbsp;<select className="form-control">
          <option value="0">current/graduated</option>
          <option value="1">former/non-SE grad</option>
        </select>
        &nbsp; SE &nbsp;<select className="form-control" defaultValue={2019}>
          { this.props.current.classes.map((cls) => (
            <option key={parseInt(cls)} value={parseInt(cls)}>{cls}</option>
          )) }
        </select> &nbsp; student.
      </div>

      <div className="ident-anon">
        <div className="form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="identAnon" id="identAnon" value="anon"
              onChange={this.onAnonChange.bind(this, false)} checked={(!this.state || !this.state.known ) ? true : false} />
            I wish to remain anonymous
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input" type="radio" name="identAnon" id="identKnown" value="known"
              onChange={this.onAnonChange.bind(this, true)} checked={(this.state && this.state.known) ? true : false} />
            I am okay with making myself known - and would welcome followups from the SE curriculum committee on my feedback.
          </label>
        </div>
        {this.knownForm()}
      </div>
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
  }
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentStageView)

export default Cont
