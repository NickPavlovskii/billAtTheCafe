<template>
  <div class="result">
    <h2>Результат</h2>
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
          <td class="cost-column">{{ personCosts[person.id] }} руб.</td>
          <td>
            <InputNumber class="input-number" v-model="personPaid[person.id]" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="tips">
      Общие чаевые: <span class="tip-amount">{{ calculateTips() }} руб.</span>
    </div>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber';

export default {
  components: {
    InputNumber,
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

    calculateTips() {
      let totalPaid = 0;
      for (const personId in this.personPaid) {
        totalPaid += parseFloat(this.personPaid[personId]);
      }
      return totalPaid * 0.1; // Assuming 10% tips
    }


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
