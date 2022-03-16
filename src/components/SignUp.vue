<template>
  <div class="ma-0">
    <v-col>
      <v-alert :value='error' type="warning">{{ error}}</v-alert>
      <v-row>
        <v-text-field v-model="name" label="Фамилия" outlined rounded> </v-text-field>
        <v-text-field v-model="surname" label="Имя" outlined rounded> </v-text-field>
        <v-text-field v-model="patronymic" label="Отчество" outlined rounded> </v-text-field>
        <v-text-field v-model="cardPass" label="Номер карты входа" outlined rounded> </v-text-field>
        <v-text-field v-model="email" label="E-mail" outlined rounded> </v-text-field>
        <v-text-field 
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show" 
        v-model='password' 
        label="Пароль" 
        outlined 
        rounded/>
        <!-- <v-text-field v-model="confirmPassword" label="Подтверждение пароля" outlined rounded>
        </v-text-field> -->
      </v-row>

      <v-row class="d-flex flex-column ma-0" align="center">
        <v-btn color="#0B4788" @click:prevent="signup" rounded :disabled='processing'>
          <p class="btn-text-dialog ma-0">Зарегистрироваться</p>
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: null,
      surname: null,
      patronymic: null,
      cardPass: null,
      email: null,
      password: null,
      show: false,
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  },
  watch: {
    isUserAuthenticated(val) {
      if (val === true) {
        this.$router.push("/calendar")
      }
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('SIGNUP', {email: this.email, password: this.password, name: this.name, surname: this.surname, patronymic: this.patronymic, cardPass: this.cardPass })
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
  width: 200px;
  margin-top: 75px;
  border-radius: 33px;
}
.btn-text-dialog {
  color: #ffda34;
  font-size: 18px;
}
</style>