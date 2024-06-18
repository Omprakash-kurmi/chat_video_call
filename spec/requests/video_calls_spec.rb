require 'rails_helper'

RSpec.describe "VideoCalls", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/video_calls/show"
      expect(response).to have_http_status(:success)
    end
  end

end
