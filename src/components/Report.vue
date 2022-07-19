<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="220" @click.stop="dialog = true" outlined class="my-3" v-bind="attrs" v-on="on">
          Сформировать отчёт
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Отчёт
        </v-card-title>

        <v-card-text id="doc">
          <VueHtml2pdf
            :show-layout="true"
            :float-layout="false"
            :enable-download="false"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            :filename="filename(date.start, date.end)"
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
              <v-app>
                <v-main>
                  <v-container>
                    <template-report :date="date"></template-report>
                  </v-container>
                </v-main>
              </v-app>
            </section>
          </VueHtml2pdf>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="generateReport">Скачать документ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";
import TemplateReport from './TemplateReport.vue'

export default {
  data() {
    return {
      document: null,
      dialog: false,
    };
  },
  props: {
    date: {
      type: Object,
      require: true,
    }
  },
  components: {
    VueHtml2pdf,
    TemplateReport,
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },

    async beforeDownload({ html2pdf, options, pdfContent }) {
      try {
        await html2pdf().set(options).from(pdfContent).toPdf().get("pdf").save();
        this.dialog = false;
      } catch (error) {
        console.log(error)
      }
    },

    filename(start, end) {
      start = new Date(start).toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      end = new Date(end).toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      return this.userData.master.secondName + '_от_' + start + '_по_' + end;
    }
  },
  computed: {
    userData() {
      return this.$store.getters["userData/userData"];
    },
    
  },
};
</script>
<style scoped>
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 90%;
  overflow-y: visible;
  overflow-x: hidden;
}
</style>
