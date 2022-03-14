class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.integer :user_id
      t.integer :category_id
      t.integer :zipcode
      t.string :city
      t.string :image
      t.string :name
      t.string :description
      t.integer :price

      t.timestamps
    end
  end
end
