class StageResponse < ApplicationRecord
  belongs_to :voter

  has_many :questions
  has_many :program_views
end
