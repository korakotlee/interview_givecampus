require 'rails_helper'

RSpec.describe Mutations::CreatePost do
  let(:author_name) { 'John Doe' }
  let(:query) do
    <<~GQL
      mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          post {
            title
            content
            category
            author {
              name
            }
          }
          errors
        }
      }
    GQL
  end

  it 'creates a post and an author if it doesn\'t exist' do
    expect {
      BackendSchema.execute(query, variables: {
        input: {
          title: 'New Story',
          content: 'Some long story about tech.',
          category: 'Engineering',
          authorName: author_name
        }
      })
    }.to change(Post, :count).by(1).and change(Author, :count).by(1)

    result = BackendSchema.execute(query, variables: {
      input: {
        title: 'Another Story',
        content: 'Content',
        category: 'Engineering',
        authorName: author_name
      }
    })

    expect(result.dig('data', 'createPost', 'post', 'author', 'name')).to eq(author_name)
    # Author count should not change since 'John Doe' already exists
    expect(Author.where(name: author_name).count).to eq(1)
  end

  it 'returns errors for invalid input' do
    result = BackendSchema.execute(query, variables: {
      input: {
        title: '', # Invalid
        content: 'Content',
        category: 'Engineering',
        authorName: author_name
      }
    })

    expect(result.dig('data', 'createPost', 'errors')).not_to be_empty
    expect(result.dig('data', 'createPost', 'post')).to be_nil
  end
end
