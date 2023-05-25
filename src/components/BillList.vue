<template>
    <div class="bill-owe">
      <div class="bill-tabs">
        <button :class="{ 'bill-tab': true, active: currentTab === 'who-owes' }" @click="changeTab('who-owes')">
          <span class="tab-icon">Кто кому должен</span>
        </button>
        <button :class="{ 'bill-tab': true, active: currentTab === 'who-is-owed' }" @click="changeTab('who-is-owed')">
          <span class="tab-icon">Кому кто должен</span>
        </button>
      </div>
  
      <div v-if="currentTab === 'who-owes'" class="bill-list">
        <h3>Список "Кто кому должен"</h3>
        <ul v-if="debts.whoOwes.length > 0">
          <li v-for="(debt, index) in debts.whoOwes" :key="index">
          Пользователь  {{ debt.to }}  должен пользователю {{ debt.from }}  {{ debt.amount }} руб.
          </li>
        </ul>
        <p v-else>Никто никому ничего не должен.</p>
      </div>
  
      <div v-if="currentTab === 'who-is-owed'" class="bill-list">
        <h3>Список "Кому кто должен"</h3>
        <ul v-if="debts.whoIsOwed.length > 0">
            <li v-for="(debt, index) in debts.whoIsOwed" :key="index">
          Пользователю {{ debt.from }}  пользователь {{ debt.to }}  должен {{ debt.amount }} руб.
        </li>
        </ul>
        <p v-else>Никто никому ничего не должен.</p>
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
      changeTab(tab) {
        this.currentTab = tab;
      },
      
    calculateDebts() {
      const debts = {
        whoOwes: [],
        whoIsOwed: [],
      };

      for (const person of this.people) {
        const cost = this.personCosts[person.id];
        const paid = this.personPaid[person.id] || 0;
        let diff = paid - cost;

        if (diff > 0) {
          debts.whoIsOwed.push({
            from: person.name,
            to: 'Все',
            amount: diff.toFixed(2),
          });
        } else if (diff < 0) {
          for (const otherPerson of this.people) {
            if (otherPerson !== person) {
              const otherPersonCost = this.personCosts[otherPerson.id];
              const otherPersonPaid = this.personPaid[otherPerson.id] || 0;
              const otherPersonDiff = otherPersonPaid - otherPersonCost;

              if (otherPersonDiff > 0) {
                const debtAmount = Math.min(-diff, otherPersonDiff);
                debts.whoOwes.push({
                  from: otherPerson.name,
                  to: person.name,
                  amount: debtAmount.toFixed(2),
                });

                diff += debtAmount;
                if (diff >= 0) {
                  break;
                }
              }
            }
          }
        }
      }

      return debts;
    },
    },
  };
  </script>
  
  <style scoped>

  .bill-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
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
    background-color: #1976d2;
  }
  
  .bill-list h3 {
    margin-bottom: 10px;
  }
  
  .bill-list p {
    margin-top: 10px;
  }
  </style>
  