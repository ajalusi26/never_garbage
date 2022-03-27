class SavedItem < ApplicationRecord
    belongs_to :user, class_name: 'User'
    belongs_to :item

    validates :item_id, uniqueness: { scope: :user,
        message: "should happen once per year" }
end
