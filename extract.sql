WITH term_courses AS (SELECT v2.id AS voter_id, pdc.term, string_agg(pdc.course, ', ') AS courses FROM voters v2
  INNER JOIN stage_responses s10 ON s10.voter_id = v2.id
  INNER JOIN program_designs pd1 ON pd1.stage_response_id = s10.id
  INNER JOIN program_design_courses pdc ON pdc.program_design_id = pd1.id
  GROUP BY v2.id, pdc.term
)
SELECT v.created_at, v.cls, v.name, v.email, v.current, q1.answer AS answer1, q2.answer AS answer2, q3.answer AS answer3, q4.answer AS answer4, p1.comment AS oldcomment, p2.comment AS newcomment, pd.comment AS designercomment,
 t1a.courses AS c1a, t1b.courses AS c1b, t2a.courses AS c2a, t2b.courses AS c2b, t3a.courses AS c3a, t3b.courses AS c3b, t4a.courses AS c4a, t4b.courses AS c4b 
 FROM voters v
  INNER JOIN stage_responses s1 ON s1.voter_id = v.id
  INNER JOIN questions q1 ON q1.stage_response_id = s1.id AND q1.question = 0
  INNER JOIN stage_responses s2 ON s2.voter_id = v.id
  INNER JOIN questions q2 ON q2.stage_response_id = s2.id AND q2.question = 1
  INNER JOIN stage_responses s3 ON s3.voter_id = v.id
  INNER JOIN questions q3 ON q3.stage_response_id = s3.id AND q3.question = 2
  LEFT OUTER JOIN stage_responses s4 ON s4.voter_id = v.id
  INNER JOIN questions q4 ON q4.stage_response_id = s4.id AND q4.question = 3
  INNER JOIN stage_responses s5 ON s5.voter_id = v.id AND s5.stage = 2
  INNER JOIN program_views p1 ON p1.stage_response_id = s5.id
  INNER JOIN stage_responses s6 ON s6.voter_id = v.id AND s6.stage = 3
  INNER JOIN program_views p2 ON p2.stage_response_id = s6.id
  INNER JOIN stage_responses s7 ON s7.voter_id = v.id AND s7.stage = 4
  INNER JOIN program_designs pd ON pd.stage_response_id = s7.id
  INNER JOIN term_courses t1a ON t1a.voter_id = v.id AND t1a.term = '1A'
  INNER JOIN term_courses t1b ON t1b.voter_id = v.id AND t1b.term = '1B'
  INNER JOIN term_courses t2a ON t2a.voter_id = v.id AND t2a.term = '2A'
  INNER JOIN term_courses t2b ON t2b.voter_id = v.id AND t2b.term = '2B'
  INNER JOIN term_courses t3a ON t3a.voter_id = v.id AND t3a.term = '3A'
  INNER JOIN term_courses t3b ON t3b.voter_id = v.id AND t3b.term = '3B'
  INNER JOIN term_courses t4a ON t4a.voter_id = v.id AND t4a.term = '4A'
  INNER JOIN term_courses t4b ON t4b.voter_id = v.id AND t4b.term = '4B'