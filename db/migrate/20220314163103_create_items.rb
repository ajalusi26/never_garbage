class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.integer :user_id
      t.integer :category_id
      t.string :category_name
      t.integer :zipcode
      t.string :city
      t.string :image
      t.string :name
      t.string :description
      t.string :condition
      t.integer :price
      t.boolean :sold

      t.timestamps
    end
  end
end
