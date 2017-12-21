class CreateVoters < ActiveRecord::Migration[5.1]
  def change
    create_table :voters do |t|
      t.integer :class, null: false
      t.string :name
      t.string :email
      t.boolean :current, null: false
      t.text :reason

      t.timestamps
    end
  end
end
