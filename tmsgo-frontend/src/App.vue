<template>
  <div>
    <h1>Axios with Global Setting</h1>
    <p v-if="data">Fetched Data: {{ data }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('http://localhost:8088/api/hello');
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

