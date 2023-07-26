Vue.createApp({
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increaseCount() {
      this.count++;
    },
    resetCount() {
      this.count = 0;
    },
  },
}).mount("#app");
