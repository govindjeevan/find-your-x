require "application_system_test_case"

class MarkersTest < ApplicationSystemTestCase
  setup do
    @marker = markers(:one)
  end

  test "visiting the index" do
    visit markers_url
    assert_selector "h1", text: "Markers"
  end

  test "creating a Marker" do
    visit markers_url
    click_on "New Marker"

    fill_in "Lat", with: @marker.lat
    fill_in "Lng", with: @marker.lng
    click_on "Create Marker"

    assert_text "Marker was successfully created"
    click_on "Back"
  end

  test "updating a Marker" do
    visit markers_url
    click_on "Edit", match: :first

    fill_in "Lat", with: @marker.lat
    fill_in "Lng", with: @marker.lng
    click_on "Update Marker"

    assert_text "Marker was successfully updated"
    click_on "Back"
  end

  test "destroying a Marker" do
    visit markers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Marker was successfully destroyed"
  end
end
