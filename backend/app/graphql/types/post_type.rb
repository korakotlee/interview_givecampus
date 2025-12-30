# frozen_string_literal: true

module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :content, String, null: true
    field :slug, String, null: true
    field :category, String, null: true
    field :published_at, ::GraphQL::Types::ISO8601DateTime, null: true
    field :author, Types::AuthorType, null: true
  end
end
