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
              <div data-v-4b44cc4c="" class="col-12 mb-2 lg:col-4 lg:mb-0">
                <input data-v-4b44cc4c="" class="p-inputtext p-component" type="number" v-model="personPaid[person.id]">
              </div>
              <!-- <InputNumber class="input-number my-input" v-model="personPaid[person.id]" /> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="tips">
        Общие чаевые: <span class="tip-amount">{{ calculateTips() }} руб.</span>
      </div>
      <button @click="currentScreen = 'bill-list'" class="p-mt-3 add-button addbtn btnn">
        <span>Кто кому должен</span>
        <i class="i"></i>
      </button>
    </div>
    <div v-else>
      <BillList :debts="debts" />
    </div>
  </div>
</template>

<script>
// import InputNumber from 'primevue/inputnumber';
import BillList from './BillList.vue';

export default {
  components: {
    // InputNumber,
    BillList,
  },
  props: {
    positions: {
      type: Array,
      required: true,
    },
    people: {
      type: Array,
      required: true,
    },
  },
  computed: {
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
    debts() {
      return this.calculateDebts();
    },
  },
  data() {
    return {
      personPaid: {},
      currentScreen: 'result',
    };
  },
  methods: {
    done() {
      // Emit event with personPaid data
      this.$emit('done', this.personPaid);
    },

    calculateTips() {
      let totalPaid = 0;
      for (const personId in this.personPaid) {
        totalPaid += parseFloat(this.personPaid[personId]);
      }
      return totalPaid * 0.1; // Assuming 10% tips
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
};
</script>








<style scoped>
.p-inputtext {
  width: 150px; /* Измените значение, чтобы установить желаемую ширину */
  border-radius: 10px; /* Измените значение, чтобы установить желаемую закругленность */
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

.bill-owe {
  margin-top: 40px;
}

.bill-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.bill-tabs button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #f2f2f2;
  cursor: pointer;
}

.bill-tabs button.active {
  background-color: #ddd;
}

.bill-list {
  margin-top: 10px;
}

.bill-list h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.bill-list ul {
  list-style-type: none;
  padding-left: 0;
}

.bill-list li {
  margin-bottom: 5px;
}
</style>


<style scoped>
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


<!-- 

<template>
  <div class="result">
    <h2>Result</h2>
    <div class="table-container">
      <DataTable :value="people" class="fixed-table">
        <Column field="name" header="Name"></Column>
        <Column :field="formatCostColumn" header="Cost"></Column>
        <Column field="id" header="Paid" class="paid-column">

          <InputNumber type="number" v-model="personPaid[person.id]" />
         
        </Column>
      </DataTable>
    </div>
    <div class="tips">
      Tips: <span class="tip-amount">{{ calculateTips() }} руб.</span>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';

export default {
  components: {
    DataTable,
    Column,
    InputNumber
  },
  props: {
    positions: {
      type: Array,
      required: true
    },
    people: {
      type: Array,
      required: true
    }
  },
  computed: {
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
    }
  },
  data() {
    return {
      personPaid: {}
    };
  },
  methods: {
    done() {
      // Emit event with personPaid data
      this.$emit('done', this.personPaid);
    },
    formatCostColumn(rowData) {
      const cost = this.personCosts[rowData.id];
      return `${cost} руб.`;
    },
    
  }
};
</script>

<style scoped>
.result {
  text-align: center;
}

.result h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.fixed-table {
  min-width: 300px;
  width: max-content;
}

.result input[type="number"] {
  width: 80px;
}

.tips {
  margin-top: 20px;
  font-weight: bold;
}

.tip-amount {
  color: #ff7043;
}

.paid-column {
  width: 120px;
}

.paid-input {
  width: 100px;
}
</style> -->
