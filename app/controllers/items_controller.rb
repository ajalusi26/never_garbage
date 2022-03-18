class ItemsController < ApplicationController

    def index
        # user = User.find(session[:current_user])
        
        render json: Item.all, status: :ok
    end
end
