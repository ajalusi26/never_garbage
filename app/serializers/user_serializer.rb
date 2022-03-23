class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :zipcode, :city, :profile_pic, :rating
end
