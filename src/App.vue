<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: "Open Sans Condensed Regular";
  src: local("Open Sans Condensed Regular"),
   url('assets/fonts/open-sans-condensed-regular.woff') format("woff");
}
@font-face {
  font-family: "Open Sans Condensed Semibold";
  src: local("Open Sans Condensed Semibold"),
   url('assets/fonts/open-sans-condensed-semibold.woff') format("woff");
}
</style>