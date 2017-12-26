class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.integer :stage_response_id
      t.integer :question
      t.text :answer

      t.timestamps
    end

    add_index :questions, :stage_response_id
    add_foreign_key :questions, :stage_responses
  end
end
