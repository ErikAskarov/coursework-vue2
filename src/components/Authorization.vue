<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-uppercase btn mt-0"
          color="#ffda34"
          v-bind="attrs"
          v-on="on"
        >
          <span class="ma-0 btn-text">Войти</span>
        </v-btn>
      </template>
      <v-card>
        <v-col class="ma-0 col-12">
          <v-row height="200px" class="mb-6 mx-3 mt-2">
            <v-tabs>
              <v-tab
                @click="
                  signin = true;
                  signup = false;
                "
                
                >Вход</v-tab
              >
              <v-tab
                @click="
                  signup = true;
                  signin = false;
                "
                >Регистрация</v-tab
              >
            </v-tabs>
          </v-row>
          <v-row class="col-12 ma-0" justify="center">
            <SignIn v-if="signin"></SignIn>
            <SignUp v-if="signup"></SignUp>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SignUp from "./SignUp.vue";
import SignIn from "./SignIn.vue";

export default {
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      dialog: false,
      signin: true,
      signup: false,
    };
  },
};
</script>
<style>
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
.btn-text {
  font-size: 28px;
  line-height: 59px;
  color: #0b4788;
}
.btn-text-dialog {
  color: #ffda34;
  font-size: 18px;
}
.v-dialog:not(.v-dialog--fullscreen) {
    overflow-y: hidden;
    max-height: 90%;
}

</style>