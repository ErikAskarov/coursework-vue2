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
  
  computed: {
    isUserAuthenticated(){
      return this.$store.getters['user/isUserAuthenticated']
    },
   /*  token() {
      if (localStorage.getItem("token"))
        return true;
      else return false;
    } */
  },
  watch: {
    isUserAuthenticated(val){
      if(val == false) this.$router.push('/')
      
    },
    /* token(value) {
      if (value)
        this.$router.push('/calendar');
      else
        this.$$router.push('/')
    } */
  }
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
::-webkit-scrollbar {
  width: 0;
}
</style>