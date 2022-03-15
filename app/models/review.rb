class Review < ApplicationRecord
    # belongs_to :user, foreign_key: :user_author_id ,class_name: 'User'
    
    has_many :user_reviews
    has_many :users, through: :user_reviews
end
