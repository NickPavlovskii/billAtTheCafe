<template>
  <div class="result">
    <h2>Результат</h2>
    <div v-if="currentScreen !== 'bill-list'">
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th class="cost-column">Должен</th>
            <th class="paid-column">Заплатил</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in people" :key="index">
            <td>{{ person.name }}</td>
            <td class="cost-column">{{ personCosts[person.id].toFixed(2) }} руб.</td>
            <td>
              <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                <input class="p-inputtext p-component" v-model="personPaid[person.id]" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="tips">
        Общие чаевые: <span class="tip-amount">{{ tipsAmount }} руб.</span>
      </div>
      <button @click="showModalIfDebtExists" class="p-mt-3 add-button addbtn btnn">
        <span>Кто кому должен</span>
        <i class="i"></i>
      </button>

      <!-- PrimeVue Dialog -->
      <Dialog v-model:visible="showModal" modal :closable="false">
        <div class="modal-content">
          <h3>Вы еще должны {{ (totalCost - totalPaid).toFixed(2) }} руб.</h3>
          <p>Пожалуйста, введите достаточную сумму, чтобы покрыть все расходы.</p>
          <button @click="showModal = false" class="closebtn">Закрыть</button>
        </div>
      </Dialog>
    </div>
    <div v-else>
      <bill-list :currentTab="currentTab" :debts="debts"></bill-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Dialog from 'primevue/dialog';
import BillList from "./BillList.vue";

export default {
  components: {
    Dialog,
    BillList
  },
  data() {
    return {
      currentTab: 'who-owes',
      personPaid: {},
      currentScreen: 'result',
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'people',
      'positions'
    ]),
    totalCost() {
      return Object.values(this.personCosts).reduce((sum, cost) => sum + cost, 0);
    },
    totalPaid() {
      return Object.values(this.personPaid).reduce((sum, paid) => sum + parseFloat(paid || 0), 0);
    },
    personCosts() {
      const costs = {};

      for (const person of this.people) {
        let totalCost = 0;
        for (const position of this.positions) {
          if (position.people.includes(person)) {
            totalCost += position.price / Math.round(position.people.length);
          }
        }
        costs[person.id] = totalCost;
      }

      return costs;
    },
    tipsAmount() {
      let totalPaid = 0;
      for (const personId in this.personPaid) {
        totalPaid += parseFloat(this.personPaid[personId]);
      }
      return totalPaid * 0.1; // Assuming 10% tips
    },
    debts() {
      const debts = {
        whoOwes: [],
        whoIsOwed: [],
      };

      for (const person of this.people) {
        const cost = this.personCosts[person.id];
        const paid = this.personPaid[person.id] || 0;
        let diff = paid - cost;

        if (diff > 0) {
          for (const otherPerson of this.people) {
            if (otherPerson !== person) {
              const otherPersonCost = this.personCosts[otherPerson.id];
              const otherPersonPaid = this.personPaid[otherPerson.id] || 0;
              const otherPersonDiff = otherPersonPaid - otherPersonCost;

              if (otherPersonDiff < 0) {
                const debtAmount = Math.min(diff, -otherPersonDiff);
                debts.whoIsOwed.push({
                  from: person.name,
                  to: otherPerson.name,
                  amount: debtAmount.toFixed(2),
                });

                diff -= debtAmount;
                if (diff <= 0) {
                  break;
                }
              }
            }
          }
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
  methods: {
    ...mapMutations([
      'setCurrentScreen', 
      'setShowModal'
    ]),

    changeTab(tab) {
      this.currentTab = tab;
    },

    showModalIfDebtExists() {
      if (this.totalCost > this.totalPaid) {
        this.showModal = true;
      } else {
        this.changeScreen('bill-list');
      }
    },
    
  },
};
</script>


<style lang="scss" scoped>

//------------- modal-content----------

  .modal-content {
    background-color: #fff;
    padding: 20px;
    text-align: center;
    border: 4px solid #27282c;

    h3 {
      margin-top: 0;
    }

    button {
      margin-top: 20px;
      background: #27282c;
    }
  }


.closebtn {
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.616);
  background: #444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.p-inputtext {
  width: 150px;
  border-radius: 10px;
}

.btnn {
  margin-top: 30px;
  position: relative;
  color: rgba(255, 255, 255, 0.616);
  background: #444;
  font-size: 1.0em;
  letter-spacing: 0.1em;
  font-weight: 400;
  padding: 10px 30px;
  transition: 0.5s;
  text-decoration: none;
  display: inline-block;
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    color: #fff;
    background: #048bfa;
    letter-spacing: 0.25em;
    transition: 0.5s;
  }

  &:hover span i {
    color: #fff;
    letter-spacing: 0.25em;
    transition: 0.5s;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 2px;
    background: #27282c;
  }

  span {
    position: relative;
    z-index: 1;
  }

  .i {
    position: absolute;
    inset: 0;
    display: block;

    &::before {
      content: "";
      position: absolute;
      top: -3.5px;
      left: 80%;
      width: 10px;
      height: 6px;
      background: #27282c;
      border: 2px solid #048bfa;
      transform: translateX(-50%);
      transition: 0.5s;
    }

    &:hover::before {
      width: 6px;
      left: calc(50% - 3px);
      border: 2px solid #048bfa;
      box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c, 10px -10px #048bfa;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -3.5px;
      left: 20%;
      width: 10px;
      height: 6px;
      background: #27282c;
      border: 2px solid #048bfa;
      transform: translateX(-50%);
      transition: 0.5s;
    }

    &:hover::after {
      width: 6px;
      left: calc(50% - 3px);
      border: 2px solid #048bfa;
      box-shadow: 70px 0 #fff;
    }
  }
}
//------------------result table----------
.result {
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }

    th {
      font-weight: bold;
      text-align: left;
    }
  }

  .cost-column {
    width: 100px;
  }

  .paid-column {
    width: 100px;
  }

  .tips {
    margin-top: 20px;
  }
}

.tips {
  margin-top: 20px;
  font-weight: bold;

  .tip-amount {
    color: #ff7043;
  }
}
</style>

