class Voter < ApplicationRecord
  before_create :add_uuid

  private
  def add_uuid
    self.uuid = SecureRandom.uuid
  end
end
