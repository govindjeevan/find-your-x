Rails.application.routes.draw do
  devise_for :users
  resources :markers do
    collection do
      get 'experience'
    end
    member do
      post 'found'
    end
  end

  get "play", :controller=>"markers", :action=>"experience"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
