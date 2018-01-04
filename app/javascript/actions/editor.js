
function editorCourseMoved(course, from, to) {
  return {
    type: 'EDITOR_COURSE_MOVED',
    course,
    from,
    to,
  }
}

export {
  editorCourseMoved,
}
