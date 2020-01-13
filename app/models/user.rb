class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]


  def x_count
    i=0
    (1..12).each do |num|
      if self["speaker_#{num}"] == true
        i=i+1
      end
    end
    i
  end

end
