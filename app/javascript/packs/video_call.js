import videoCallChannel from "../channels/video_call_channel"

let localStream;
let remoteStream;
let peerConnection;
const configuration = {
  'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }]
};

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('callButton').addEventListener('click', call);
document.getElementById('hangupButton').addEventListener('click', hangup);

async function start() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById('localVideo').srcObject = localStream;
}

function call() {
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.addStream(localStream);

  peerConnection.onicecandidate = ({ candidate }) => {
    if (candidate) {
      videoCallChannel.sendIceCandidate(candidate);
    }
  };

  peerConnection.onaddstream = ({ stream }) => {
    remoteStream = stream;
    document.getElementById('remoteVideo').srcObject = remoteStream;
  };

  peerConnection.createOffer().then(offer => {
    peerConnection.setLocalDescription(offer);
    videoCallChannel.sendOffer(offer);
  });
}

function handleOffer(offer) {
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.addStream(localStream);

  peerConnection.onicecandidate = ({ candidate }) => {
    if (candidate) {
      videoCallChannel.sendIceCandidate(candidate);
    }
  };

  peerConnection.onaddstream = ({ stream }) => {
    remoteStream = stream;
    document.getElementById('remoteVideo').srcObject = remoteStream;
  };

  peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
    peerConnection.createAnswer().then(answer => {
      peerConnection.setLocalDescription(answer);
      videoCallChannel.sendAnswer(answer);
    });
  });
}

function handleAnswer(answer) {
  peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function handleIceCandidate(candidate) {
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

function hangup() {
  peerConnection.close();
  peerConnection = null;
}
