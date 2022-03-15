class Item < ApplicationRecord
    belongs_to :category

    belongs_to :user
    
    has_many :saved_items
    has_many :users ,through: :saved_items
    

end
