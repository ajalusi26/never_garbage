class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :zipcode, :city,:state ,:profile_pic, :rating
end
