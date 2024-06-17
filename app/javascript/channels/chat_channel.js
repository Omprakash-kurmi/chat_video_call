import consumer from "./consumer"

consumer.subscriptions.create({ channel: "ChatChannel", room: "Room1" }, {
  connected() {
    console.log("Connected to the chat room!")
  },

  disconnected() {
    console.log("Disconnected from the chat room!")
  },

  received(data) {
    const chatBox = document.getElementById("chat-box")
    chatBox.innerHTML += `<p>${data.message}</p>`
  }
})
