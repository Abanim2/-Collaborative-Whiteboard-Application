<template>
    <div class="chat">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message">
          <strong>{{ message.sender }}:</strong> {{ message.text }}
        </div>
      </div>
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message"
      />
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    props: ['roomId'],
    data() {
      return {
        socket: null,
        messages: [],
        newMessage: '',
        name: localStorage.getItem('name'),
      };
    },
    mounted() {
      this.socket = io('http://localhost:5000');
      this.socket.emit('joinRoom', { roomId: this.roomId });
  
      // Listen for incoming messages
      this.socket.on('message', (message) => {
        this.messages.push(message);
      });
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        const message = {
          sender: this.name,
          text: this.newMessage,
          roomId: this.roomId,
        };
  
        // Send message to server
        this.socket.emit('chatMessage', message);
  
        // Add message locally
        this.messages.push(message);
        this.newMessage = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .chat {
    width: 300px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
    padding: 10px;
  }
  .messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  input {
    padding: 10px;
    font-size: 16px;
  }
  </style>
  