<template>
  <v-app>
    <Header />
    <v-main class="layout-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/global/Header";
export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.layout-main {
  background: #fafafa;
}
</style>
