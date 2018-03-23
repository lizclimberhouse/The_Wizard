# def change
  #   chagning the default col value is irresversible if you use change.
  # end

  # updating all of the users who dont have an image or the old users that had the old default imgae. NOT the users that have a regular image.
  
  # down
    # updating all of the users who dont have an image and teh old users that had the old default imgae


class DefaultImagesToUsers < ActiveRecord::Migration[5.1]
  def up
    default = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'
    change_column :users, :image, :string, default: default
    User.where(image: nil).update_all(image: default)
  end

  def down
    default = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'
    change_column :users, :image, :string, default: nil
    User.where(image: default).update_all(image: nil)
  end
end
