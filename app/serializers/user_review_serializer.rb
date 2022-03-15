class UserReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :review
end
