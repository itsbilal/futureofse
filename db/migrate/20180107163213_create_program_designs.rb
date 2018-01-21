class CreateProgramDesigns < ActiveRecord::Migration[5.1]
  def change
    create_table :program_designs do |t|
      t.integer :stage_response_id
      t.string :term
      t.string :course
      t.text :comment

      t.timestamps
    end
    add_index :program_designs, :stage_response_id
    add_foreign_key :program_designs, :stage_responses
  end
end
