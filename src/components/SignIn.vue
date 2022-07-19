<template>
  <div>
    <v-col>
      <v-form v-model="valid">
        <v-row>
          <v-text-field v-model="email" label="E-mail" :rules="[rules.required, rules.email]" outlined rounded> </v-text-field>
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1" 
            v-model="password" 
            label="Пароль" 
            :rules="[rules.required, rules.min]"
            outlined 
            rounded
          > 
          </v-text-field>
        </v-row>

        <v-row class="d-flex flex-column ma-0" align="center">
          <v-btn color="#0B4788" @click="signin" :disabled='!valid' rounded width="150">
            <p class="btn-text-dialog ma-0">Войти</p>
          </v-btn>
          <v-btn text @click="dialog = false" class="mt-6">
            <p class="ma-0">Забыли пароль?</p>
          </v-btn>
        </v-row>
      </v-form>
    </v-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      email: null,
      password: null,
      valid: false,
      rules: {
        required: value => !!value || 'Обязательное поле',
        min: value => value.length >= 3 || 'Длина пароля должна быть 8 символов и более',
        email: value => {
          //eslint-disable-next-line
          const pattern = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
          return pattern.test(value) || 'Некорректный e-mail.'
        },
      }
    }
  }, 
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  },
  
  methods: {
    signin() {
      this.$store.dispatch('user/SIGN_IN', {email: this.email, password: this.password })
      .then(() => {
        this.$router.push('/calendar')
      }).catch((error) => {
        console.log(error.message)
      })
      
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