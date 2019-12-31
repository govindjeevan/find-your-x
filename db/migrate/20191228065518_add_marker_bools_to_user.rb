class AddMarkerBoolsToUser < ActiveRecord::Migration[5.2]
  def change
    (1..10).each do |num|
      add_column :users, "marker_#{num}", :boolean, default: false
    end
  end
end
