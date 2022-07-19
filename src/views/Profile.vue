<template>
  <div>
    <Navigation></Navigation>
    <v-container fluid>
      <v-row class="ma-0">
        <v-col cols="8">
          <v-data-table
            :headers="headersOfTableOfWorkers"
            :items="eventsWorkers"
            :items-per-page="10"
            class="elevation-1"
            v-if="userData.role === 'Работник'"
          >
            <template v-slot:[`item.file`]="props">
              <a @click="openFile(props.item.file)">Посмотреть</a>
            </template>
          </v-data-table>
          
          <v-data-table
            :headers="headersOfTableOfMasters"
            :items="arrNew"
            :items-per-page="10"
            class="elevation-1"
            v-else
          >
            <template v-slot:[`item.worker`] = "props">
              <v-btn
                text 
                depressed 
                color="primary"
                @click.stop="dialog = true"
                @click="createArrayOfWorkers(props.item.worker)"
              >
                Открыть список работников
              </v-btn>
              <v-dialog
                v-model="dialog"
                max-width="1000"
              >
                <v-card>
                  <v-card-title class="text-h6">
                    Работники в цеху {{ props.item.name }} {{ props.item.start }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-card-text class="my-3">
                    <v-data-table
                      :headers="headersOfSecondTableOfWorkers"
                      :items="arrayOfWorkers"
                      :items-per-page="10"
                      class="elevation-1"
                    >
                      <template v-slot:[`item.file`]="file">
                        <a @click="openFile(file.item.file)">Посмотреть</a>
                      </template>
                      <template v-slot:[`item.confirm`]="confirm">
                        <v-btn v-if="confirm.item.confirm == `Не подтверждено`" @click="confirmEvent(confirm.item.id)" depressed color="green">Подтвердить?</v-btn>
                        <span v-else>Подтверждено</span>
                      </template>
                    </v-data-table>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Закрыть окно
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
          <v-container class="d-flex" v-if="userData.role === 'Начальник смены'">
            <v-text-field class="mr-3" type="date" v-model="date.start" label="Выберите день начала" outlined rounded></v-text-field>
            <v-text-field class="mr-3" type="date" v-model="date.end" label="Выберите день конца" outlined rounded></v-text-field>
            <Report :date="date"></Report>
          </v-container>
        </v-col>
        <v-col cols="4">
          <v-card rounded>
            <v-card-title class="justify-center"> Мой профиль </v-card-title>
            <v-card-text v-if="userData.role === 'Работник'">
              Пользователь: {{ userData.worker.secondName }}
              {{ userData.worker.firstName }} {{ userData.worker.patronymic
              }}<br />
              Электронная почта: {{ userData.email }}<br />
              Табельный номер: {{ userData.worker.cardpass.code }}<br />
              Должность: {{ userData.role }}<br />
            </v-card-text>
            <v-card-text v-else>
              Пользователь: {{ userData.master.secondName }}
              {{ userData.master.firstName }} {{ userData.master.patronymic
              }}<br />
              Электронная почта: {{ userData.email }}<br />
              Табельный номер: {{ userData.master.cardpass.code }}<br />
              Должность: {{ userData.role }}<br />
            </v-card-text>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import Report from "../components/Report.vue"

export default {
  data() {
    return {
      date: {
        start: null,
        end: null
      },
      dialog: false,
      emptyEventsOfWorkers: {
        name: "Имя",
        start: "Дата начала работы",
        master: "Имя начальника",
        file: "Файл",
        confirm: "Подтверждение",
      },
      emptyEventsOfMasters: {
        name: "Имя",
        start: "Дата начала работы",
        count: "Количество работников",
        worker: "Работник"
      },
      eventsWorkers: [],
      eventMasters: [],
      arrNew: [],
      arrayOfWorkers: [],
      userWorker: {
        worker: {
          firstName: "Имя",
          secondName: "Фамилия",
          patronymic: "Отчество",
          id: "id",
          cardpass: {
            code: "Табельный номер",
          },
        },
        email: "Электронная почта",
      },
      headersOfTableOfWorkers: [
        {
          text: "Дата сверхурочных работ",
          align: "center",
          value: "start",
        },
        {
          text: "Цех",
          value: "name",
          align: "center",
        },
        {
          text: "Начальник смены",
          value: "master",
          align: "center",
        },
        {
          text: "Документ-согласие",
          value: "file",
          align: "center",
          sortable: false,
        },
        {
          text: "Подтверждение наличия на рабочем месте",
          value: "confirm",
          align: "center",
        },
      ],
      headersOfTableOfMasters: [
        {
          text: "Дата сверхурочных работ",
          align: "center",
          value: "start",
        },
        {
          text: "Цех",
          align: "center",
          value: "name",
        },
        {
          text: "Количество мест",
          align: "center",
          value: "count",
        },
        {
          text: "Работник",
          align: "center",
          value: "worker",
        },
      ],
      headersOfSecondTableOfWorkers: [
        {
          text: "Фамилия",
          align: "center",
          value: "workerSecondName",
        },
        {
          text: "Имя",
          align: "center",
          value: "workerFirstName",
        },
        {
          text: "Отчество",
          align: "center",
          value: "workerPatronymic",
        },
        {
          text: "Документ-согласие",
          align: "center",
          value: "file",
          sortable: false,
        },
        {
          text: "Подтверждение",
          align: "center",
          value: "confirm",
        },
      ]
    };
  },
  computed: {
    getUserRegisterEvents() {
      return this.$store.getters["registerEvents/getUserRegisterEvents"]
        ? this.$store.getters["registerEvents/getUserRegisterEvents"]
        : this.emptyEventsOfWorkers;
    },
    userData() {
      return this.$store.getters["userData/userData"];
    },
    getMasterRegisterEvents() {
      return this.$store.getters["registerEvents/getMasterRegisterEvents"]
        ? this.$store.getters["registerEvents/getMasterRegisterEvents"]
        : this.emptyEventsOfMasters;
    },
  },
  components: {
    Navigation,
    Report,
  },
  methods: {
    getEventsWorkers() {
      console.log("getEventsWorkers");
      console.log("event from for", this.getUserRegisterEvents);
      for (let i of this.getUserRegisterEvents) {
        console.log("i", i);
        this.eventsWorkers.push({
          start: new Date(i.event.start).toLocaleString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          name: i.event.name,
          master:
            i.event.master.secondName +
            " " +
            i.event.master.firstName.slice(0, 1) +
            "." +
            i.event.master.patronymic.slice(0, 1) +
            ".",
          file: i.file,
          confirm: i.confirm,
        });
      }
      return this.eventsWorkers;
    },
    getEventsMasters() {
      this.eventMasters = [];
      this.arrNew = [];
      console.log("getEventsMasters");
      console.log("event from for", this.getMasterRegisterEvents);
      for (let i of this.getMasterRegisterEvents) {
        console.log("i", i);
        this.eventMasters.push({
          event: i.event,
          worker: i.worker,
          confirm: i.confirm,
          eventId: i.eventId,
          file: i.file,
          id: i.id
        });
      }
      
      let result = this.eventMasters.reduce(function(acc, cur) {
        let eventDate = acc[cur.event.start]; 
        if (!eventDate) {
          eventDate = acc[cur.event.start] = {};
        }
        let eventName = eventDate[cur.event.name];
        if (!eventName) {
          eventName = eventDate[cur.event.name] = {};
        }
        eventName[cur.worker.id] = {
          workerFirstName: cur.worker.firstName,
          workerSecondName: cur.worker.secondName,
          workerPatronymic: cur.worker.patronymic,
          file: cur.file,
          confirm: cur.confirm,
          id: cur.id
        };
        console.log('acc', acc)
        return acc;
      }, {});
      console.log('event masters', this.eventMasters)
      console.log('res', result)
      console.log('res v', Object.values(result))
      console.log('res k', Object.keys(result))
      console.log('res e', Object.entries(result))
      let workerObj = {};
      let count = 0;
      for (const workDate in result) {
        console.log('workDate', workDate)
        for (const workName in result[workDate]) {
          console.log('workName', workName)
          for (const worker in result[workDate][workName]) {
            console.log('worker', result[workDate][workName][worker])
            let w = `worker_${worker}`
            workerObj[w] = result[workDate][workName][worker]
            count = count + 1;
          }
          this.arrNew.push({
            start: new Date(workDate).toLocaleString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            name: workName,
            count: count,
            worker: workerObj
        });
        }
        count = 0;
        workerObj = {}; 
      }
      console.log('arrNew', this.arrNew)
      console.log('typeof res', typeof(result))
      let arr = [];
      for (let iterator of result) {
        arr.push({iterator})
      }  
      console.log('arr', arr)
      return this.arrNew;
    },
    openFile(file) {
      console.log("open file", file);
      this.$store.dispatch("registerEvents/DOWNLOAD_DOCUMENT", file);
      setTimeout(() => {
        window.open(this.$store.state.registerEvents.userPdfFile, "_blank");
      }, 100);
    },
    userRegisterEvents() {
      console.log("start userRegisterEvents");
      console.log("ud worker", this.userData);
      if (this.userData.role === "Работник") {
        const userId = this.userData.worker.id;
        console.log("wId", userId);
        this.$store.dispatch(
          "registerEvents/LOAD_WORKER_REGISTER_EVENTS",
          userId
        );
        setTimeout(() => { this.getEventsWorkers()}, 100);
      }
      else {
        const userId = this.userData.master.id;
        console.log("wId", userId);
        this.$store.dispatch(
          "registerEvents/LOAD_MASTER_REGISTER_EVENTS",
          userId
        );
        setTimeout(() => { this.getEventsMasters()}, 100);
      }
    },

    createArrayOfWorkers(workers) {
      this.arrayOfWorkers = []
      for (const iterator in workers) {
        console.log(workers[iterator])
        this.arrayOfWorkers.push(workers[iterator])
      }
    },

    confirmEvent(payload) {
      console.log('confirmEvent payload id', payload)
      this.$store.dispatch(
          "registerEvents/UPDATE_CONFIRM",
          {id: payload, confirm: "Подтверждено"}
      );
    }
  },
  mounted() {
    setTimeout(() => this.userRegisterEvents(), 100);
  },
};
</script>
