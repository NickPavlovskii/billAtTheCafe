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
    
        <ul v-if="debts.whoOwes.length > 0" class="custom-list">
          <li v-for="(debt, index) in debts.whoOwes" :key="index" class="custom-list-item">
            <span class="debt-info">
              <span class="debt-amount">{{ debt.amount }} 
                </span>
                <span class="currency-symbol" >&#8381;</span> 
            </span>
            <!-- <span class="debt-from">Пользователь {{ debt.to }}</span> -->
            <span class="debt-to"> Пользователь <span class="Nikname">{{ debt.to }}</span> должен пользователю <span class="Nikname"> {{ debt.from }}</span> </span>
          </li>
        </ul>
        <div v-else class="no-debts">
          <p>Никто никому ничего не должен.</p>
          <i class="custom-icon fas fa-thumbs-up"></i>
        </div>
      </div>
  
      <div v-if="currentTab === 'who-is-owed'" class="bill-list">
      
        <ul v-if="debts.whoIsOwed.length > 0" class="custom-list">
          <li v-for="(debt, index) in debts.whoIsOwed" :key="index" class="custom-list-item">
            <span class="debt-info">
              <span class="debt-amount">{{ debt.amount }}</span>
              <span class="currency-symbol" >&#8381;</span> 
            </span>
            <span class="debt-to"> Пользователю <span class="Nikname" > {{ debt.from }}</span>  должен пользователь <span class="Nikname"> {{ debt.to }}</span></span>
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

  .Nikname{
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
  background-color: #eee;
  border: none;
  border-radius: 4px;
 color:  #ccc;
  cursor: pointer;
  
}

.bill-tab.active {
  background-color: #ccc;
  color: #1976d2;
}

.tab-icon {
  font-weight: bold;
}

.bill-list {
  text-align: center;
  border: 1px solid #ccc;;
}

.bill-list h3 {
  font-size: 18px;
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
  
  .bill-list h3 {
    margin-bottom: 10px;
  }
  
  .bill-list p {
    margin-top: 10px;
  }
  </style>
  