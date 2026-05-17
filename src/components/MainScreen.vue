<template>
  <div
    :class="['main-screen', { 'main-screen-desktop': isDesktop }]"
  >
    <div class="hero">
      <div class="hero-badge">
        <Icon
          icon="mdi:star-four-points"
          class="hero-badge-icon"
        />
        Делите счёт честно
      </div>
      <h1 class="hero-title">
        Cafe
        <br />
        <span class="hero-accent">Bill Splitter</span>
      </h1>
      <p class="hero-sub">
        Без споров, без калькулятора — просто выбери, кто что ел
      </p>
    </div>

    <div class="hero-actions">
      <button
        v-if="hasDraft"
        type="button"
        class="btn-primary btn-primary-wide"
        @click="$emit('continue-draft')"
      >
        Продолжить текущий счёт
        <Icon
          icon="mdi:arrow-right"
          class="btn-arrow"
        />
      </button>
      <button
        type="button"
        :class="['btn-secondary', { 'btn-secondary-only': !hasDraft }]"
        @click="hasDraft ? $emit('start-fresh') : $emit('start')"
      >
        {{ hasDraft ? 'Начать заново' : 'Начать' }}
        <Icon
          icon="mdi:arrow-right"
          class="btn-arrow"
        />
      </button>
      <button
        type="button"
        class="btn-hint"
        aria-label="Инструкция"
        @click="showModal = true"
      >
        <Icon icon="mdi:information-outline" />
      </button>
    </div>

    <div class="features">
      <div class="feature-pill">
        <Icon
          icon="mdi:account-group"
          class="feature-pill-icon"
        />
        Несколько человек
      </div>
      <div class="feature-pill">
        <Icon
          icon="mdi:silverware-fork-knife"
          class="feature-pill-icon"
        />
        Любые позиции
      </div>
      <div class="feature-pill">
        <Icon
          icon="mdi:cash-multiple"
          class="feature-pill-icon"
        />
        Чаевые
      </div>
    </div>

    <section
      v-if="recentSessions.length > 0"
      class="recent-section"
    >
      <div class="recent-header">
        <h2 class="recent-title">
          <Icon
            icon="mdi:clock-outline"
            class="recent-title-icon"
          />
          Последние счета
        </h2>
        <button
          type="button"
          class="recent-all"
          @click="$emit('open-history')"
        >
          Все
        </button>
      </div>
      <div class="recent-list">
        <button
          v-for="session in recentSessions"
          :key="session.id"
          type="button"
          class="history-item"
          @click="$emit('restore-session', session)"
        >
          <div class="history-avatars">
            <div
              v-for="(person, idx) in session.people.slice(0, 3)"
              :key="person.id"
              class="history-avatar"
              :style="{
                background: getAvatarColor(person.name, idx),
                zIndex: 3 - idx,
              }"
            >
              {{ idx + 1 }}
            </div>
          </div>
          <div class="history-meta">
            <span class="history-date">{{ formatDate(session.date) }}</span>
            <span class="history-count">{{ session.people.length }} чел.</span>
          </div>
          <span class="history-total">
            {{ calcTotal(session).toFixed(2) }}
            <small>{{ session.currency || '₽' }}</small>
          </span>
        </button>
      </div>
    </section>

    <transition name="modal-slide">
      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="showModal = false"
      >
        <div class="modal-sheet">
          <div class="sheet-handle" />
          <div class="sheet-title">
            <Icon
              icon="mdi:lightbulb-outline"
              class="sheet-icon"
            />
            <h3>Как это работает</h3>
          </div>
          <ul class="steps">
            <li
              v-for="(step, i) in instructionSteps"
              :key="i"
              class="step"
            >
              <div class="step-num">{{ i + 1 }}</div>
              <div class="step-body">
                <strong>{{ step.title }}</strong>
                <p>{{ step.desc }}</p>
              </div>
            </li>
          </ul>
          <button
            type="button"
            class="btn-primary"
            @click="showModal = false"
          >
            Понятно, начнём!
          </button>
        </div>
      </div>
    </transition>

    <div
      class="coffee-bg"
      aria-hidden="true"
    >
      <Icon
        icon="mdi:coffee-outline"
        class="coffee-bg-icon"
      />
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    defineProps,
    defineEmits,
  } from 'vue'
  import { Icon } from '@iconify/vue'
  import {
    getAvatarColor,
    calcSessionTotal,
    formatHistoryDate,
  } from '../utils/billStorage.js'

  defineProps({
    hasDraft: { type: Boolean, default: false },
    recentSessions: { type: Array, default: () => [] },
  })

  defineEmits([
    'start',
    'continue-draft',
    'start-fresh',
    'open-history',
    'restore-session',
  ])

  const showModal = ref(false)
  const isDesktop = ref(false)

  const instructionSteps = [
    {
      title: 'Добавьте участников',
      desc: 'Укажите имена всех, кто сидит за столом',
    },
    {
      title: 'Укажите позиции',
      desc: 'Добавьте блюда и выберите, кто что заказал',
    },
    {
      title: 'Получите результат',
      desc: 'Приложение посчитает сумму для каждого с учётом чаевых',
    },
  ]

  function checkDesktop() {
    isDesktop.value = window.innerWidth >= 768
  }
  function formatDate(iso) {
    return formatHistoryDate(iso)
  }
  function calcTotal(session) {
    return calcSessionTotal(session)
  }

  onMounted(() => {
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkDesktop)
  })
</script>

<style scoped>
  .main-screen {
    padding: 28px 20px 24px;
    position: relative;
    overflow: hidden;
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 420px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .hero {
    text-align: center;
    margin-bottom: 24px;
    width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff5d6;
    color: var(--brown);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 7px 14px;
    border-radius: 100px;
    border: 1px solid #f5e6b8;
    margin-bottom: 16px;
  }
  body.dark-theme .hero-badge {
    background: rgba(242, 153, 18, 0.15);
    border-color: var(--accent-border);
    color: var(--orange-light);
  }
  .hero-badge-icon {
    font-size: 14px;
    color: var(--orange);
  }

  .hero-title {
    font-family: 'Indie Flower', cursive;
    font-size: 42px;
    font-weight: 700;
    color: var(--brown);
    line-height: 1.05;
    margin: 0 0 12px;
  }
  .hero-accent {
    color: var(--orange);
  }

  .hero-sub {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 auto;
    max-width: 280px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 340px;
    justify-content: center;
  }

  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 20px;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    border: none;
    cursor: pointer;
    transition:
      transform 0.15s,
      box-shadow 0.2s,
      background 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-primary {
    background: var(--brown-soft);
    color: #fff;
    box-shadow: 0 4px 14px rgba(93, 64, 55, 0.35);
    flex: 1;
    min-width: 100%;
  }
  .btn-primary:hover {
    background: var(--brown);
    transform: translateY(-1px);
  }
  .btn-secondary {
    background: var(--orange);
    color: #fff;
    box-shadow: 0 4px 14px rgba(242, 153, 18, 0.4);
    flex: 1;
    min-width: calc(100% - 54px);
  }
  .btn-secondary-only {
    min-width: calc(100% - 54px);
  }
  .btn-secondary:hover {
    background: var(--orange-dark);
    transform: translateY(-1px);
  }
  .btn-arrow {
    font-size: 18px;
  }

  .btn-hint {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    background: var(--surface);
    border: 2px solid var(--surface-border);
    color: var(--brown);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 22px;
    transition:
      border-color 0.2s,
      background 0.2s;
  }
  .btn-hint:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
  }

  .features {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }

  .feature-pill {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    color: var(--text-secondary);
    font-size: 11px;
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .feature-pill-icon {
    font-size: 15px;
    color: var(--orange);
  }

  .recent-section {
    width: 100%;
    max-width: 360px;
    margin-top: 4px;
  }

  .recent-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .recent-title {
    font-size: 14px;
    font-weight: 800;
    color: var(--brown);
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .recent-title-icon {
    font-size: 18px;
    color: var(--orange);
  }

  .recent-all {
    background: none;
    border: none;
    color: var(--orange);
    font-size: 12px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    padding: 4px 8px;
  }

  .recent-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .history-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 14px;
    background: #fff;
    border: 1.5px solid var(--surface-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    text-align: left;
    transition:
      border-color 0.2s,
      box-shadow 0.2s,
      transform 0.12s;
    -webkit-tap-highlight-color: transparent;
  }
  body.dark-theme .history-item {
    background: var(--surface);
  }
  .history-item:hover {
    border-color: var(--accent-border);
    box-shadow: 0 4px 12px var(--accent-soft);
    transform: translateY(-1px);
  }

  .history-avatars {
    display: flex;
    flex-shrink: 0;
  }
  .history-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 900;
    color: #fff;
    border: 2px solid #fff;
    margin-left: -10px;
  }
  .history-avatar:first-child {
    margin-left: 0;
  }
  body.dark-theme .history-avatar {
    border-color: var(--surface);
  }

  .history-meta {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .history-date {
    font-size: 13px;
    font-weight: 700;
    color: var(--brown);
  }
  .history-count {
    font-size: 11px;
    color: var(--text-secondary);
  }

  .history-total {
    font-size: 16px;
    font-weight: 900;
    color: var(--brown);
    flex-shrink: 0;
  }
  .history-total small {
    font-size: 12px;
    font-weight: 700;
  }

  .coffee-bg {
    position: absolute;
    bottom: 20px;
    right: 10px;
    opacity: 0.06;
    pointer-events: none;
  }
  .coffee-bg-icon {
    width: 120px;
    height: 120px;
    color: var(--brown);
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(43, 27, 23, 0.55);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 200;
  }
  @media (min-width: 768px) {
    .modal-overlay {
      align-items: center;
      padding: 24px;
    }
  }

  .modal-sheet {
    background: var(--card-bg);
    border-radius: 28px 28px 0 0;
    padding: 12px 24px 32px;
    width: 100%;
    max-width: 420px;
    border-top: 3px solid var(--orange);
  }
  @media (min-width: 768px) {
    .modal-sheet {
      border-radius: var(--radius-lg);
      border: 2px solid var(--orange);
    }
  }
  .sheet-handle {
    width: 40px;
    height: 4px;
    background: var(--surface-border);
    border-radius: 4px;
    margin: 0 auto 16px;
  }
  .sheet-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }
  .sheet-icon {
    font-size: 26px;
    color: var(--orange);
  }
  .sheet-title h3 {
    font-size: 18px;
    font-weight: 800;
    color: var(--brown);
    margin: 0;
  }

  .steps {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .step-num {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--accent-soft);
    border: 2px solid var(--orange);
    color: var(--orange);
    font-size: 13px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .step-body strong {
    font-size: 14px;
    font-weight: 800;
    color: var(--brown);
    display: block;
    margin-bottom: 2px;
  }
  .step-body p {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
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
    transform: translateY(60%);
  }

  @media (max-width: 480px) {
    .main-screen {
      padding: 20px var(--mobile-padding-x, 16px) 24px;
      min-height: auto;
      width: 100%;
    }
    .hero-title {
      font-size: 36px;
    }
    .btn-primary,
    .btn-secondary {
      min-height: 48px;
    }
  }

  @media (min-width: 768px) {
    .main-screen-desktop {
      padding: 48px 56px 40px;
      max-width: 520px;
      margin: 0 auto;
    }
    .main-screen-desktop .hero-title {
      font-size: 56px;
    }
    .main-screen-desktop .hero-actions {
      max-width: 100%;
      flex-wrap: nowrap;
    }
    .main-screen-desktop .btn-primary {
      min-width: auto;
      flex: 1.2;
    }
    .main-screen-desktop .btn-secondary {
      min-width: auto;
      flex: 1;
    }
    .main-screen-desktop .recent-section {
      max-width: 100%;
    }
  }
</style>
