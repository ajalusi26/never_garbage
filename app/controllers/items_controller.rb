class ItemsController < ApplicationController
    
    require 'rest-client'
    
    def index  
        render json: Item.all, status: :ok
    end

    def show
        render json: Item.find(params[:id]), status: :ok
    end

    def related_items

        is_saved = SavedItem.exists?(item_id: params[:item_id], user_id: session[:current_user])
        category = Item.find(params[:item_id]).category
        
        render json: {items: category.items, saved: is_saved}, status: :ok
    end

    def user_saved_items
        ids = User.find(session[:current_user]).saved_items.pluck(:item_id)
        items = Item.where(id: ids)
        render json: items, status: :ok
    end

    def items_in_radius
        
        user_zip_fetch = RestClient.get 'https://www.zipcodeapi.com/rest/VELHsIXaIJu26Ff204Adp8EgonZg8My74Is0mc6reILdtD0FRm8ZxZ9SyfkaiPLU/radius.json/' + params[:user_zip] + '/' + params[:distance] + '/mile'
        user_zip_fetch_array = JSON.parse(user_zip_fetch)['zip_codes'] 

        all_zips = user_zip_fetch_array.collect{|zip| zip['zip_code'].to_i}
        
        data = Item.where(zipcode: all_zips)
        render json: data , status: :ok
    end

    def user_feed
        feed = []
        user = User.find(session[:current_user]).followings.map{|user| user.posted_items.map{|item| feed << item}}
        render json: feed, status: :ok
    end
end
