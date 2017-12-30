
function sidebarToggled() {
  return {
    type: 'SIDEBAR_TOGGLED',
  }
}

function sidebarCourseChanged(course) {
  return {
    type: 'SIDEBAR_CHANGED',
    display: 'course',
    course,
  }
}

function sidebarProgramChanged(program) {
  return {
    type: 'SIDEBAR_CHANGED',
    display: 'program',
    program,
  }
}

export {
  sidebarToggled,
  sidebarCourseChanged,
  sidebarProgramChanged,
}
