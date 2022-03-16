<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="newEvent" 
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
          <v-col>
            <v-row>
              <v-text-field v-model="name" label="Название цеха" outlined rounded></v-text-field>
              <v-text-field v-model="details" label="Описание работы" outlined rounded></v-text-field>
              <v-text-field v-model="start" label="Начало работы" outlined rounded></v-text-field>
              <v-text-field v-model="end" label="Конец работы" outlined rounded></v-text-field>
            </v-row>
          </v-col>
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
/* import { mapGetters } from "vuex"; */

export default {
  data() {
    return {
      name: '',
      details: '',
      start: '',
      end: '',
    }
  },
  methods: {
    newEvent() {
      let event = {name: this.name, details: this.details, start:this.start, end: this.end};
      return this.$store.dispatch("setEvents", event);
    }
  }
}

</script>
