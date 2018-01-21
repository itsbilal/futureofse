class CreateProgramDesignCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :program_design_courses do |t|
      t.integer :program_design_id
      t.string :term
      t.string :course

      t.timestamps
    end
    add_index :program_design_courses, :program_design_id
    add_foreign_key :program_design_courses, :program_designs
  end
end
