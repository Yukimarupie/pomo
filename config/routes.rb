Rails.application.routes.draw do
  get 'testuser', to: 'tasks#testuser'

  resources :tasks do
    patch :done, on: :member 
    #collection: ルーティングにコレクション（/photos/searchのようにidを伴わないパス）を追加するときに使う https://bityl.co/7548
    #member: idが伴う時。
  end
  root 'tasks#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
