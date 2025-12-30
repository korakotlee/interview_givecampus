# frozen_string_literal: true

module Types
  class AuthorType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :bio, String, null: true
    field :avatar, String, null: true
  end
end
