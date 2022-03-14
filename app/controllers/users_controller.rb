class UsersController < ApplicationController
    def create
        user = User.create!(name: params[:username], password: params[:password], profile_pic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640' email: params[:email], zipcode: params[:zipcode] )
        session[:current_user] = user.id
        render json: user, status: :created
    end
end
