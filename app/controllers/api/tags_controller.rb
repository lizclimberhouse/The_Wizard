class Api::TagsController < Api::ApiController
  # before_action :authenticate_user! // dont need this bc of the api controller just created
  # for every controller wherw you want current user you need to use ^ before acton

  def index
    render json: current_user.tags
  end

  def destroy
    Tagging.find_by(user_id: current_user.id, tag_id: params[:id]).destroy
    # this is not destroying the entire tag, otherwise it would disapear from everyone. So we are just destroying the connection bwtween tehm
  end

  # Tags.all or could send in params for a users id, if esle for a single ise id. best to have a separte route for that

  def create
    tag = Tag.find_or_create_by(name: params[:tag][:name])
    if !current_user.tags.find_by(id: tag.id) # use this instead of .find(tag.id)< returns an error but .find_by returns nil and goes throgh tot eh if statement.
        Tagging.create(user_id: current_user.id, tag_id: tag.id)
        render json: tag
    end
        # this is the only way we will return a tag, if the tag doesn;t exisit.
  end

  # def create
  #   name = params[:tag][:name]
  #   tag = Tag.find_or_create_by(name: name)
  #   if !current_user.tags.find_by(id: tag.id)
  #     Tagging.create(user_id: current_user.id, tag_id: tag.id)
  #     render json: tag
  #   end
  # end
end
