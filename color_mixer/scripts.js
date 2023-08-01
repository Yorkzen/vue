Vue.createApp({
  data() {
    return {
      red: 30,
      green: 144,
      blue: 255,
    };
  },
  computed: {
    colorValue() {
      return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    },
  },
  methods: {
    updateBackground() {
      const rgbColor = `rgb(${this.red}, ${this.green}, ${this.blue})`;
      document.body.style.backgroundColor = rgbColor;
    },
  },
  mounted() {
    // Load a default color (dodgerblue) at the beginning
    this.updateBackground();
  },
}).mount("#app");
