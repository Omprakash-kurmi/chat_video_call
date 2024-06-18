Rails.application.routes.draw do
  # get 'video_calls/show'
  get 'video_calls/show', to: 'video_calls#show', as: 'video_call'
  # get 'messages/create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :messages, only: :create
  
end
