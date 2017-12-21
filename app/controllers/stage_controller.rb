STAGES = YAML.load_file(Rails.root.join('config/stages.yml'))['stages']

class StageController < ApplicationController
  def index
    render json: STAGES
  end

  def get
    render json: STAGES[params[:num]]
  end

  def put
    if STAGES[params[:num]].nil?
      render status: 404
    end

    if STAGES[params[:num]].type == 'ident'
      v = Voter.new(params.require(:stage).permit(:class, :name, :email, :current, :reason))
      v.save
    else
      # Handle other stages
    end
  end
end
