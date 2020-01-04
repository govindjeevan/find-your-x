class Marker < ApplicationRecord
  require 'geokit'
  acts_as_mappable :default_units => :kms,
                   :default_formula => :sphere,
                   :distance_field_name => :distance

  def distance(c_lat, c_lng)
    cur_loc = Geokit::LatLng.new(c_lat, c_lng)
    destination = lat.to_s + ',' + lng.to_s
    puts cur_loc.distance_to(destination)
    cur_loc.distance_to(destination)
  end

  def self.feed(c_lat, c_lng, limit)
    if c_lat == -1.0 && c_lng.to_i == -1.0
      Marker.all
    else
      Marker.select { |m| m.distance(c_lat, c_lng) < limit }
    end

  end

  def colour
    case self.speaker.to_i
    when 1
      "#eb3734"
    when 2
      "#0098f0"
    when 3
      "#24a1a3"
    when 4
      "#34ebeb"
    when 5
      "#eb34e2"
    when 6
      "#e0dd1b"
    when 7
      "#4d38c2"
    when 8
      "#fa7000"
    when 9
      "#003e42"
    when 10
      "#a6e1ff"
    when 11
      "#26734c"
    when 12
      "#691a00"
    end
  end


end
