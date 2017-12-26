
import React from 'react'
import {connect} from 'react-redux'

import { setVoterKey, setClass } from 'actions/voter'

class IdentStageView extends React.Component {
  submit() {
    let former = this.sexited.value
    let cls = this.clsselect.value
    let known = (this.state && this.state.known)

    this.setClass(cls)

    let requestBody = {
      cls,
      current: (former == 0 ? true : false),
    }

    if (known) {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let email = this.email.value;
      if (!re.test(email)) {
        return Promise.reject("Invalid email address")
      }
      requestBody.name = this.name.value;
      requestBody.email = email;
    }

    return fetch(`/api/stage/${this.props.currentStage}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({stage: requestBody}),
    })
    .then(resp => resp.json())
    .then(data => this.props.onVoterKey(data.uuid))
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
  componentDidMount() {
    this.props.submitHook(this.submit.bind(this))
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
        I am a &nbsp;<select className="form-control" ref={(sexited) => this.sexited = sexited} >
          <option value="0">current/graduated</option>
          <option value="1">former/non-SE grad</option>
        </select>
        &nbsp; SE &nbsp;<select className="form-control" ref={(cls) => this.clsselect = cls } defaultValue={2019}>
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
        <div className="ident-disclaimer">
          If anything in the poll breaks, please let Bilal know at me@itsbilal.com. Otherwise, sit back, relax, and don't forget to just &#x1f171; urself!
        </div>
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
    onVoterKey: key => dispatch(setVoterKey(key)),
    setClass: cls => dispatch(setClass(cls)),
  }
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentStageView)

export default Cont
