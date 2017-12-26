class CreateStageResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :stage_responses do |t|
      t.integer :voter_id
      t.integer :stage
      t.string :stagetype

      t.timestamps
    end

    add_index :stage_responses, :voter_id
    add_foreign_key :stage_responses, :voters
  end
end
