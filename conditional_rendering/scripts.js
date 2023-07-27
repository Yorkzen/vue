Vue.createApp({
  data() {
    return {
      activeTab: 1,
    };
  },
  methods: {
    changeTab(tabNumber) {
      this.activeTab = tabNumber;
    },
  },
}).mount("#app");
