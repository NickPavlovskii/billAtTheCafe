<template>
  <div>
    <h3 class="title">Список позиций:</h3>
    <ul class="position-list">
      <li
        v-for="(position, index) in positions"
        :key="index"
        class="position-item"
      >
        <div class="position-info">
          <div class="position-top">
            <span class="position-name">{{ position.name }}</span>
            <span class="position-price">
              {{ position.price }} {{ currency }}
            </span>
          </div>
          <div class="avatars-container">
            <div
              v-for="(person, personIndex) in position.people"
              :key="personIndex"
              class="mini-avatar"
              :style="{ background: getAvatarColor(person.name) }"
              :title="person.name"
            >
              {{ person.name[0].toUpperCase() }}
            </div>
          </div>
        </div>
        <button
          class="remove-button"
          @click="$emit('remove-position', index)"
          aria-label="Удалить позицию"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  const AVATAR_GRADS = [
    'linear-gradient(135deg, #048bfa, #0260c4)',
    'linear-gradient(135deg, #f05252, #c0392b)',
    'linear-gradient(135deg, #22c55e, #168d3f)',
    'linear-gradient(135deg, #f59e0b, #c97d08)',
    'linear-gradient(135deg, #8b5cf6, #6530c2)',
    'linear-gradient(135deg, #0dbfac, #07907f)',
    'linear-gradient(135deg, #ec4899, #b52277)',
  ]

  export default {
    name: 'PositionList',
    props: {
      positions: { type: Array, required: true },
      currency: { type: String, default: '₽' },
    },
    emits: ['remove-position'],
    methods: {
      getAvatarColor(name) {
        return AVATAR_GRADS[name.charCodeAt(0) % AVATAR_GRADS.length]
      },
    },
  }
</script>

<style scoped>
  .title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--label-color);
    text-transform: uppercase;
    margin: 0 0 10px;
    transition: color 0.3s;
  }

  .position-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .position-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    background: var(--surface);
    border-radius: 12px;
    border: 1.5px solid var(--surface-border);
    border-left: 3px solid var(--accent);
    transition:
      background 0.3s,
      border-color 0.3s,
      box-shadow 0.15s;
  }
  .position-item:hover {
    box-shadow: 0 2px 8px var(--accent-soft);
  }

  .position-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .position-top {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  .position-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    transition: color 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .position-price {
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    white-space: nowrap;
    transition: color 0.3s;
  }

  .avatars-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .mini-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 900;
    color: #fff;
    flex-shrink: 0;
  }

  .remove-button {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: transparent;
    border: none;
    color: var(--label-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition:
      background 0.15s,
      color 0.15s,
      transform 0.12s;
    -webkit-tap-highlight-color: transparent;
  }
  .remove-button:hover {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
  }
  .remove-button:active {
    transform: scale(0.88);
  }

  @media (max-width: 480px) {
    .title {
      margin-bottom: 8px;
    }
    .position-list {
      gap: 6px;
    }
    .position-item {
      padding: 10px 12px;
      border-radius: 10px;
    }
    .position-name {
      font-size: 12px;
    }
    .position-price {
      font-size: 11px;
    }
    .mini-avatar {
      width: 20px;
      height: 20px;
      font-size: 9px;
    }
    .remove-button {
      min-width: 36px;
      min-height: 36px;
    }
  }
</style>
