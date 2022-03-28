class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :zipcode, :city,:state ,:profile_pic, :rating, :created, :followers, :follower_amount, :amount_sold, :amount_posted

  def created
    "#{object.created_at.strftime("%Y-%m-%d")}"
  end

  def followers
    object.followers
  end

  def follower_amount
    object.followers.length
  end

  def amount_sold
    object.posted_items.where('sold = ?', true).length
  end

  def amount_posted
    object.posted_items.length
  end


  
  has_many :posted_items
  
end
