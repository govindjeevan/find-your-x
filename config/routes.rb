Rails.application.routes.draw do
  resources :markers do
    collection do
      get 'experience'
    end
  end

  get "play", :controller=>"markers", :action=>"experience"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
