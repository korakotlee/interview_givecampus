class Post < ApplicationRecord
  belongs_to :author

  validates :title, presence: true, length: { minimum: 3 }
  validates :content, presence: true
  validates :slug, presence: true, uniqueness: true

  before_validation :generate_slug, if: :title_changed?

  private

  def generate_slug
    return if title.blank?

    base_slug = title.parameterize
    self.slug = base_slug

    # Add random suffix if collision exists
    while Post.where(slug: self.slug).where.not(id: id).exists?
      self.slug = "#{base_slug}-#{SecureRandom.hex(2)}"
    end
  end
end
