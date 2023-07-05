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
        Общие чаевые: <span class="tip-amount">{{ calculateTips() }} руб.</span>
      </div>
      <button @click="showModalIfDebtExists" class="p-mt-3 add-button addbtn btnn">
        <span>Кто кому должен</span>
        <i class="i"></i>
      </button>

      <!-- Модальное окно -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Вы еще должны {{ (totalCost - totalPaid).toFixed(2) }} руб.</h3>
          <p>Пожалуйста, введите достаточную сумму, чтобы покрыть все расходы.</p>
          <button @click="showModal = false">Закрыть</button>
        </div>
      </div>

    </div>
    <div v-else>
  <bill-list :currentTab="currentTab" :debts="debts"></bill-list>
</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BillList from "./BillList.vue";
export default {
  components:{ 
    BillList
  },
  computed: {
    ...mapState(['people', 'positions']),
    // Calculate the total cost of all positions
    totalCost() {
      return Object.values(this.personCosts).reduce((sum, cost) => sum + cost, 0);
    },
    // Calculate the total amount paid by all people
    totalPaid() {
      return Object.values(this.personPaid).reduce((sum, paid) => sum + parseFloat(paid || 0), 0);
    },
    // Calculate the total cost per person
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
    // Calculate the debts between people
    debts() {
      return this.calculateDebts();
    },
  },
  data() {
    return {
      currentTab: 'who-owes',
      personPaid: {}, // Object to store the amount paid by each person
      currentScreen: 'result',
      showModal: false,
    };
  },
 
 
  methods: {
    ...mapMutations(['setCurrentScreen', 'setShowModal']),
    changeTab(tab) {
      this.currentTab = tab;
    },
    setCurrentScreen(screen) {
    this.currentScreen = screen;
  },
    changeScreen(screen) {
  this.setCurrentScreen(screen);
},


         // Show the modal if there are outstanding debts
         showModalIfDebtExists() {
    if (this.totalCost > this.totalPaid) {
      this.showModal = true;
    } else {
      this.changeScreen('bill-list');
    }
  },
    done() {
      // Emit event with personPaid data
      this.$emit('done', this.personPaid);
    },
 // Calculate the total tips based on the total amount paid
    calculateTips() {
      let totalPaid = 0;
      for (const personId in this.personPaid) {
        totalPaid += parseFloat(this.personPaid[personId]);
      }
      return totalPaid * 0.1; // Assuming 10% tips
    },
// Calculate the debts between people
    calculateDebts() {
      const debts = {
        whoOwes: [],
        whoIsOwed: [],
      };

      for (const person of this.people) {
        const cost = this.personCosts[person.id];
        const paid = this.personPaid[person.id] || 0;
        let diff = paid - cost;

        if (diff > 0) {  // If the person has paid more than their cost
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
        } else if (diff < 0) { // If the person has paid less than their cost
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


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.modal h3 {
  margin-top: 0;
}

.modal p {
  margin-bottom: 10px;
}

.modal button {
  padding: 8px 16px;
  background-color: #007bff;
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
}

.btnn:hover {
  color: #fff;
  background: #048bfa;
  letter-spacing: 0.25em;
  transition: 0.5s;
}

.btnn:hover span i {
  color: #fff;
  letter-spacing: 0.25em;
  transition: 0.5s;
}

.btnn::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #27282c;
}

.btnn span {
  position: relative;
  z-index: 1;
}

.btnn .i {
  position: absolute;
  inset: 0;
  display: block;
}

.btnn .i::before {
  content: "";
  position: absolute;
  top: -3.5px;
  left: 80%;
  width: 10px;
  height: 6px;
  background: #27282c;
  border: 2px solid #048bfa;
  transform: translateX(-50%);
  transition: 0.5s, box-shadow 0.5s;
}

.btnn:hover .i::before {
  width: 6px;
  left: calc(50% - 3px);
  border: 2px solid #048bfa;
  box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c, 10px -10px #048bfa  ;
}
.btnn .i::after {
  content: "";
  position: absolute;
  bottom: -3.5px;
  left: 20%;
  width: 10px;
  height: 6px;
  background: #27282c;
  border: 2px solid #048bfa;
  transform: translateX(-50%);
  transition: 0.5s, box-shadow 0.5s;
}


.btnn:hover .i::after {
  width: 6px;
  left: calc(50% - 3px);
  border: 2px solid #048bfa;
  box-shadow: 70px 0 #fff  ;
}
.result {
  text-align: center;
}

.result h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.result table {
  width: 100%;
  border-collapse: collapse;
}

.result th,
.result td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.result th {
  font-weight: bold;
  text-align: left;
}

.cost-column {
  width: 100px;
}

.paid-column {
  width: 100px;
}

.input-number {
  width: 100%;
}

.tips {
  margin-top: 20px;
}



.result {
  text-align: center;
}

.result h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.result table {
  width: 100%;
  border-collapse: collapse;
}

.result th,
.result td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.result th {
  font-weight: bold;
  text-align: left;
}




.input-number {
    

    border-radius: 15px;
}



.tips {
  margin-top: 20px;
  font-weight: bold;
}

.tip-amount {
  color: #ff7043;
}

</style>

