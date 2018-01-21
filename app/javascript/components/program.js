import React from 'react'

import Term from './term'

class Program extends React.Component {
  render() {
    if (this.props.diff) {
      return this.renderDiff();
    } else {
      return this.renderSingle();
    }
  }

  renderSingle() {
    return (
      <div className="program program-scroll">
        { this.props.program.terms.map((term) => (
          <Term key={term} courses={this.props.courses} editable={this.props.editable} term={this.props.program[term]} name={term} />
        )) }
      </div>
    );
  }

  renderDiff() {
    return (
      <div className="program program-vertical">
        { this.props.program.terms.map((term) => (
          <div className="row" key={`row-${term}`}>
            <Term key={`orig-${term}`} courses={this.props.courses} editable={this.props.editable} term={this.props.program[term]} title={`Proposed ${term}`} name={term} />
            <Term key={`diff-${term}`} courses={this.props.courses} editable="false" term={this.props.diff[term]} title={`Current ${term}`} name={term} />
          </div>
        )) }
      </div>
    );
  }
}

export default Program
