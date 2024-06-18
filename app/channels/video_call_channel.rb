# app/channels/video_call_channel.rb
class VideoCallChannel < ApplicationCable::Channel
  def subscribed
    stream_from "video_call_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_offer(data)
    ActionCable.server.broadcast("video_call_#{params[:room]}", { type: 'offer', data: data['offer'] })
  end

  def send_answer(data)
    ActionCable.server.broadcast("video_call_#{params[:room]}", { type: 'answer', data: data['answer'] })
  end

  def send_ice_candidate(data)
    ActionCable.server.broadcast("video_call_#{params[:room]}", { type: 'ice_candidate', data: data['candidate'] })
  end
end
