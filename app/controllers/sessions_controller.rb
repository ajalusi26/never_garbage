class SessionsController < ApplicationController
    
    require 'rest-client'

    def login
        user = User.find_by(name: params[:name]) || User.find_by(email: params[:name])
        
        if user&.authenticate(params[:password])

            session[:current_user] = user.id
          
            render json: user, status: :ok            
        else
            render json: {results: 'wrong password lmfaoo'}, status: :unauthorized 
        end

       
    end

    #check if session exists
    def is_logged_in
        
        if session[:current_user]
            
            user = User.find(session[:current_user])
          
            render json:user, status: :ok
        else
           
            render json: {status: "no one logged in"}
        end
          
    end
    
    
    def logout
        session[:current_user] = nil
        render json: "logged out", status: :ok
    end

    private

    def route_params
        params.permit(:id, :name, :password)
    end
end
