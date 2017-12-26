class Voter < ApplicationRecord
  has_many :stage_responses
  before_create :add_uuid

  private
  def add_uuid
    self.uuid = SecureRandom.uuid
  end
end
