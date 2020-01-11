Rails.application.routes.draw do
  resources :speakers
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }


  resources :markers do
    collection do
      get 'experience'
      get 'feed'
      get 'feed_webapp'
      get 'collection'
    end
    member do
      get 'found'
    end
  end

  get 'play', controller: 'markers', action: 'experience'
  root 'markers#experience'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
