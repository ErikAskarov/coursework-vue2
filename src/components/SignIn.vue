<template>
  <div>
    <v-col>
      <v-row>
        <v-text-field v-model="email" label="E-mail" outlined rounded> </v-text-field>
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1" 
          v-model="password" 
          label="Пароль" 
          outlined 
          rounded
        > 
        </v-text-field>
      </v-row>

      <v-row class="d-flex flex-column ma-0" align="center">
        <v-btn color="#0B4788" @click:prevent="signin" :disabled='processing' rounded width="150">
          <p class="btn-text-dialog ma-0">Войти</p>
        </v-btn>
        <v-btn text @click="dialog = false" class="my-6">
          <p class="ma-0">Забыли пароль?</p>
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      email: null,
      password: null
    }
  }
}
</script>
<style scoped>
* {
  text-transform: uppercase;
  font-family: "Open Sans Condensed Semibold", sans-serif;
  color: #0b4788;
}
.btn {
  width: 230px;
  margin-top: 75px;
  border-radius: 33px;
}
.btn-text-dialog {
  color: #ffda34;
  font-size: 18px;
}
</style>