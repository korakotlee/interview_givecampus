require 'rails_helper'

RSpec.describe Author, type: :model do
  describe 'validations' do
    subject { create(:author) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  describe 'associations' do
    it { should have_many(:posts).dependent(:destroy) }
  end
end
