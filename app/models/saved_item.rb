class SavedItem < ApplicationRecord
    belongs_to :user, class_name: 'User'
    belongs_to :item

    validates :item_id, uniqueness: { scope: :user,
        message: "User can save item only once" }
end
