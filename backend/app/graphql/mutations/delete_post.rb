module Mutations
  class DeletePost < BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: true
    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve(id:)
      post = Post.find(id)

      if post.destroy
        {
          id: id,
          success: true,
          errors: []
        }
      else
        {
          id: id,
          success: false,
          errors: post.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordNotFound
      {
        id: id,
        success: false,
        errors: ["Post not found"]
      }
    end
  end
end
