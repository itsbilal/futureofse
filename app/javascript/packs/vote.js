
import React from 'react';
import ReactDOM from 'react-dom';

import VoteApp from 'components/vote_app';

ReactDOM.render(
  <VoteApp />,
  document.getElementById('vote-content'),
);

window.onbeforeunload = function() {
  if (window.dirty == true) {
    return "You will lose unsaved changes on all pages of this poll."
  }
}
