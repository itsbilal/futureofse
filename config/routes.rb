Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/vote/', to: 'vote#index', as: 'vote_index'
  root 'vote#index'
end
