class StageResponse < ApplicationRecord
  belongs_to :voter

  has_many :questions
end
