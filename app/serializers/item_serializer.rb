class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :category_id, :category_name,:condition, :zipcode, :city, :image, :short_name, :name, :description, :price

  belongs_to :user

  def short_name
    "#{object.name[0...30]}..."
  end

  



end
