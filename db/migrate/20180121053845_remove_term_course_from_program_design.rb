class RemoveTermCourseFromProgramDesign < ActiveRecord::Migration[5.1]
  def up
    remove_column :program_designs, :term
    remove_column :program_designs, :course
  end

  def down
    add_column :program_designs, :term
    add_column :program_designs, :course
  end
end
