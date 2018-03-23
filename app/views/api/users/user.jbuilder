json.total_pages @total_pages
json.users @users do |user|
  json.id user.id
  json.name user.name
  json.image user.image
  json.tags user.tags
end
# this is a domaine specific language, like a languge on top of ruby.
# actually building a json object right now, so tell it your keys and where they come from