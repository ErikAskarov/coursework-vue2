<template>

  <div class="pa-6">
    <section class="header d-flex flex-column">
      <div>
        <img class="my-0" src="@/assets/pic/logo.png" width="200" />
      </div>

      <div class="d-flex justify-end mr-6">
        <table class="tableOfDate">
          <tr class="secondTable_tr">
            <td class="secondTable_head" colspan="2">Отчётный период</td>
          </tr>
          <tr class="secondTable_tr">
            <th class="secondTable_head">с</th>
            <th class="secondTable_head">по</th>
          </tr>
          <tr class="secondTable_tr">
            <td class="secondTable_body">{{ convertDate(date.start) }}</td>
            <td class="secondTable_body">{{ convertDate(date.end) }}</td>
          </tr>
        </table>
      </div>

      <div class="d-flex justify-center">
        <h2 class="text-center">Т А Б Е Л Ь <br>учета сверхрабочего времени</h2>
      </div>

    </section>
    <section class="d-flex justify-center my-6">
      <table>
        <thead>
          <th class="width-50px font-weight-600">Номер по порядку</th>
          <th class="width-150px font-weight-600">Фамилия, инициалы</th>
          <th class="width-100px font-weight-600">Табельный номер</th>
          <th class="width-25px font-weight-600" v-for="i in deltaDate()" :key="i">{{ new Date(date.start).getDate() - 1 + i }}</th>
          <th class="width-80px font-weight-600">Итого отработано за период</th>
        </thead>
        <tbody>
          <tr v-for="(worker, index) in data" :key="worker.userId">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ worker.secondName }} {{ worker.firstName.slice(0, 1) }}. {{ worker.patronymic.slice(0, 1) }}.</td>
            <td class="text-center">{{ worker.cardpass.code }}</td>
            <td class="text-center" v-for="i in deltaDate()" :key="i">{{ confirmEvent(i, worker.userId) }}</td>
            <td class="text-center">{{ worker.register_events.length }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    
    <section class="d-flex justify-space-between align-center mt-12">
      <div class="d-flex flex-column">
        <div>
          <span class="mr-3 font-weight-600">Ответственное лицо:</span>
          <span class="mr-3">Начальник смены</span>
          <span class="ml-3">{{ userData.master.secondName }} {{ userData.master.firstName.slice(0,1) }}. {{ userData.master.patronymic.slice(0,1) }}.</span>
        </div>
        <div>
          <span class="mr-3 font-weight-600">Руководитель бухгалтерии:</span>
          <span class="mr-3">Старший работник бухгалтерии</span>
          <span class="ml-3">Махмутов Д.М.</span>
        </div>
      </div>
      <div class="d-flex align-center">
        <span class="mx-6">{{ nowDate }}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    }
  },
  props: {
    date: {
      type: Object,
      require: true,
    }
  },
  computed: {
    userData() {
      return this.$store.getters['userData/userData']
    },
    nowDate() {
      return new Date().toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  },
  methods: {
    getDataToTable() {
      console.log(this.date)
      this.$store.dispatch('user/GET_TABLE', {id: this.userData.master.id, startDate: this.date.start, endDate: this.date.end}).then((data) => {
        this.data = data
      })
    },
    deltaDate() {
      console.log(this.date.end, this.date.start)
      return new Date(this.date.end).getDate() - new Date(this.date.start).getDate() + 1
    },
    confirmEvent(date, workerId) {
      let c = 0;
      c += 1;
      console.log('ce', c)
      console.log('date', date)
      let day = new Date(this.date.start).getDate() - 1 + date;
      let worker = this.data.filter(item => item.userId === workerId)
      let arr = worker[0].register_events
      let workerDate = arr.find(item => new Date(item.event['start']).getDate() === day)
      if (workerDate) {
        console.log('------------')
        let s = 0;
        s += 1;
        console.log('se', s)
        console.log('day', day)
        console.log('wordDate', workerDate)
        console.log(workerId)
        return '+'
      }
      return ''
    },
    convertDate(date) {
      return new Date(date).toLocaleString("ru-RU", {
        month: "long",
        day: "numeric",
      })
    }
  },
  mounted() {
    setTimeout(() => this.getDataToTable(), 100)
  },
};
</script>

<style scoped>
* {
  color: black;
  font-family: "Times New Roman", sans-serif;
}
table {
  border: 1px solid #000;
  border-collapse: collapse;
}
th, td {
  border: 1px solid black;
  word-wrap: break-word;
  padding: 5px;
}
th {
  font-size: 10px;
}
.width-50px {
  width: 50px;
}
.width-100px {
  width: 100px;
}
.width-150px {
  width: 150px;
}
.width-80px {
  width: 80px;
}
.width-25px {
  width: 25px;
}
.font-weight-600 {
  font-weight: 600;
}
.align-table {
  align-items: center;
}
.tableOfDate {
  width: 150px;
}
.secondTable_head {
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}
.secondTable_body {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}
.secondTable_tr {
  height: 30px
}
</style>