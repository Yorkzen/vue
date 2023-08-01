Vue.createApp({
  data() {
    return {
      x: 12,
      y: 4,
      fruitBasket: [
        "🍏 Apple",
        "🍌 Banana",
        "🍉 Melon",
        "🫐 Blueberry",
        "🍓 Strawberry",
        "🍍 Pineapple",
        "🥭 Mango",
      ],
    };
  },
  methods: {
    updateCoordinates(event) {
      const { offsetX, offsetY } = event;
      const deadSpot = document.querySelector(".dead-spot");
      const deadSpotRect = deadSpot.getBoundingClientRect();

      // Check if the mouse is over the dead spot area
      if (
        offsetX >= deadSpotRect.left &&
        offsetX <= deadSpotRect.right &&
        offsetY >= deadSpotRect.top &&
        offsetY <= deadSpotRect.bottom
      ) {
        // Mouse is over the dead spot, do nothing
        return;
      }

      this.x = offsetX;
      this.y = offsetY;
    },
    removeFruit(fruitToRemove) {
      this.fruitBasket = this.fruitBasket.filter(
        (fruit) => fruit !== fruitToRemove
      );
    },
  },
}).mount("#app");
