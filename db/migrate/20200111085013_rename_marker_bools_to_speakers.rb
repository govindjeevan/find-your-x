class RenameMarkerBoolsToSpeakers < ActiveRecord::Migration[5.2]
  def change
    (1..12).each do |num|
      rename_column :users, "marker_#{num}", "speaker_#{num}"
    end
  end
end
