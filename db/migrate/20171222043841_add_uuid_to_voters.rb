class AddUuidToVoters < ActiveRecord::Migration[5.1]
  def change
    add_column :voters, :uuid, :string
    add_index :voters, :uuid
  end
end
