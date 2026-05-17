<template>
  <div class="add-position-screen">
    <h2 class="screen-title">
      <Icon
        icon="mdi:silverware-fork-knife"
        class="screen-title-icon"
      />
      Позиции
    </h2>
    <AddPositionForm
      :people="people"
      :currency="currency"
      @add-position="handleAddPosition"
    />
    <PositionList
      v-if="positions.length > 0"
      :positions="positions"
      :currency="currency"
      @remove-position="removePosition"
    />
    <InterimTotal
      :positions="positions"
      :defaultTip="defaultTip"
      :currency="currency"
    />
  </div>
</template>

<script>
  import { Icon } from '@iconify/vue'
  import AddPositionForm from './AddPosition/AddPositionForm.vue'
  import PositionList from './AddPosition/PositionList.vue'
  import InterimTotal from './AddPosition/InterimTotal.vue'

  export default {
    components: { Icon, AddPositionForm, PositionList, InterimTotal },
    props: {
      positions: { type: Array, required: true },
      people: { type: Array, required: true },
      defaultTip: { type: Number, required: true },
      currency: { type: String, default: '₽' },
    },
    methods: {
      handleAddPosition(position) {
        this.$emit('add-position', position)
      },
      removePosition(index) {
        this.$emit('remove-position', index)
      },
    },
  }
</script>

<style scoped>
  .add-position-screen {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 18px 16px 0;
    gap: 16px;
  }

  .screen-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0;
    transition: color 0.3s;
  }
  .screen-title-icon {
    font-size: 22px;
    color: var(--accent);
  }

  .add-position-screen::-webkit-scrollbar {
    width: 3px;
  }
  .add-position-screen::-webkit-scrollbar-track {
    background: transparent;
  }
  .add-position-screen::-webkit-scrollbar-thumb {
    background: var(--accent-border);
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    .add-position-screen {
      padding: 14px 14px 0;
      gap: 12px;
    }
  }
</style>
