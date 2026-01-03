require 'rails_helper'

RSpec.describe Mutations::UpdatePost do
  let!(:post) { create(:post, title: 'Old Title') }
  let(:query) do
    <<~GQL
      mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          post {
            id
            title
          }
          errors
        }
      }
    GQL
  end

  it 'updates the post' do
    BackendSchema.execute(query, variables: {
      input: {
        id: post.id.to_s,
        title: 'New Title'
      }
    })

    expect(post.reload.title).to eq('New Title')
  end

  it 'returns errors if post not found' do
    result = BackendSchema.execute(query, variables: {
      input: {
        id: '999',
        title: 'New Title'
      }
    })

    expect(result.dig('data', 'updatePost', 'errors')).to include('Post not found')
  end
end
