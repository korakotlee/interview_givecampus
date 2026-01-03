require 'rails_helper'

RSpec.describe Mutations::DeletePost do
  let!(:post) { create(:post) }
  let(:query) do
    <<~GQL
      mutation DeletePost($input: DeletePostInput!) {
        deletePost(input: $input) {
          success
          errors
        }
      }
    GQL
  end

  it 'deletes the post' do
    result = BackendSchema.execute(query, variables: { input: { id: post.id.to_s } })
    expect(result.dig('data', 'deletePost', 'success')).to be true
    expect(Post.exists?(post.id)).to be false
  end

  it 'returns false and error if post not found' do
    result = BackendSchema.execute(query, variables: { input: { id: '999' } })
    expect(result.dig('data', 'deletePost', 'success')).to be false
    expect(result.dig('data', 'deletePost', 'errors')).to include('Post not found')
  end
end
