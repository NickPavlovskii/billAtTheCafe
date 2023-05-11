<template>
  <div>
    <!-- Заголовок -->
    <h2>Результаты</h2>

    <!-- Таблица с результатами -->
    <table>
      <thead>
        <tr>
          <th>Персона</th>
          <th>Сумма потраченных денег</th>
        </tr>
      </thead>
      <tbody>
        <!-- Перебор персон -->
        <tr v-for="(person, index) in people" :key="index">
          <td>{{ person.name }}</td>
          <td>{{ calculateTotalCost(person) }}р</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    // Массив позиций
    positions: {
      type: Array,
      required: true,
    },
    // Массив персон
    people: {
      type: Array,
      required: true,
    },
  },
  methods: {
    calculateTotalCost(person) {
      let totalCost = 0;
      for (let position of this.positions) {
        if (position.peopleEaten.includes(person)) {
          totalCost += position.price / position.peopleEaten.length;
        }
      }
      return totalCost;
    },
  },
};
</script>

