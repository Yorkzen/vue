Vue.createApp({
  data() {
    return {
      userName: "John Doe",
      currentDate: new Date().toLocaleString("en-us"),
    };
  },
}).mount("#main-app"); // Change the mount target to "#main-app"
