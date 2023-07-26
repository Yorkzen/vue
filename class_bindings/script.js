Vue.createApp({
  data() {
    return {
      activeLetter: "A",
    };
  },
  methods: {
    setActive(letter) {
      this.activeLetter = letter;
    },
  },
}).mount("#app");
