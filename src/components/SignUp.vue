<template>
  <div class="ma-0">
    <v-col>
      <v-alert :value='error' type="warning">{{ error}}</v-alert>
      <v-form v-model="valid">
        <v-row>
          <v-text-field v-model="secondName" label="Фамилия" :rules="[rules.required]" outlined rounded dense> </v-text-field>
          <v-text-field v-model="firstName" label="Имя" :rules="[rules.required]" outlined rounded dense> </v-text-field>
          <v-text-field v-model="patronymic" label="Отчество" outlined rounded dense> </v-text-field>
          <v-text-field v-model="cardpassId" label="Табельный номер" :rules="[rules.required, rules.cardPass]" outlined rounded dense> </v-text-field>
          <v-text-field v-model="email" label="E-mail" :rules="[rules.required, rules.email]" outlined rounded dense> </v-text-field>
          <v-text-field 
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show" 
            v-model='password' 
            label="Пароль" 
            :rules="[rules.required, rules.min]"
            outlined 
            rounded
            dense/>
          <!-- <v-text-field v-model="confirmPassword" label="Подтверждение пароля" outlined rounded>
          </v-text-field> -->
          <v-select
            label="Выберите вашу должность"
            :items="roles"
            v-model="role"
            append-icon="mdi-account-question"
            outlined 
            rounded 
            dense
            :rules="[rules.required]"
          ></v-select>
        </v-row>

        <v-row class="d-flex flex-column mt-5" align="center">
          <v-btn color="#0B4788" @click="signup" rounded :disabled='!valid'>
            <p class="btn-text-dialog ma-0">Зарегистрироваться</p>
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
      firstName: null,
      secondName: null,
      patronymic: null,
      cardpassId: null,
      email: null,
      password: null,
      role: null,
      roles: ['Работник', 'Начальник смены'],
      show: false,
      valid: false,
      rules: {
        required: value => !!value || 'Обязательное поле',
        cardPass: value => !isNaN(value) || 'Номер пропуска состоит из чисел',
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
  /* watch: {
    isUserAuthenticated(val) {
      if (val === true) {
        this.$router.push("/calendar")
      }
    }
  }, */
  methods: {
    signup() {
      this.$store.dispatch('user/SIGN_UP', {email: this.email, password: this.password, secondName: this.secondName, firstName: this.firstName, patronymic: this.patronymic, cardpassId: this.cardpassId, role: this.role })
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
  width: 200px;
  margin-top: 75px;
  border-radius: 33px;
}
.btn-text-dialog {
  color: #ffda34;
  font-size: 18px;
}
</style>