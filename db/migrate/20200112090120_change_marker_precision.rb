class ChangeMarkerPrecision < ActiveRecord::Migration[5.2]
  def up
    change_column :markers, :lat, :decimal, :precision => 30, :scale => 20
    change_column :markers, :lng, :decimal, :precision => 30, :scale => 20
  end

  def down
    change_column :markers, :lat, :decimal, :precision => 15, :scale => 10
    change_column :markers, :lat, :decimal, :precision => 15, :scale => 10
  end
end
