class AddInstaToSpeaker < ActiveRecord::Migration[5.2]
  def change
    add_column :speakers, :insta, :string
  end
end
