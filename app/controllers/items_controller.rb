class ItemsController < ApplicationController
    
    require 'rest-client'
    
    def index  
        render json: Item.all, status: :ok
    end

    def show
        render json: Item.find(params[:id]), status: :ok
    end

    def create 
        category_id = Category.find_by(name: params[:category_name]).id
        user = User.find(session[:current_user])
        item = Item.create!(user_id: user.id, category_id: category_id, category_name: params[:category_name], zipcode: user.zipcode, state: user.state, city: user.city, image: params[:image], name: params[:name], description: params[:description], condition: params[:condition], price: params[:price], sold: false)
        render json: item, status: :ok
    end

    def destroy
        item = Item.find(params[:id]).destroy
        render json: "deleted", status: :ok
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
        
        user_zip_fetch = RestClient.get 'https://www.zipcodeapi.com/rest/DemoOnly00DfSUfi6iVvpmoo8SvFfWzGdVw5ZbfmWcxLfevzXuxT1jjdvmJ7rJgF/radius.json/33065/' + params[:distance] + '/miles'
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
