class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :user_author_id, :user_reviewed
end
