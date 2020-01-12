class ChangeMarkerPrecision < ActiveRecord::Migration[5.2]
  def change
    change_column :markers, :lat, :decimal, :precision => 15, :scale => 13
    change_column :markers, :lng, :decimal, :precision => 15, :scale => 13
  end
end
