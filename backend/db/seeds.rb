# Seed data for GC Tech Blog
Author.destroy_all
Post.destroy_all

authors = [
  { name: "Kyler Swift", bio: "Loves Ruby, React, and Raising funds for schools.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyler" },
  { name: "Sara Code", bio: "GraphQL enthusiast and champion of donor empathy.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
  { name: "Ben Dash", bio: "Frontend wizard with a passion for educational equity.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ben" }
]

created_authors = authors.map { |a| Author.create!(a) }

posts = [
  {
    title: "Scaling Donor Management with Ruby on Rails",
    content: "When we started GC, we knew Rails was the right choice. Here is how we scaled it to millions of donations...",
    slug: "scaling-donor-management",
    category: "Engineering",
    published_at: 2.days.ago,
    author: created_authors[0]
  },
  {
    title: "Why Empathy is Our Greatest Engineering Tool",
    content: "In educational fundraising, we aren't just moving bits; we are moving stories. Curiosity and empathy drive our architecture...",
    slug: "empathy-in-engineering",
    category: "Culture",
    published_at: 1.day.ago,
    author: created_authors[1]
  },
  {
    title: "Bento Box UI: Organizing Complexity for Non-Profits",
    content: "Non-profit admins have limited time. Our new UI design pattern simplifies complex data into digestible chunks...",
    slug: "bento-box-ui",
    category: "Design",
    published_at: Time.current,
    author: created_authors[2]
  }
]

posts.each { |p| Post.create!(p) }

puts "Seeded #{Author.count} authors and #{Post.count} posts."
