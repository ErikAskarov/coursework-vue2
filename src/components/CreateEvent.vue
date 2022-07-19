<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          v-bind="attrs"
          v-on="on"
        >
          Добавить работу
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Добавление работы
        </v-card-title>

        <v-card-text class="mt-6">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="name" label="Название цеха" outlined rounded :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="details" label="Описание работы" outlined rounded :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="date" v-model="start" label="День работы" outlined rounded :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="count" label="Количество работников" outlined rounded :rules="[rules.required, rules.number]"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="newEvent"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      name: '',
      details: '',
      start: '',
      color: '#32CD32',
      count: null,
      dialog: false,
      rules: {
        required: value => !!value || 'Обязательное поле',
        number: value => !isNaN(value) || 'Значение поля должно быть числом',
      }
    }
  },
  methods: {
    newEvent() {
      let event = {name: this.name, details: this.details, start:this.start, end: this.start, count: this.count, masterId: this.userData.master.id};
      this.dialog = false;
      this.name = null,
      this.details = null, 
      this.start = null,
      this.count = null
      return this.$store.dispatch("events/SET_EVENT", event);
    }
  },
  computed: {
    userData() {
      return this.$store.getters["userData/userData"];
    },
  }
}

</script>
