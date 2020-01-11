class AddAdminUser < ActiveRecord::Migration[5.2]
  def change
    User.create(email: 'govindjeevan7@gmail.com', admin: true, password: "password")
  end
end
