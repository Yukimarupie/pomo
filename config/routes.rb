Rails.application.routes.draw do
  resources :tasks do
    patch :done, on: :collection    
  end
  root 'tasks#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
