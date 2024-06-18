// app/javascript/channels/video_call_channel.js
import consumer from "./consumer"

const videoCallChannel = consumer.subscriptions.create({ channel: "VideoCallChannel", room: "default_room" }, {
  connected() {
    console.log("Connected to the VideoCallChannel")
  },

  disconnected() {
    console.log("Disconnected from the VideoCallChannel")
  },

  received(data) {
    switch(data.type) {
      case 'offer':
        handleOffer(data.data)
        break;
      case 'answer':
        handleAnswer(data.data)
        break;
      case 'ice_candidate':
        handleIceCandidate(data.data)
        break;
    }
  },

  sendOffer(offer) {
    this.perform('send_offer', { offer: offer })
  },

  sendAnswer(answer) {
    this.perform('send_answer', { answer: answer })
  },

  sendIceCandidate(candidate) {
    this.perform('send_ice_candidate', { candidate: candidate })
  }
})

export default videoCallChannel
