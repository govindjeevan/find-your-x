class ChangeMarkerPrecision < ActiveRecord::Migration[5.2]
  def change
    change_column :markers, :lat, :decimal, :precision => 6, :scale => 4
    change_column :markers, :lng, :decimal, :precision => 6, :scale => 4
  end
end
