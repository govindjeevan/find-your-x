class MarkersController < ApplicationController
  protect_from_forgery except: [:feed]
  before_action :authenticate_user!, except: [:feed]
  before_action :set_marker, only: %i[found show edit update destroy]
  before_action :check_admin_access, except: %i[experience feed feed_webapp found collection]
  layout :resolve_layout

  def feed
    @markers = Marker.feed(params[:lat].to_f, params[:lng].to_f, 0.02)
  end

  def feed_webapp
    @markers = Marker.feed(params[:lat].to_f, params[:lng].to_f, 0.05)
  end

  def experience
  end

  def found
    current_user.update("speaker_#{@marker.speaker}": true)
    redirect_to speaker_path(@marker.speaker), notice: 'You have found an X!'
  end

  # GET /markers
  # GET /markers.json
  def index
    @markers = Marker.all
  end

  def speakers
    @speakers = Speaker.all
  end

  def collection
    @leaders = User.all.sort_by {|user| user.x_count }.reverse.first(10)
  end

  # GET /markers/1
  # GET /markers/1.json
  def show
  end

  # GET /markers/new
  def new
    @marker = Marker.new
  end

  # GET /markers/1/edit
  def edit
  end

  # POST /markers
  # POST /markers.json
  def create
    @marker = Marker.new(marker_params)

    respond_to do |format|
      if @marker.save
        format.html { redirect_to new_marker_path, notice: 'Marker was successfully created.' }
        format.json { render :show, status: :created, location: @marker }
      else
        format.html { render :new }
        format.json { render json: @marker.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /markers/1
  # PATCH/PUT /markers/1.json
  def update
    respond_to do |format|
      if @marker.update(marker_params)
        format.html { redirect_to @marker, notice: 'Marker was successfully updated.' }
        format.json { render :show, status: :ok, location: @marker }
      else
        format.html { render :edit }
        format.json { render json: @marker.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /markers/1
  # DELETE /markers/1.json
  def destroy
    @marker.destroy
    respond_to do |format|
      format.html { redirect_to markers_url, notice: 'Marker was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_marker
    @marker = Marker.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def marker_params
    params.require(:marker).permit(:lat, :lng, :speaker)
  end

  def check_admin_access
    return if current_user.admin?

    redirect_back(fallback_location: :root, alert: 'You are not allowed to access this page.')
  end

  def leaderboard
    @leaders = User.all.sort_by {|user| user.x_count }.reverse.first(10)
  end


  def resolve_layout
    case action_name
    when "experience"
      "aframe"
    else
      "application"
    end
  end


end
