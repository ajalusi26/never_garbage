class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.integer :zipcode
      t.string :city
      t.string :state
      t.string :profile_pic
      t.integer :rating

      t.timestamps
    end
  end
end
