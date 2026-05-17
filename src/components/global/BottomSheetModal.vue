<template>
  <transition name="modal-slide">
    <div
      v-if="show"
      class="modal-overlay"
      @click.self="close"
    >
      <div
        class="modal-sheet"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title && !$slots.default ? 'bottom-sheet-title' : undefined"
        @click.stop
      >
        <div class="sheet-handle" />

        <slot v-if="$slots.default" />
        <template v-else>
          <div
            v-if="icon"
            class="modal-emoji"
          >
            <Icon
              class="modal-emoji-icon"
              :icon="icon"
            />
          </div>
          <h3
            v-if="title"
            id="bottom-sheet-title"
            class="modal-title"
          >
            {{ title }}
          </h3>
          <p
            v-if="text"
            class="modal-text"
          >
            {{ text }}
          </p>
        </template>

        <div
          v-if="$slots.footer"
          class="modal-footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'BottomSheetModal',
  components: { Icon },
  props: {
    show: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    text: { type: String, default: '' },
  },
  emits: ['update:show', 'close'],
  methods: {
    close() {
      this.$emit('update:show', false)
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(43, 27, 23, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.modal-sheet {
  background: var(--modal-sheet-bg);
  border-radius: 28px 28px 0 0;
  padding: 12px 28px 36px;
  padding-bottom: calc(36px + env(safe-area-inset-bottom, 0px));
  width: 100%;
  max-width: 480px;
  text-align: center;
  border-top: 3px solid var(--modal-sheet-border);
  box-shadow: 0 -8px 40px rgba(43, 27, 23, 0.2);
}

.sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--surface-border);
  border-radius: 4px;
  margin: 0 auto 20px;
}

.modal-emoji {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-emoji-icon {
  width: 44px;
  height: 44px;
  color: var(--accent);
}

.modal-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--modal-text);
  margin: 0 0 8px;
}

.modal-text {
  font-size: 13px;
  color: var(--modal-subtext);
  margin: 0 0 22px;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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

@media (min-width: 768px) {
  .modal-overlay {
    align-items: center;
    padding: 24px;
  }
  .modal-sheet {
    border-radius: var(--radius-lg);
    border: 2px solid var(--modal-sheet-border);
    border-top: 2px solid var(--modal-sheet-border);
    max-width: 420px;
  }
  .modal-slide-enter-from,
  .modal-slide-leave-to {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
