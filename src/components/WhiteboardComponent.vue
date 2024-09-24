<template>
    <div class="whiteboard">
      <canvas ref="canvas" id="whiteboard-canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { fabric } from 'fabric';
  import io from 'socket.io-client';
  
  export default {
    props: ['roomId'],
    data() {
      return {
        canvas: null,
        socket: null,
      };
    },
    mounted() {
      // Initialize canvas
      this.canvas = new fabric.Canvas(this.$refs.canvas, {
        width: 800,
        height: 600,
        backgroundColor: 'white',
      });
  
      // Initialize socket connection
      this.socket = io('http://localhost:5000');
      this.socket.emit('joinRoom', { roomId: this.roomId });
  
      // Listen for whiteboard updates
      this.socket.on('drawing', (data) => {
        fabric.util.enlivenObjects([data], (objects) => {
          objects.forEach((obj) => this.canvas.add(obj));
        });
      });
  
      // Broadcast drawing events to other users
      this.canvas.on('object:added', (e) => {
        this.socket.emit('drawing', {
          roomId: this.roomId,
          object: e.target.toObject(),
        });
      });
    },
  };
  </script>
  
  <style scoped>
  .whiteboard {
    width: 100%;
    height: 100%;
  }
  canvas {
    border: 1px solid #ccc;
  }
  </style>
  