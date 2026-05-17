<template>
  <div class="interim-total">
    <div class="interim-row">
      <div class="interim-item">
        <span class="interim-label">
          <svg
            width="12"
            height="12"
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
          Сумма
        </span>
        <span class="interim-value">
          {{ total }}
          <small>{{ currency }}</small>
        </span>
      </div>
      <div class="interim-divider"></div>
      <div class="interim-item accent">
        <span class="interim-label">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Чаевые {{ defaultTip }}%
        </span>
        <span class="interim-value">
          {{ tip }}
          <small>{{ currency }}</small>
        </span>
      </div>
    </div>
    <div class="interim-total-row">
      <span class="interim-total-label">Итого с чаевыми</span>
      <span class="interim-total-value">
        {{ grandTotal }}
        <small>{{ currency }}</small>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InterimTotal',
    props: {
      positions: { type: Array, required: true },
      defaultTip: { type: Number, required: true },
      currency: { type: String, default: '₽' },
    },
    computed: {
      total() {
        return this.positions.reduce((s, p) => s + p.price, 0).toFixed(2)
      },
      tip() {
        return ((parseFloat(this.total) * this.defaultTip) / 100).toFixed(2)
      },
      grandTotal() {
        return (parseFloat(this.total) + parseFloat(this.tip)).toFixed(2)
      },
    },
  }
</script>

<style scoped>
  .interim-total {
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    border-radius: 14px;
    overflow: hidden;
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .interim-row {
    display: flex;
    align-items: stretch;
  }

  .interim-item {
    flex: 1;
    padding: 13px 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .interim-item.accent {
    background: var(--accent-soft);
  }

  .interim-divider {
    width: 1.5px;
    background: var(--surface-border);
    transition: background 0.3s;
  }

  .interim-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--label-color);
    transition: color 0.3s;
  }
  .interim-label svg {
    color: var(--accent);
  }

  .interim-value {
    font-size: 18px;
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1;
    transition: color 0.3s;
  }
  .interim-item.accent .interim-value {
    color: var(--accent);
  }
  .interim-value small {
    font-size: 11px;
    font-weight: 600;
  }

  .interim-total-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 14px;
    border-top: 1.5px solid var(--surface-border);
    background: var(--card-bg);
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .interim-total-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.3s;
  }

  .interim-total-value {
    font-size: 18px;
    font-weight: 900;
    color: var(--text-primary);
    transition: color 0.3s;
  }
  .interim-total-value small {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
  }
</style>
