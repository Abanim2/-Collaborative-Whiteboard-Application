<template>
  <div class="room-container">
    <div class="toolbar">
      <h2>Room: {{ roomId }}</h2>
    </div>
    <div class="board-chat-container">
      <WhiteboardComponent :roomId="roomId" />
      <ChatComponent :roomId="roomId" />
    </div>
  </div>
</template>

<script>
import WhiteboardComponent from '../components/WhiteboardComponent.vue';
import ChatComponent from '../components/ChatComponent.vue';

export default {
  name: 'ChatRoom',
  props: ['roomId'],
  components: {
    WhiteboardComponent,
    ChatComponent,
  },
  data() {
    return {
      name: localStorage.getItem('name'),
    };
  },
};
</script>

<style scoped>
.room-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.board-chat-container {
  display: flex;
  flex: 1;
}
</style>
