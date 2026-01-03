FactoryBot.define do
  factory :post do
    title { "Sample Post" }
    content { "This is sample content." }
    category { "Tech" }
    author
  end
end
