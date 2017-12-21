Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/vote', to: 'vote#index', as: 'vote_index'
  root to: redirect('/vote')

  get '/api/stage', to: 'stage#index', as: 'stage_index'
  get '/api/stage/:num', to: 'stage#get', as: 'stage_get'
  put '/api/stage/:num', to: 'stage#put', as: 'stage_put'
end
