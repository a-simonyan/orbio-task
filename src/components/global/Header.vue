<template>
  <v-app-bar fixed color="white" elevation="3" class="py-2 px-2 main">
    <v-toolbar-title class="mb-4 main__logo" @click="$router.push('/')">
      <img src="@/assets/images/Logo.png" alt="Logo" width="54" />
      <span class="main__logo--title">Orbio Earth</span>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent",
  data: () => ({
    search: null,
  }),
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.main {
  &__logo {
    align-items: center;
    display: flex;
    gap: 0 10px;
    cursor: pointer;
    &--title {
      text-transform: uppercase;
      font-weight: 700;
      font-family: "Bebas Neue", cursive;
      letter-spacing: 0.7px;
      font-size: 24px;
      color: #111d30;
    }
  }
}
</style>
