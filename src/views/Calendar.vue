<template>
  <div>
    <navigation></navigation>
    <v-container fluid class="ma-0 pa-4" style="height: 100vh">
      <v-row class="fill-height" align="center">
        <v-col cols="7" class="pa-0">
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined class="mr-4" @click="setToday"> Сегодня </v-btn>
              <CreateEvent
                v-if="userData.role == 'Начальник смены'"
              ></CreateEvent>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="500">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="getEvents"
              :event-color="getEventColor"
              @click:event="showEvent"
              locale="ru"
            ></v-calendar>
          </v-sheet>
        </v-col>

        <v-col cols="5">
          <v-layout justify-center column>
            <v-sheet
              height="64"
              class="d-flex align-center justify-space-between"
              color="#0B4788"
            >
              <p v-if="this.selectedEvent.name" class="white--text ml-3 mb-0">
                {{ selectedEventDay(this.selectedEvent) }}
              </p>
              <p v-else class="white--text ml-3 mb-0 text-uppercase">
                Выберите мероприятие
              </p>
              <v-btn
                v-if="edit && this.selectedEvent.name"
                width="200"
                height="100%"
                text
                @click="editEvent"
                class="pr-3"
                ><v-icon color="white" left>mdi-pencil</v-icon>
                <p class="ma-0 white--text text-uppercase">
                  Редактировать
                </p></v-btn
              >
              <v-btn
                v-if="!edit && this.selectedEvent.name"
                width="200"
                height="100%"
                text
                class="pr-3"
                @click="setEvents"
              >
                <v-icon color="white" left>mdi-content-save</v-icon>
                <p class="ma-0 white--text text-uppercase">Сохранить</p></v-btn
              >
            </v-sheet>
            <v-sheet height="500">
              <v-card
                v-if="this.selectedEvent.name"
                class="ma-0 pa-4 d-flex flex-column align-start"
                height="auto"
                style="overflow-wrap: anywhere"
              >
                <v-row align="center" class="ma-0" style="width: 100%">
                  <v-col cols="12">
                    <v-text-field
                      dense
                      outlined
                      rounded
                      class="ma-0"
                      v-model="selectedEvent.name"
                      :readonly="edit"
                      label="Цех"
                    ></v-text-field>
                    <v-textarea
                      auto-grow
                      dense
                      outlined
                      rounded
                      class="ma-0"
                      v-model="selectedEvent.details"
                      :readonly="edit"
                      label="Описание работы"
                    ></v-textarea>
                    <v-text-field
                      dense
                      outlined
                      rounded
                      class="ma-0"
                      v-model="selectedEvent.start"
                      :readonly="edit"
                      label="Начало работы"
                    ></v-text-field>
                    <v-text-field
                      dense
                      outlined
                      rounded
                      class="ma-0"
                      v-model="selectedEvent.end"
                      :readonly="edit"
                      label="Окончание работы"
                    ></v-text-field>
                    <v-text-field
                      dense
                      outlined
                      rounded
                      class="ma-0"
                      v-model="selectedEvent.count"
                      :readonly="edit"
                      label="Количество свободных мест"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  class="d-flex flex-column ma-0"
                  style="width: 100%; align-items: center"
                >
                  <v-col v-if="userData.role == 'Начальник смены'">
                    <v-btn
                      v-if="edit"
                      width="150"
                      outlined
                      @click="editEvent"
                      class="my-3"
                      ><p class="ma-0">Редактировать</p></v-btn
                    >
                    <v-btn
                      v-else
                      width="150"
                      outlined
                      @click="setEvents"
                      class="my-3"
                      ><p class="ma-0">Сохранить</p></v-btn
                    >
                  </v-col>
                  <v-col v-else-if="userData.role == 'Работник'">
                    <!-- <Document
                      v-if="isSubscribe()"
                      :event="const_str"
                      :isSubscribe="isSubscribe()"
                      :count="isAvaibleCount()"
                    ></Document> -->
                    <!-- <Document
                      v-if="isSubscribe()"
                      :event="const_str"
                    ></Document> -->
                    <!--:isSubscribe="isSubscribe()"  -->
                    <!-- <Document
                      v-else-if="!isSubscribe() && isAvaibleCount()"
                      :event="const_str"
                      :isSubscribe="isSubscribe()"
                      :count="isAvaibleCount()"
                    ></Document> -->
                    <!-- <Document
                      v-else-if="!isSubscribe() && isAvaibleCount()"
                      :event="const_str"
                    ></Document> -->
                    <Document :event="this.selectedEvent"></Document>
                    <!--:isSubscribe="isSubscribe()"  -->
                   <!--  <span v-else>К сожалению, мест больше нет:(</span> -->
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                v-else
                class="ma-0 pa-4 d-flex flex-column align-center"
                height="auto"
                style="overflow-wrap: anywhere"
              >
                <v-row width="100%">
                  <v-col cols="12" class="text-center" align-self="center">
                    <p class="ma-0">Выберите мероприятие</p>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <img src="../assets/icons/arrow.png" />
                  </v-col>
                </v-row>
              </v-card>
            </v-sheet>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import CreateEvent from "../components/CreateEvent.vue";
import Document from "../components/Document.vue";

export default {
  components: {
    Navigation,
    CreateEvent,
    Document,
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      details: null,
      start: null,
      end: null,
      name: null,
      color: "#46d46e",
      count: null,
      currentlyEdit: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      edit: true,
    };
  },
  mounted() {
    this.getEventsFromDB;
  },
  methods: {
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEventColor(event) {
      if (event.count != 0) {
        return "#46D46E";
      } else {
        return "#E53939";
      }
    },
    showEvent({ event }) {
      console.log(event)
      this.selectedEvent = event;
      console.log("Старт", this.selectedEvent.start);
      console.log("count", this.selectedEvent.count);
      /* console.log('sss', this.userData.events);
      this.isSubscribe = () => { 
        if (this.userData.events[this.selectedEvent.start] !== undefined) return true
        else return false
      };
      console.log(typeof(this.isSubscribe())); */
    },
    isSubscribe() {
      if (this.getRegisterEvents.registerEvents[this.selectedEvent.start] !== undefined)
        return true;
      else return false;
    },
    isAvaibleCount() {
      if (this.selectedEvent.count > 0) return true;
      else return false;
    },
    editEvent() {
      this.edit = !this.edit;
    },

    setEvents() {
      this.edit = !this.edit;
      this.$store.dispatch("SET_EVENTS", {
        name: this.selectedEvent.name,
        details: this.selectedEvent.details,
        start: this.selectedEvent.start,
        end: this.selectedEvent.end,
        count: this.selectedEvent.count,
      });
    },
    selectedEventDay(event) {
      let date = new Date(event.start);
      let days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ];
      let months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];
      let day = date.getDay();
      return `${date.getDate()} ${months[date.getMonth()]}, ${days[day]}`;
    },
  },
  computed: {
    getEvents() {
      return this.$store.getters["events/getEvents"];
    },
    userData() {
      return this.$store.getters["userData/userData"];
    },
    getRegisterEvents() {
      return this.$store.getters["registerEvents/getRegisterEvents"];
    },
    getEventsFromDB() {
      return this.$store.dispatch("events/GET_EVENTS");
    },
  },
};
</script>

<style scoped>
.header {
  border-radius: 15px;
}
span {
  font-family: "Open Sans Condensed Semibold", sans-serif;
  font-size: 20px;
}
</style>