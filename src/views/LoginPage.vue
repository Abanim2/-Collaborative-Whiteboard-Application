<template>
  <div class="login-container">
    <h2>Join a Whiteboard Session</h2>
    <form @submit.prevent="joinRoom">
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="room">Room Name</label>
        <input type="text" id="room" v-model="room" required />
      </div>
      <button type="submit">Join</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      room: '',
    };
  },
  methods: {
    joinRoom() {
      // Generate a unique room ID by combining room name with a random number
      const roomId = `${this.room}-${Math.floor(Math.random() * 10000)}`;

      // Save user info to localStorage
      localStorage.setItem('name', this.name);
      localStorage.setItem('roomId', roomId);

      // Navigate to the whiteboard/chat room
      this.$router.push(`/room/${roomId}`);
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}
input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
