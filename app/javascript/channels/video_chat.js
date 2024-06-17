// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//   .then(stream => {
//     const video = document.getElementById('local-video')
//     video.srcObject = stream
//     video.onloadedmetadata = () => video.play()
//   })
//   .catch(error => console.error('Error accessing media devices.', error))
import consumer from "./consumer"

const pc = new RTCPeerConnection()

pc.onicecandidate = event => {
  if (event.candidate) {
    consumer.subscriptions.create({ channel: "ChatChannel", room: "Room1" }).send({
      type: "candidate",
      candidate: event.candidate
    })
  }
}

pc.ontrack = event => {
  const remoteVideo = document.getElementById('remote-video')
  if (remoteVideo.srcObject !== event.streams[0]) {
    remoteVideo.srcObject = event.streams[0]
    remoteVideo.play()
  }
}

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    const localVideo = document.getElementById('local-video')
    localVideo.srcObject = stream
    localVideo.play()

    stream.getTracks().forEach(track => pc.addTrack(track, stream))
  })

// Listen for signaling messages
consumer.subscriptions.create({ channel: "ChatChannel", room: "Room1" }, {
  received(data) {
    if (data.type === "offer") {
      pc.setRemoteDescription(new RTCSessionDescription(data))
      pc.createAnswer()
        .then(answer => pc.setLocalDescription(answer))
        .then(() => consumer.subscriptions.create({ channel: "ChatChannel", room: "Room1" }).send(pc.localDescription))
    } else if (data.type === "answer") {
      pc.setRemoteDescription(new RTCSessionDescription(data))
    } else if (data.type === "candidate") {
      pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    }
  }
})
