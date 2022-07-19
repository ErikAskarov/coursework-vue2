<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="!isSubscribe" width="150" outlined class="my-3" v-bind="attrs" v-on="on"> <!-- :disabled='isSubscribe' -->
          Записаться
        </v-btn>
        <v-btn v-else-if="isSubscribe" width="220" outlined class="my-3" v-bind="attrs" v-on="on"> <!-- :disabled='isSubscribe' -->
          Посмотреть документ
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Заявление
        </v-card-title>

        <v-card-text id="doc">
          <VueHtml2pdf
            :show-layout="true"
            :float-layout="false"
            :enable-download="false"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            :filename="filename()"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="landscape"
            pdf-content-width="auto"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            @beforeDownload="beforeDownload($event)"
            ref="html2Pdf"
          >
            <section slot="pdf-content">
              <TemplateDocument :event="event"></TemplateDocument>
            </section>
          </VueHtml2pdf>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!isSubscribe" width="150" outlined @click="generateReport" class="my-3"><p class="ma-0">Принимаю</p></v-btn>
          <v-btn v-else-if="isSubscribe" width="175" outlined @click="downloadDocument" class="my-3"><p class="ma-0">Скачать документ</p></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";

import TemplateDocument from "./TemplateDocument.vue";

export default {
  data() {
    return {
      document: null,
      dialog: false,
    };
  },
  components: {
    VueHtml2pdf,
    TemplateDocument,
  },
  props: {
    event: {
      Type: Object,
      require: true,
    },
    isSubscribe: {
      Type: Function,
      require: true,
    },
    count: {
      Type: Function,
      require: true
    }
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();

    },

    async beforeDownload({ html2pdf, options, pdfContent }) {
      await html2pdf().set(options).from(pdfContent).toPdf().get("pdf").then((pdf) => {
          this.document = pdf.binaryStringToUint8Array(pdf.output());
          /* this.document = btoa(pdf.output()) */
          console.log('pdf', pdf)
          console.log('type pdf', typeof(pdf))
          console.log(typeof(this.document))
          const blob = new Blob([this.document], {type : 'application/pdf'});
          console.log('blob', blob)
          const filee = new File([blob], 'sss.pdf', {type : blob.type});
          console.log('filee', filee)
          let form_data = new FormData();
          form_data.append("file", filee)
          console.log('form_data', form_data)
          if (this.event.count != 0) {
            this.event.count = Number(this.event.count) - 1;
          } 
          else {
            this.event.count = 0;
          }
          console.log('userId:', this.userData.worker.id)
          console.log('evendId:', this.event.id)
          console.log('file:', form_data)
          this.$store.dispatch("registerEvents/SUBSCRIBE_USER", {eventId: this.event.id, file: filee, workerId: this.userData.worker.id});   
          this.dialog = false
        }).save();
    },
    downloadDocument() {
      this.$store.dispatch('events/DOWNLOAD_DOCUMENT', {user: this.userData.worker, start: this.event["Время начала работ"]})
    },
    filename() {
      return this.userData.worker.secondName + '_' + this.event.start
    }
  },
  computed: {
    userData() {
      return this.$store.getters["userData/userData"];
    },
  },
};
</script>
<style>
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 90%;
  overflow-y: visible;
  overflow-x: hidden;
}
</style>
