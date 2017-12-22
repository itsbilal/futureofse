STAGES = YAML.load_file(Rails.root.join('config/stages.yml'))['stages']

class StageController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    render json: STAGES
  end

  def get
    render json: STAGES[params[:num]]
  end

  def put
    if STAGES[params[:num].to_i].nil?
      render status: 404
    end

    if STAGES[params[:num].to_i]['type'] == 'ident'
      v = Voter.new(params.require(:stage).permit(:cls, :name, :email, :current, :reason))
      v.save

      render json: {:uuid => v.uuid}
    else
      # Handle other stages
    end
  end
end
