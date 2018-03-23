# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
contra = Tag.create(name: 'contra')
marblemadness = Tag.create(name: 'marblemadness')
excitebike = Tag.create(name: 'excitebike')
tags = [contra, marblemadness, excitebike]

100.times do 
  name = Faker::Name.name
  u = User.create(
    name: name,
    email: Faker::Internet.unique.email,
    password: 'password'
  )
  tags.each do |tag|
    Tagging.create(user_id: u.id, tag_id: tag.id)
  end
end
