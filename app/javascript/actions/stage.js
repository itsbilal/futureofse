
function stageChanged(stage) {
  return {
    type: 'STAGE_CHANGED',
    stage,
  }
}

function stagesLoaded(stages) {
  return {
    type: 'STAGES_LOADED',
    stages,
  }
}

function nextStage(stages) {
  return {
    type: 'STAGE_NEXT',
  }
}

export {
  stageChanged,
  stagesLoaded,
  nextStage,
}
