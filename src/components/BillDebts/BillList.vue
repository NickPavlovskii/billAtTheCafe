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
</template>

<script>
  import BillDebts from './BillDebts.vue'
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
    },
  }
</script>

<style scoped>
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
