class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  # taggings = User.taggings
  # taggings.map { |ti| Tag.find(ti.tag_id) }
  # this is complicated so...
  # I just want to be able to say  "User.tags" therefore I wan to use the below through table
  has_many :taggings
  has_many :tags, through: :taggings

    # User. therefore 'self'
  def self.like_users(id, tags)
    tags = tags.any? ? tags : [' ']
    select('DISTINCT(users.id), users.name, image')
    .joins('INNER JOIN taggings ts 
              ON ts.user_id = users.id
            INNER JOIN tags t 
              ON t.id = ts.tag_id')
    .where('t.name in (?) AND users.id <> ?', tags, id)
  end

  def self.by_tag(id, tag)
    select('DISTINCT(users.id), users.name, image')
    .joins('INNER JOIN taggings ts 
              ON ts.user_id = users.id
            INNER JOIN tags t 
              ON t.id = ts.tag_id')
    .where('t.name = (?) AND users.id <> ?', tag, id)
  end
end

 # there is no possible way to make this a tag, bc we already stripped out spaces as tags elsewhere.
 # if the col is ambiguous (such as id) we have to use the table name or the ...
# DISTINCT need the distinct so that we don;t get teh same user back for multple matching tags. ex: dave also has tags for mario and hello
 # defining t here to reuse it
 # these ? are like params and after you close the () you start adding them in order
#t.* = give me everything out of this table t. I'm actually defining in the inner join


