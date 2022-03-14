class User < ApplicationRecord
    has_secure_password
  
    #creates user_instance.followers | returns all users who follows user instance
    has_many :received_follows, foreign_key: :followed_user_id, class_name: "Follow"
    has_many :followers, through: :received_follows, source: :follower
  
    #creates user_instance.followings | returns all users the instance is following
    has_many :given_follows, foreign_key: :follower_id, class_name: "Follow"
    has_many :followings, through: :given_follows, source: :followed_user
end
