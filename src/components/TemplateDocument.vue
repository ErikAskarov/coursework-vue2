<template>
  <div>
    <section class="head">
      <div class="logo">
        <img src="@/assets/pic/logo.png" width="200" />
      </div>
      <p>ООО "ИКЕА Индастри Вятка"</p>
      <p>ИНН 4307018005 КПП 430701001 ОКПО 00255421</p>
    </section>
    <section class="hat">
      <p>Директору фабрики</p>
      <p>В. Константиновс</p>
      <p>от оператора производства брикетов</p>
      <p>
        {{ userData.worker.secondName }}
        {{ userData.worker.firstName.slice(0, 1) }}.{{
          userData.worker.patronymic.slice(0, 1)
        }}
      </p>
    </section>
    <section class="zayav">
      <p>Заявление о согласии на привлечение к сверхурочным работам</p>
    </section>
    <section class="main">
      <p>
        Я, {{ userData.worker.secondName }} {{ userData.worker.firstName }}
        {{ userData.worker.patronymic }}, подтверждаю свое согласие на
        сверхурочную работу с 8 часов 00 минут до 17 часов 00 минут
        {{ this.event.start.slice(8) }}.{{ this.event.start.slice(5, 7) }}.{{
          this.event.start.slice(0, 4)
        }}
        г., даю свое согласие на оплату указанных сверхурочных часов.
      </p>
      <p>
        С правом отказаться от сверхурочной работы, предствленным ч. 5 ст. 99
        Трудового Кодекса Российской Федерации (или: отработы в ночное время -
        ч. 5 ст. 96 Трудового Кодекса Российской Федерации; от работы в выходные
        дни - ч. 7 ст. 113 Трудового Кодекса Российской Федерации) ознакомлен,
        медицинских противопоказаний не умею.
      </p>
    </section>
    <section class="footer">
      <p>
        {{ this.event.start.slice(8) }}.{{ this.event.start.slice(5, 7) }}.{{
          this.event.start.slice(0, 4)
        }}
        г.
      </p>
      <p>
        {{ userData.worker.secondName }}
        {{ userData.worker.firstName.slice(0, 1) }}.{{
          userData.worker.patronymic.slice(0, 1)
        }}.
      </p>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      Type: Object,
      require: true,
    },
  },
  computed: {
    userData() {
      return this.$store.getters["userData/userData"];
    },
  },
};
</script>
<style scoped>
* {
  color: black
}
.head {
  text-align: center;
  margin-top: 20px;
}
.head p:first-child {
  margin-bottom: 10px;
}
.hat {
  text-align: end;
  margin-right: 20px;
}
.hat p {
  margin-bottom: 5px;
}
.zayav {
  text-align: center;
  font-weight: 600;
}
.main {
  padding: 30px;
  text-align: justify;
}
.main p {
  margin-bottom: 5px;
}
.footer {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
}
.logo {
  display: flex;
  margin-left: 20px;
}
</style>