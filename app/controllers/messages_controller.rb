class MessagesController < ApplicationController
  def create
    ActionCable.server.broadcast("chat_Room1", message: params[:message])
    head :ok
  end
end
