<template>
  <v-app-bar app dense height="75" elevation="2">
    <v-row class="align-center justify-center" no-gutters>
      <v-col cols="3" class="pl-6">
        <img class="my-0" src="@/assets/pic/logo.png" width="200" />
      </v-col>
      <v-col class="pa-0 d-flex align-center justify-center" cols="6">
        <v-btn text href="/profile" class="mr-9"> Профиль </v-btn>
        <v-btn text href="/calendar"> Календарь </v-btn>
      </v-col>
      <v-col cols="3" class="d-flex align-center justify-end">
        <div v-if="userData.role === 'Работник'">
            {{ userData.worker.secondName }} {{ userData.worker.firstName }}
          </div>
          <div v-else>
            {{ userData.master.secondName }} {{ userData.master.firstName }}
          </div>

        <v-btn @click="signout" class="ml-3">
          <p class="ma-0">Выйти</p>
        </v-btn>
      </v-col>
      <!--  <v-col cols="12" class="mt-3">
          <v-divider></v-divider>
        </v-col> -->
    </v-row>
  </v-app-bar>
  <!-- <v-navigation-drawer style="height: 100vh" v-model="drawer" :mini-variant.sync="mini" mini-variant-width="130" app permanent>
      <v-list-item>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon v-if="mini == true">mdi-chevron-right</v-icon>
          <v-icon v-if="mini == false">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <img class="my-0" src="@/assets/pic/logo.png" width="200" />
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense class="mt-6">
        <v-list-item link href="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Профиль</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/calendar">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Календарь</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-clipboard-list</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Мои сверхурочные работы</v-list-item-title>
        </v-list-item>
      </v-list>
        <v-divider class="mt-3"></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <img class="my-0" src="@/assets/icons/user.png" />
          </v-list-item-avatar>
          <v-list-item-title
            >{{ userData.secondName }}<br />{{
              userData.firstName
            }}</v-list-item-title
          >
        </v-list-item>
    </v-navigation-drawer> -->
</template>
<script>
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
  methods: {
    signout() {
      this.$store.dispatch("user/SIGN_OUT");
    },
  },
  computed: {
    userData() {
      return this.$store.getters["userData/userData"];
    }
    
  },
  
};
</script>

<style>
</style>