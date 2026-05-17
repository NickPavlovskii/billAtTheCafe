<template>
  <div class="result-screen">
    <transition
      name="slide-fade"
      mode="out-in"
    >
      <div
        v-if="currentScreen === 'result'"
        key="result"
        class="result-view"
      >
        <h2 class="screen-title">
          <Icon
            icon="mdi:chart-bar"
            class="screen-title-icon"
          />
          Результат
        </h2>

        <div class="summary-cards">
          <div class="summary-card">
            <span class="summary-label">Итого</span>
            <span class="summary-value">
              {{ totalCost.toFixed(2) }}
              <small>{{ currency }}</small>
            </span>
          </div>
          <div class="summary-card accent">
            <span class="summary-label">Чаевые {{ defaultTip }}%</span>
            <span class="summary-value">
              {{ tipsAmount.toFixed(2) }}
              <small>{{ currency }}</small>
            </span>
          </div>
        </div>
        <div class="summary-total-with-tips">
          <span class="summary-label">К оплате с чаевыми</span>
          <span class="summary-value">
            {{ totalWithTips.toFixed(2) }}
            <small>{{ currency }}</small>
          </span>
        </div>

        <div class="people-table">
          <div class="table-header">
            <span>Участник</span>
            <span>Должен (с чаев.)</span>
            <span>Заплатил</span>
          </div>
          <div
            v-for="(person, index) in people"
            class="table-row"
            :key="index"
          >
            <div class="row-person">
              <div
                class="row-avatar"
                :style="{ background: getAvatarColor(person.name) }"
              >
                {{ person.name[0].toUpperCase() }}
              </div>
              <span class="row-name">{{ person.name }}</span>
            </div>
            <span class="row-cost">
              {{ personCostsWithTips[person.id].toFixed(2) }}
              <small>{{ currency }}</small>
            </span>
            <div class="row-paid-wrap">
              <input
                class="paid-input"
                type="number"
                inputmode="decimal"
                placeholder="0"
                v-model="personPaid[person.id]"
              />
            </div>
          </div>
        </div>

        <div class="result-action">
          <base-btn
            text="Кто кому должен"
            rightIcon="./icons/arrow.svg"
            @click="showDebtsOrModal"
          />
        </div>

        <transition name="modal-slide">
          <div
            v-if="showModal"
            class="modal-overlay"
            @click.self="showModal = false"
          >
            <div class="modal-sheet">
              <div class="sheet-handle"></div>
              <div class="modal-emoji">
                <Icon
                  icon="mdi:cash"
                  class="modal-emoji-icon"
                />
              </div>
              <h3>Не хватает денег</h3>
              <p>
                Ещё нужно:
                <strong>
                  {{ (totalWithTips - totalPaid).toFixed(2) }} {{ currency }}
                </strong>
                <br />
                Введите суммы, которые покрывают все расходы (с учётом чаевых).
              </p>
              <base-btn
                text="Понятно"
                @click="showModal = false"
              />
            </div>
          </div>
        </transition>
      </div>

      <div
        v-else
        key="debts"
        class="debts-view"
      >
        <h2 class="screen-title">
          <Icon
            icon="mdi:handshake-outline"
            class="screen-title-icon"
          />
          Расчёты
        </h2>

        <div
          v-if="debts.whoOwes.length === 0 && debts.whoIsOwed.length === 0"
          class="debts-empty"
        >
          <div class="debts-empty-icon">
            <Icon
              icon="mdi:party-popper"
              class="debts-empty-icon-svg"
            />
          </div>
          <p>Все заплатили поровну!</p>
        </div>

        <template v-else>
          <div
            v-if="debts.whoOwes.length > 0"
            class="debt-section"
          >
            <div class="debt-section-label">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="23"
                />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Кто кому переводит
            </div>
            <div
              v-for="(debt, i) in debts.whoOwes"
              :key="'owe-' + i"
              class="debt-card"
            >
              <div class="debt-from">
                <div
                  class="debt-avatar"
                  :style="{ background: getAvatarColor(debt.from) }"
                >
                  {{ debt.from[0] }}
                </div>
                <span>{{ debt.from }}</span>
              </div>
              <div class="debt-arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span class="debt-amount">
                  {{ debt.amount }} {{ currency }}
                </span>
              </div>
              <div class="debt-to">
                <div
                  class="debt-avatar"
                  :style="{ background: getAvatarColor(debt.to) }"
                >
                  {{ debt.to[0] }}
                </div>
                <span>{{ debt.to }}</span>
              </div>
            </div>
          </div>
        </template>

        <button
          v-if="canWebShare"
          type="button"
          class="share-main-btn"
          @click="webShare"
        >
          <Icon
            icon="mdi:share-variant"
            class="share-main-icon"
          />
          Поделиться результатом
        </button>

        <div class="debts-export">
          <span class="debts-export-label">Сохранить или отправить</span>
          <div class="debts-export-buttons">
            <button
              type="button"
              class="export-btn copy"
              title="Скопировать текст"
              @click="copyToClipboard"
            >
              <Icon
                icon="mdi:content-copy"
                class="export-btn-icon"
              />
              <span>Скопировать</span>
            </button>
            <button
              type="button"
              class="export-btn pdf"
              title="Сохранить PDF"
              @click="saveAsPdf"
            >
              <Icon
                icon="mdi:file-pdf-box"
                class="export-btn-icon"
              />
              <span>PDF</span>
            </button>
            <button
              type="button"
              class="export-btn tg"
              title="Отправить в Telegram"
              @click="shareToTelegram"
            >
              <Icon
                icon="mdi:send"
                class="export-btn-icon"
              />
              <span>Telegram</span>
            </button>
            <button
              type="button"
              class="export-btn wa"
              title="Отправить в WhatsApp"
              @click="shareToWhatsApp"
            >
              <Icon
                icon="mdi:whatsapp"
                class="export-btn-icon"
              />
              <span>WhatsApp</span>
            </button>
          </div>
          <transition name="toast">
            <div
              v-if="copySuccess"
              class="export-toast"
            >
              Скопировано в буфер
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Icon } from '@iconify/vue'
  import jsPDF from 'jspdf'
  import autoTable from 'jspdf-autotable'
  import { billResultStore } from '../store/billResult.js'

  const AVATAR_GRADS = [
    'linear-gradient(135deg,#048bfa,#0260c4)',
    'linear-gradient(135deg,#f05252,#c0392b)',
    'linear-gradient(135deg,#22c55e,#168d3f)',
    'linear-gradient(135deg,#f59e0b,#c97d08)',
    'linear-gradient(135deg,#8b5cf6,#6530c2)',
    'linear-gradient(135deg,#0dbfac,#07907f)',
    'linear-gradient(135deg,#ec4899,#b52277)',
  ]

  export default {
    components: { Icon },
    props: {
      positions: { type: Array, required: true },
      defaultTip: { type: Number, required: true },
      people: { type: Array, required: true },
      currency: { type: String, default: '₽' },
    },

    data() {
      return {
        personPaid: {},
        currentScreen: 'result',
        showModal: false,
        copySuccess: false,
        copyToastTimer: null,
      }
    },

    watch: {
      currentScreen(val) {
        billResultStore.subScreen = val
      },
      $storeSubScreen: {
        handler(val) {
          if (val === 'result') this.currentScreen = 'result'
        },
      },
    },

    mounted() {
      billResultStore.subScreen = this.currentScreen
    },

    beforeUnmount() {
      billResultStore.subScreen = 'result'
    },

    computed: {
      $storeSubScreen() {
        return billResultStore.subScreen
      },
      totalCost() {
        return Object.values(this.personCosts).reduce((s, c) => s + c, 0)
      },
      tipsAmount() {
        return this.totalCost * (this.defaultTip / 100)
      },
      totalWithTips() {
        return this.totalCost + this.tipsAmount
      },
      canWebShare() {
        return typeof navigator !== 'undefined' && !!navigator.share
      },
      totalPaid() {
        return Object.values(this.personPaid).reduce(
          (s, p) => s + parseFloat(p || 0),
          0,
        )
      },
      personCosts() {
        const costs = {}
        for (const person of this.people) {
          let total = 0
          for (const pos of this.positions) {
            const isParticipant = (pos.people || []).some(
              (p) => (p && p.id === person.id) || (p && p.name === person.name),
            )
            if (isParticipant) {
              const n = Math.max(1, Math.round((pos.people || []).length))
              total += pos.price / n
            }
          }
          costs[person.id] = total
        }
        return costs
      },
      personCostsWithTips() {
        const withTips = {}
        const k = 1 + this.defaultTip / 100
        for (const person of this.people) {
          withTips[person.id] = (this.personCosts[person.id] || 0) * k
        }
        return withTips
      },
      debts() {
        return this.calculateDebts()
      },
    },

    methods: {
      getAvatarColor(name) {
        return AVATAR_GRADS[name.charCodeAt(0) % AVATAR_GRADS.length]
      },

      showDebtsOrModal() {
        if (this.totalWithTips > this.totalPaid) {
          this.showModal = true
        } else {
          this.currentScreen = 'debts'
          this.$emit('save-history')
        }
      },

      calculateDebts() {
        const debts = { whoOwes: [], whoIsOwed: [] }
        const balances = this.people.map((p) => ({
          person: p,
          balance:
            parseFloat(this.personPaid[p.id] || 0) -
            this.personCostsWithTips[p.id],
        }))

        const creditors = balances
          .filter((b) => b.balance > 0.001)
          .sort((a, b) => b.balance - a.balance)
        const debtors = balances
          .filter((b) => b.balance < -0.001)
          .sort((a, b) => a.balance - b.balance)

        for (const debtor of debtors) {
          let remaining = -debtor.balance
          for (const creditor of creditors) {
            if (creditor.balance < 0.001) continue
            const amount = Math.min(remaining, creditor.balance)
            if (amount > 0.01) {
              debts.whoOwes.push({
                from: debtor.person.name,
                to: creditor.person.name,
                amount: amount.toFixed(2),
              })
            }
            creditor.balance -= amount
            remaining -= amount
            if (remaining < 0.001) break
          }
        }

        return debts
      },

      getShareText() {
        const cur = this.currency
        let text = '🍽 Результат расчёта — Cafe Bill Splitter\n\n'
        text += `Итого: ${this.totalCost.toFixed(2)} ${cur}\n`
        text += `Чаевые ${this.defaultTip}%: ${this.tipsAmount.toFixed(2)} ${cur}\n`
        text += `К оплате с чаевыми: ${this.totalWithTips.toFixed(2)} ${cur}\n\n`
        if (this.debts.whoOwes.length === 0) {
          text += 'Все заплатили поровну!'
        } else {
          text += 'Кто кому переводит:\n'
          this.debts.whoOwes.forEach((d) => {
            text += `  ${d.from} → ${d.to}: ${d.amount} ${cur}\n`
          })
        }
        return text
      },

      async webShare() {
        try {
          await navigator.share({
            title: 'Cafe Bill Splitter — результат',
            text: this.getShareText(),
          })
        } catch (_) {
          void 0
        }
      },

      arrayBufferToBase64(buffer) {
        let binary = ''
        const bytes = new Uint8Array(buffer)
        for (let i = 0; i < bytes.byteLength; i++)
          binary += String.fromCharCode(bytes[i])
        return btoa(binary)
      },

      async saveAsPdf() {
        const doc = new jsPDF()
        const fontUrl =
          typeof process !== 'undefined' && process.env && process.env.BASE_URL
            ? process.env.BASE_URL + 'fonts/Roboto-Regular.ttf'
            : '/fonts/Roboto-Regular.ttf'
        try {
          const res = await fetch(fontUrl)
          if (res.ok) {
            const buf = await res.arrayBuffer()
            const base64 = this.arrayBufferToBase64(buf)
            doc.addFileToVFS('Roboto-Regular.ttf', base64)
            doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')
            doc.setFont('Roboto', 'normal')
          }
        } catch (_) {
          console.warn(
            'PDF: шрифт с кириллицей не загружен. Добавьте public/fonts/Roboto-Regular.ttf для корректного отображения.',
          )
        }
        doc.setFontSize(16)
        doc.text('Расчёт — Cafe Bill Splitter', 14, 16)
        doc.setFontSize(10)
        doc.text(
          `Итого: ${this.totalCost.toFixed(2)} руб.  |  Чаевые ${this.defaultTip}%: ${this.tipsAmount.toFixed(2)} руб.  |  С чаевыми: ${this.totalWithTips.toFixed(2)} руб.`,
          14,
          24,
        )
        const tableData = this.debts.whoOwes.map((d) => [
          `${d.from} → ${d.to}`,
          `${d.amount} руб.`,
        ])
        if (tableData.length > 0) {
          autoTable(doc, {
            head: [['Кто переводит', 'Сумма']],
            body: tableData,
            startY: 30,
            styles: {
              font: doc.getFont().fontName,
              fontStyle: 'normal',
              fontSize: 10,
            },
          })
        } else {
          doc.text('Все заплатили поровну.', 14, 30)
        }
        doc.save('raschet-kto-komu-dolzhen.pdf')
      },

      shareToTelegram() {
        const text = encodeURIComponent(this.getShareText())
        window.open(
          `https://t.me/share/url?text=${text}`,
          '_blank',
          'noopener,noreferrer',
        )
      },

      shareToWhatsApp() {
        const text = encodeURIComponent(this.getShareText())
        window.open(
          `https://wa.me/?text=${text}`,
          '_blank',
          'noopener,noreferrer',
        )
      },

      async copyToClipboard() {
        if (this.copyToastTimer) clearTimeout(this.copyToastTimer)
        try {
          await navigator.clipboard.writeText(this.getShareText())
          this.copySuccess = true
          this.copyToastTimer = setTimeout(() => {
            this.copySuccess = false
            this.copyToastTimer = null
          }, 2500)
        } catch (_) {
          this.copySuccess = false
        }
      },
    },
  }
</script>

<style scoped>
  .result-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  .result-view,
  .debts-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 18px 16px 12px;
    gap: 14px;
    -webkit-overflow-scrolling: touch;
  }

  .result-view::-webkit-scrollbar,
  .debts-view::-webkit-scrollbar {
    width: 3px;
  }
  .result-view::-webkit-scrollbar-thumb,
  .debts-view::-webkit-scrollbar-thumb {
    background: var(--accent-border);
    border-radius: 4px;
  }

  .screen-title {
    font-size: 17px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-primary);
    margin: 0;
    transition: color 0.3s;
  }
  .screen-title-icon {
    font-size: 22px;
    color: var(--accent);
  }

  .summary-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .summary-card {
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .summary-card.accent {
    border-color: var(--accent-border);
    background: var(--accent-soft);
  }

  .summary-label {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--label-color);
    transition: color 0.3s;
  }

  .summary-value {
    font-size: 20px;
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1;
    transition: color 0.3s;
  }
  .summary-card.accent .summary-value {
    color: var(--accent);
  }
  .summary-value small {
    font-size: 12px;
    font-weight: 600;
  }

  .summary-total-with-tips {
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    border-radius: 14px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition:
      background 0.3s,
      border-color 0.3s;
  }
  .summary-total-with-tips .summary-value {
    font-size: 18px;
  }

  .people-table {
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    border-radius: 14px;
    overflow: hidden;
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 90px 90px;
    padding: 10px 14px;
    background: var(--card-bg);
    border-bottom: 1px solid var(--surface-border);
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--label-color);
    transition:
      background 0.3s,
      color 0.3s,
      border-color 0.3s;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 90px 90px;
    align-items: center;
    padding: 11px 14px;
    border-bottom: 1px solid var(--surface-border);
    transition:
      background 0.15s,
      border-color 0.3s;
  }
  .table-row:last-child {
    border-bottom: none;
  }
  .table-row:hover {
    background: var(--card-bg);
  }

  .row-person {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
  }

  .row-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 900;
    color: #fff;
    flex-shrink: 0;
  }

  .row-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.3s;
  }

  .row-cost {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    transition: color 0.3s;
  }
  .row-cost small {
    font-size: 10px;
    color: var(--text-secondary);
  }

  .paid-input {
    width: 76px;
    background: var(--card-bg);
    border: 1.5px solid var(--surface-border);
    border-radius: 8px;
    padding: 6px 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    font-family: 'Nunito', sans-serif;
    outline: none;
    transition:
      border-color 0.2s,
      background 0.3s,
      color 0.3s;
    -moz-appearance: textfield;
  }
  .paid-input::-webkit-outer-spin-button,
  .paid-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .paid-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  .paid-input::placeholder {
    color: var(--label-color);
  }

  .result-action {
    display: flex;
    justify-content: center;
    padding-bottom: 4px;
  }

  .share-main-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px 20px;
    border-radius: 16px;
    background: var(--step-active-bg);
    border: none;
    color: #fff;
    font-size: 15px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    transition:
      opacity 0.2s,
      transform 0.15s,
      box-shadow 0.2s;
    box-shadow: var(--step-active-shadow);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    letter-spacing: 0.02em;
  }
  .share-main-btn:hover {
    opacity: 0.9;
    box-shadow: 0 6px 20px rgba(4, 139, 250, 0.5);
  }
  .share-main-btn:active {
    transform: scale(0.97);
  }
  .share-main-icon {
    font-size: 22px;
  }

  .debt-section-label {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--label-color);
    margin-bottom: 10px;
    transition: color 0.3s;
  }
  .debt-section-label svg {
    color: var(--accent);
  }

  .debt-card {
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .debt-from,
  .debt-to {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: var(--text-primary);
    min-width: 52px;
    transition: color 0.3s;
  }

  .debt-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 900;
    color: #fff;
  }

  .debt-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
  }
  .debt-arrow svg {
    color: var(--accent);
  }

  .debt-amount {
    font-size: 13px;
    font-weight: 800;
    color: var(--accent);
    white-space: nowrap;
    transition: color 0.3s;
  }

  .debts-empty {
    text-align: center;
    padding: 36px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .debts-empty-icon {
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .debts-empty-icon-svg {
    width: 48px;
    height: 48px;
    color: var(--accent);
  }
  .debts-empty p {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-secondary);
    margin: 0;
  }

  .debts-export {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .debts-export-label {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--label-color);
    transition: color 0.3s;
  }
  .debts-export-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .export-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 12px;
    border: none;
    font-size: 13px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    transition:
      transform 0.15s,
      box-shadow 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .export-btn:active {
    transform: scale(0.97);
  }
  .export-btn-icon {
    font-size: 20px;
  }
  .export-btn.copy {
    background: #5a6c7d;
    color: #fff;
  }
  .export-btn.copy:hover {
    background: #4a5c6d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .export-btn.pdf {
    background: #e8e8e8;
    color: #c0392b;
  }
  .export-btn.pdf:hover {
    background: #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
  .export-btn.tg {
    background: #0088cc;
    color: #fff;
  }
  .export-btn.tg:hover {
    background: #007ab8;
    box-shadow: 0 2px 10px rgba(0, 136, 204, 0.4);
  }
  .export-btn.wa {
    background: #25d366;
    color: #fff;
  }
  .export-btn.wa:hover {
    background: #20bd5a;
    box-shadow: 0 2px 10px rgba(37, 211, 102, 0.4);
  }

  .export-toast {
    margin-top: 10px;
    padding: 8px 14px;
    border-radius: 10px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 13px;
    font-weight: 700;
    text-align: center;
  }
  .toast-enter-active {
    transition: all 0.25s ease;
  }
  .toast-leave-active {
    transition: all 0.2s ease;
  }
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4, 8, 20, 0.6);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 500;
  }

  .modal-sheet {
    background: var(--modal-sheet-bg);
    border-radius: 28px 28px 0 0;
    padding: 12px 28px 36px;
    padding-bottom: calc(36px + env(safe-area-inset-bottom, 0px));
    width: 100%;
    max-width: 480px;
    text-align: center;
    border-top: 2px solid var(--modal-sheet-border);
    box-shadow: 0 -6px 40px rgba(0, 0, 0, 0.3);
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .sheet-handle {
    width: 40px;
    height: 4px;
    background: #444;
    border-radius: 4px;
    margin: 0 auto 20px;
  }
  .modal-emoji {
    font-size: 40px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-emoji-icon {
    width: 40px;
    height: 40px;
    color: var(--accent);
  }

  .modal-sheet h3 {
    font-size: 18px;
    font-weight: 800;
    color: #e4eeff;
    margin: 0 0 10px;
  }
  .modal-sheet p {
    font-size: 14px;
    color: rgba(180, 200, 230, 0.6);
    margin: 0 0 24px;
    line-height: 1.6;
  }
  .modal-sheet strong {
    color: #e4eeff;
  }

  .slide-fade-enter-active {
    transition: all 0.26s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slide-fade-leave-active {
    transition: all 0.18s ease;
  }
  .slide-fade-enter-from {
    opacity: 0;
    transform: translateX(16px);
  }
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-16px);
  }

  .modal-slide-enter-active {
    transition: all 0.32s cubic-bezier(0.32, 1, 0.56, 1);
  }
  .modal-slide-leave-active {
    transition: all 0.2s ease;
  }
  .modal-slide-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }
  .modal-slide-leave-to {
    opacity: 0;
    transform: translateY(80%);
  }

  @media (max-width: 480px) {
    .result-view,
    .debts-view {
      padding: 12px 12px 16px;
      padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
      gap: 12px;
    }
    .screen-title {
      font-size: 15px;
    }
    .screen-title-icon {
      font-size: 20px;
    }
    .summary-cards {
      gap: 8px;
    }
    .summary-card {
      padding: 12px 14px;
    }
    .summary-total-with-tips {
      padding: 10px 14px;
    }
    .summary-value {
      font-size: 18px;
    }
    .summary-total-with-tips .summary-value {
      font-size: 16px;
    }
    .table-header,
    .table-row {
      grid-template-columns: 1fr 78px 78px;
      padding: 10px 12px;
      font-size: 12px;
    }
    .row-avatar {
      width: 28px;
      height: 28px;
      font-size: 11px;
    }
    .row-name {
      font-size: 12px;
    }
    .row-cost {
      font-size: 12px;
    }
    .paid-input {
      width: 64px;
      padding: 8px 6px;
      font-size: 14px;
      min-height: 40px;
    }
    .debt-card {
      padding: 12px 14px;
      gap: 8px;
      margin-bottom: 6px;
    }
    .debt-from,
    .debt-to {
      font-size: 11px;
      min-width: 48px;
    }
    .debt-avatar {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }
    .debt-amount {
      font-size: 12px;
    }
    .debts-export {
      margin-top: 4px;
      gap: 8px;
    }
    .debts-export-buttons {
      gap: 8px;
      justify-content: center;
    }
    .export-btn {
      min-height: 44px;
      min-width: 44px;
      padding: 12px 14px;
      font-size: 12px;
    }
    .export-btn-icon {
      font-size: 22px;
    }
  }

  @media (max-width: 360px) {
    .result-view,
    .debts-view {
      padding: 10px 10px 14px;
    }
    .table-header,
    .table-row {
      grid-template-columns: 1fr 70px 70px;
    }
    .paid-input {
      width: 56px;
    }
    .export-btn {
      padding: 10px 12px;
      font-size: 11px;
    }
  }
</style>
