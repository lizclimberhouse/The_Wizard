  # before_action :authenticate_user! // dont need this any longer because of the api controller
  # without this you dont have access to current user and you dont get headers back from the server
  
  # the .page takes in a page number, 

  #like:
    # current data looks like:
    # [
    #   { id: 1, name: 'steve', tags: [{id: 'mario'}] }
    #   { id: 2, name: 'jon', tags: [{id: 'hello'}] }
    # ]
    # SO...how do we get the users that have the same tags as me?
    
    # then make a SQL quer with an inner join.

    #     @total_pages = @users.total_pages # this is added for pagination
    # tags = current_user.tags.map { |tag| tag.name } # ==>>['mario', 'hello', 'zelda']

class Api::UsersController < Api::ApiController

  def tag
    @users = User
      .page(params[:page])
      .by_tag(current_user.id, params[:tag])
    @total_pages = @users.total_pages
    render 'user.jbuilder'
  end

  def like
    
    tags = current_user.tags.map { |tag| tag.name } 
    @users = User
      .page(params[:page])
      .like_users(current_user.id, tags)
    @total_pages = @users.total_pages
    render 'user.jbuilder'
  end

  def update
    user = User.find(params[:id])
    user.name = params[:name]
    user.email = params[:email]
    user.gamertag = params[:gamertag]
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      if !file.blank? 
        ext = File.extname(file.tempfile)
        obj = s3.bucket(s3_bucket).object("avatars/#{user.id}#{ext}")
        obj.upload_file(file.tempfile, acl: 'public-read')
        user.image = obj.public_url
        if user.save
          render json: user
        else
          handle_error(user) 
        end
      elsif user.save
        render json: user
      else
        handle_error(user)
      end
    rescue => e
      render json: { errors: e }, status: 422
    end
  end
end
# when we are using files in rails we want to use the tri-catch
# begin:
# my-s3-bucket/avatars/1.jp
# need this .blank? becuase if the picture isn't updated then it throws an error. tried .any? and .empty? we needed the correct truthiest thing.

# blank? # means undefined, missing, empty string, etc then it wont throw an error.

# handle_error(user) # this is from the api controller

        # render json: { errors: user.errors.full_messages }, status: 422
