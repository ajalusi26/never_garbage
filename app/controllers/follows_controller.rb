class FollowsController < ApplicationController

    def create
        if Follow.exists?(follower_id: session[:current_user], followed_user_id: params[:followed_user_id])
            Follow.find_by(follower_id: session[:current_user], followed_user_id: params[:followed_user_id]).destroy
            message = "destroyed"
            render json: message, status: :no_content
        else
            new_follow = Follow.create!(follower_id: session[:current_user], followed_user_id: params[:followed_user_id])
            render json: new_follow, status: :ok
        end
    end
end
