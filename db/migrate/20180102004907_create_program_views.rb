class CreateProgramViews < ActiveRecord::Migration[5.1]
  def change
    create_table :program_views do |t|
      t.integer :stage_response_id
      t.text :comment

      t.timestamps
    end

    add_index :program_views, :stage_response_id
    add_foreign_key :program_views, :stage_responses
  end
end
