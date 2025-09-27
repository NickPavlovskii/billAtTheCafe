<template>
  <div class="bill-owe">
    <div class="bill-tabs">
      <button
        :class="{ 'bill-tab': true, active: currentTab === 'who-owes' }"
        @click="changeTab('who-owes')"
      >
        <span class="tab-icon">Кто кому должен</span>
      </button>
      <button
        :class="{ 'bill-tab': true, active: currentTab === 'who-is-owed' }"
        @click="changeTab('who-is-owed')"
      >
        <span class="tab-icon">Кому кто должен</span>
      </button>
    </div>

    <BillDebts
      v-if="currentTab === 'who-owes'"
      :debts="debts.whoOwes"
      type="who-owes"
    />
    <BillDebts
      v-if="currentTab === 'who-is-owed'"
      :debts="debts.whoIsOwed"
      type="who-is-owed"
    />
  </div>
  <div class="share-title">
    <i class="pi pi-share-alt"></i>
    <span>Поделиться результатом</span>
  </div>

  <!-- кнопки поделиться -->
  <div class="share-icons">
    <icon-btn
      icon="mdi:whatsapp"
      iconColor="white"
      backgroundColor="#25D366"
      aria-label="Поделиться в WhatsApp"
      @click="shareToWhatsApp"
    />

    <icon-btn
      icon="mdi:telegram"
      iconColor="white"
      backgroundColor="#0088cc"
      aria-label="Поделиться в Telegram"
      @click="shareToTelegram"
    />

    <icon-btn
      icon="mdi:file-pdf"
      iconColor="white"
      backgroundColor="#d32f2f"
      aria-label="Сохранить в PDF"
      @click="saveAsPdf"
    />
  </div>
</template>
<script>
  import BillDebts from './BillDebts.vue'
  import jsPDF from 'jspdf'
  import autoTable from 'jspdf-autotable'

  export default {
    components: {
      BillDebts,
    },
    props: {
      debts: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        currentTab: 'who-owes',
      }
    },
    methods: {
      changeTab(tab) {
        this.currentTab = tab
      },

      // Формируем текст для отправки
      generateReportText() {
        let report = ' Результат дележа счёта:\n\n'

        if (this.debts.whoOwes.length > 0) {
          report += ' Кто кому должен:\n'
          this.debts.whoOwes.forEach((d) => {
            report += ` ${d.from} должен ${d.to}: ${d.amount} руб.\n`
          })
          report += '\n'
        }

        if (this.debts.whoIsOwed.length > 0) {
          report += 'Кому должны:\n'
          this.debts.whoIsOwed.forEach((d) => {
            report += ` ${d.from} получает от ${d.to}: ${d.amount} руб.\n`
          })
        }

        return report
      },

      saveAsPdf() {
        const doc = new jsPDF()
        doc.setFont('times')
        doc.setFontSize(14)

        doc.text('Bill Split Result', 14, 16)

        const tableData = []
        this.debts.whoOwes.forEach((d) =>
          tableData.push([`${d.from} -> ${d.to}`, `${d.amount} руб.`])
        )
        this.debts.whoIsOwed.forEach((d) =>
          tableData.push([`${d.from} <-  ${d.to}`, `${d.amount} руб.`])
        )

        autoTable(doc, {
          head: [['Operation', 'Amount']],
          body: tableData,
          startY: 22,
          styles: { font: 'times', fontSize: 12 },
        })

        doc.save('bill_result.pdf')
      },

      shareToWhatsApp() {
        const text = encodeURIComponent(this.generateReportText())
        window.open(`https://wa.me/?text=${text}`, '_blank')
      },

      shareToTelegram() {
        const text = encodeURIComponent(this.generateReportText())
        window.open(`https://t.me/share/url?url=&text=${text}`, '_blank')
      },
    },
  }
</script>

<style scoped>
  .share-title {
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #333;
    justify-content: center;
  }

  .share-icons {
    margin-top: 15px;
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .Nikname {
    color: #048bfa;
    font-weight: bold;
  }

  .bill-owe {
    font-family: Arial, sans-serif;
  }

  .bill-tabs {
    display: flex;
    justify-content: center;
  }

  .bill-tab {
    position: relative;
    background-color: #f0f0f0;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .bill-tab.active {
    background-color: #e0e0e0;
  }

  .bill-tab:hover {
    background-color: #d0d0d0;
  }

  .tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab-icon::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }

  .bill-tab.active .tab-icon::before {
    background-color: #048bfa;
  }
</style>
