class UsersController < ApplicationController
    def create
        user = User.create!(name: params[:name], password: params[:password], profile_pic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640', email: params[:email], zipcode: params[:zipcode], state: params[:state], city: params[:city])
        
        unless user.valid? != true
            session[:current_user] = user.id
            render json: user, status: :created
        end
    end
    def show
        user_session = session[:current_user]
        render json: User.find(params[:id]) , serializer: GetOtherProfileSerializer , status: :ok
    end

    def user_profile
        user = User.find(session[:current_user])
        render json: user, status: :ok
    end

    def change_password
        user = User.find_by(name: params[:name]) || User.find_by(email: params[:name])
        user.update(password: params[:newPassword])
        render json: user, status: :ok
    end
    def destroy
        user = User.find(params[:id])
        user.destroy
        session.delete(:current_user)
    end
   
end
