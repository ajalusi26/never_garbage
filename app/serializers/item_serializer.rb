class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :category_id, :zipcode, :city, :image, :name, :description, :price

  belongs_to :user
end
