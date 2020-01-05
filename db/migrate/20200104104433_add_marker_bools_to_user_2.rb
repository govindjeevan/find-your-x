class AddMarkerBoolsToUser2 < ActiveRecord::Migration[5.2]
  def change
    (11..12).each do |num|
      add_column :users, "marker_#{num}", :boolean, default: false
    end
  end
end
