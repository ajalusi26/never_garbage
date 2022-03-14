class SavedItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id
end
