require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_least(3) }
    it { should validate_presence_of(:content) }
  end

  describe 'slug generation' do
    it 'generates a slug from the title before validation' do
      post = Post.new(title: 'Hello World', content: 'content', author: create(:author))
      post.validate
      expect(post.slug).to eq('hello-world')
    end

    it 'adds a random suffix if the slug already exists' do
      create(:post, title: 'Unique Title', slug: 'unique-title')
      post = Post.new(title: 'Unique Title', content: 'content', author: create(:author))
      post.validate
      expect(post.slug).to start_with('unique-title-')
      expect(post.slug.length).to be > 'unique-title'.length
    end
  end
end
