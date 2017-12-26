
function setVoterKey(key) {
  return {
    type: 'VOTER_KEY_SET',
    key,
  }
}

function setClass(cls) {
  return {
    type: 'VOTER_CLASS_SET',
    cls,
  }
}

export {
  setVoterKey,
  setClass,
}
