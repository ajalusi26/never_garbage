Rails.application.routes.draw do
  resources :user_reviews
  resources :saved_items
  resources :reviews
  resources :follows
  resources :categories
  resources :items
  resources :users

  post '/login', to: 'sessions#login'
  get '/is_logged_in', to: 'sessions#is_logged_in'
  get '/logout', to: 'sessions#logout'
  post '/items_in_radius', to: 'items#items_in_radius'
  get '/user_saved_items', to: 'items#user_saved_items'
  post '/change_password', to: 'users#change_password'
  post '/related_items', to: 'items#related_items'
  get '/user_profile', to: 'users#user_profile'
  get '/user_feed', to: 'items#user_feed'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
