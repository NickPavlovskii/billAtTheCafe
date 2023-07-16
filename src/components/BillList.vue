<template>
  <div class="bill-owe">
    <div class="bill-tabs">

        <!-- Tab button for "Who Owes" -->
      <button :class="{ 'bill-tab': true, active: currentTab === 'who-owes' }" @click="changeTab('who-owes')">
        <span class="tab-icon">Кто кому должен</span>
      </button>

      <!-- Tab button for "Who Is Owed" -->
      <button :class="{ 'bill-tab': true, active: currentTab === 'who-is-owed' }" @click="changeTab('who-is-owed')">
        <span class="tab-icon">Кому кто должен</span>
      </button>

    </div>

<!-- Display debts for "Who Owes" tab -->
    <div v-if="currentTab === 'who-owes'" class="bill-list">
      <ul v-if="debts.whoOwes.length > 0" class="custom-list"> <!-- List item for each debt -->
        <li v-for="(debt, index) in debts.whoOwes" :key="index" class="custom-list-item">
          <span class="debt-info">
            <span class="debt-amount">{{ debt.amount }} 
            </span>
            <span class="currency-symbol">&#8381;</span>
          </span>
          <!-- Display debt information -->
          <span class="debt-to"> Пользователь <span class="Nikname">{{ debt.to }}</span> должен пользователю <span class="Nikname"> {{ debt.from }}</span> </span>
        </li>
      </ul>
      <!-- Display message when there are no debts -->
      <div v-else class="no-debts">
        <p>Никто никому ничего не должен.</p>
        <i class="custom-icon fas fa-thumbs-up"></i>
      </div>
    </div>
    <!-- Display debts for "Who Is Owed" tab -->
    <div v-if="currentTab === 'who-is-owed'" class="bill-list">
      <ul v-if="debts.whoIsOwed.length > 0" class="custom-list"> <!-- List item for each debt -->
        <li v-for="(debt, index) in debts.whoIsOwed" :key="'debt-'+index" class="custom-list-item"> 
          <span class="debt-info">
            <span class="debt-amount">{{ debt.amount }}</span>
            <span class="currency-symbol">&#8381;</span>
          </span>
          <span class="debt-to"> Пользователю <span class="Nikname">{{ debt.from }}</span> должен пользователь <span class="Nikname"> {{ debt.to }}</span></span>
        </li>
      </ul>
      <div v-else class="no-debts">
        <p>Никто никому ничего не должен.</p>
        <i class="custom-icon fas fa-thumbs-up"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  props: {
    debts: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentTab: 'who-owes',
    };
  },
  methods: {
     // Change the current tab
    changeTab(tab) { 
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped >

.bill-list::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.bill-list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #048bfa;
}

.bill-list::-webkit-scrollbar-thumb:hover {
  background-color: #555;
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
  content: "";
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

.bill-list {
  text-align: center;
  border: 1px solid #ccc;
  overflow-y: auto;
  max-height: 200px;
  color: #27282c;
}

.bill-list h3 {
  margin-bottom: 10px;
}

.custom-list {
  list-style: none;
  padding: 0;
}

.custom-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #27282c;
  padding: 10px;
  margin: 15px;
  border: 1px solid #048bfa;
  border-radius: 14px;
  color: white;
}

.debt-info {
  display: flex;
  align-items: center;
}

.debt-amount {
  font-weight: bold;
  margin-right: 5px;
}

.currency-symbol {
  font-size: 22px;
}

.debt-from,
.debt-to {
  font-size: 14px;
}

.no-debts {
  margin-top: 20px;
}

.no-debts p {
  font-size: 16px;
  margin-bottom: 10px;
}

.custom-icon {
  font-size: 24px;
  color: green;
}
</style>
