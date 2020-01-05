speakers = Speaker.where(id: @markers.pluck(:speaker))

json.array! @markers do |marker|
  speaker = speakers.detect { |s| s.id == marker.speaker }
  json.id marker.id
  json.lat marker.lat
  json.lng marker.lng
  if speaker
    json.speaker_id speaker.id
    json.speaker_title "#{speaker.name}: #{speaker.title}"
  end
end
