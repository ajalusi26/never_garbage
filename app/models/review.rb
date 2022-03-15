class Review < ApplicationRecord
    belongs_to :user, class_name: 'User'
    
    has_many :user_reviews
    has_many :users, through: :user_reviews
end
