module Mutations
  class CreatePost < BaseMutation
    argument :title, String, required: true
    argument :content, String, required: true
    argument :category, String, required: false
    argument :author_name, String, required: true

    field :post, Types::PostType, null: true
    field :errors, [String], null: false

    def resolve(title:, content:, author_name:, category: nil)
      author = Author.find_or_create_by(name: author_name)

      post = Post.new(
        title: title,
        content: content,
        category: category,
        author: author
      )

      if post.save
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
    end
  end
end
