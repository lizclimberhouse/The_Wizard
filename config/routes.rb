Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get '/like_users', to: 'users#like' 
    get '/users/:tag', to: 'users#tag'
    resources :users, only: :update
    # get '/users/:id', to 'users#id'
    # get '/users/:tag', to 'users#tag' this can never get to bc of the line above it
    resources :tags, only: [:index, :create, :destroy]
  end
  
  get '*other', to: 'static#index'
end

# 'users#like' therefore this is going to the users controller like def.
  # only: :update this only creates routes for this one, if you dont add it you will have routes for everything else and other dev's will get comfused. Adn you can theoretically still hit those routes but will get an error.

  # get '*other', to: 'static#index' Do not place any routes below this one