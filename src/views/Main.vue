<template>
  <div>
    <v-container grid-md fluid>
      <v-row>
        <v-col class="d-flex flex-column ma-0 pa-0">
          <v-row class="mt-6 ml-6 flex-grow-0">
            <img src="@/assets/pic/logo.png">
          </v-row>
          <v-row class="mt-16">
            <p class="text-uppercase p-text ma-auto">
              Есть идея.<br>Есть Икеа.
            </p>
          </v-row>
          <v-row d-flex justify="center" class="ma-0">
            <Authorization></Authorization>
          </v-row>
        </v-col>

        <v-col max-width="833px" class='pa-0'>
          <v-img src="@/assets/pic/background_2.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template> 

<script>
import Authorization from '../components/Authorization.vue'
export default {
  components: {
    Authorization
  }
}
</script>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap'); */
* {
  text-transform: uppercase;
  font-family: 'Open Sans Condensed Semibold', sans-serif;
  color: #0B4788;
}
.btn {
  width: 230px;
  margin-top: 75px;
  border-radius: 33px;
}
.btn-text {
  font-size: 30px;
  line-height: 59px;
  
  color: #0B4788;
}
.p-text {
  font-size: 80px; 
  line-height: 98px;
}

</style>
