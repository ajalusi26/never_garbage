class SavedItemsController < ApplicationController

    def create
        if SavedItem.exists?(item_id: params[:item_id], user_id: User.find(1).id)
            SavedItem.find_by(item_id: params[:item_id], user_id: User.find(1).id).destroy
            message = "destroyed"
            render json: message, status: :no_content
        else
        new_item = SavedItem.create!(user_id: User.find(1).id, item_id: params[:item_id])
        render json: new_item , status: :ok
        end
    end
end
