module Mutations
  class UpdatePost < BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :content, String, required: false
    argument :category, String, required: false

    field :post, Types::PostType, null: true
    field :errors, [String], null: false

    def resolve(id:, title: nil, content: nil, category: nil)
      post = Post.find(id)

      update_params = {
        title: title,
        content: content,
        category: category
      }.compact

      if post.update(update_params)
        {
          post: post,
          errors: []
        }
      else
        {
          post: nil,
          errors: post.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordNotFound
      {
        post: nil,
        errors: ["Post not found"]
      }
    end
  end
end
