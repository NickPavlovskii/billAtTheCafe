<template>
  <div class="bill-list">
    <ul
      v-if="debts.length > 0"
      class="custom-list"
    >
      <li
        v-for="(debt, index) in debts"
        :key="index"
        class="custom-list-item"
      >
        <span class="debt-info">
          <span class="debt-amount">{{ debt.amount }}</span>
          <span class="currency-symbol">&#8381;</span>
        </span>
        <span class="debt-to">
          <template v-if="type === 'who-owes'">
            Пользователь
            <span class="Nikname">{{ debt.to }}</span>
            должен пользователю
            <span class="Nikname">{{ debt.from }}</span>
          </template>
          <template v-else>
            Пользователю
            <span class="Nikname">{{ debt.from }}</span>
            должен пользователь
            <span class="Nikname">{{ debt.to }}</span>
          </template>
        </span>
      </li>
    </ul>
    <div
      v-else
      class="no-debts"
    >
      <p>Никто никому ничего не должен.</p>
      <i class="custom-icon fas fa-thumbs-up"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BillList',
    props: {
      debts: {
        type: Array,
        required: true,
      },
      type: {
        type: String,
        required: true,
        validator: (value) => ['who-owes', 'who-is-owed'].includes(value),
      },
    },
  }
</script>

<style scoped>
  .Nikname {
    color: #048bfa;
    font-weight: bold;
  }

  .bill-list {
    text-align: center;
    border: 1px solid #ccc;
    overflow-y: auto;
    max-height: 200px;
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
