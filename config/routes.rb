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
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
