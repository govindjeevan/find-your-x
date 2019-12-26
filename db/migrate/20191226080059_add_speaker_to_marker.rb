class AddSpeakerToMarker < ActiveRecord::Migration[5.2]
  def change
    add_column :markers, :speaker, :int
  end
end
