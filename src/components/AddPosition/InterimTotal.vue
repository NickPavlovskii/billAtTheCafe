<template>
    <div class="interim-total">
      <h3>Промежуточный итог:</h3>
      <p class="itog">
        {{ total }} руб. (+ {{ tip }} руб. чаевых)
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InterimTotal',
    props: {
      positions: {
        type: Array,
        required: true,
      },
      defaultTip: {
        type: Number,
        required: true,
      },
    },
    computed: {
      total() {
        return this.positions.reduce((sum, pos) => sum + pos.price, 0)
      },
      tip() {
        const tipPercentage = this.defaultTip/100
        return (this.total * tipPercentage).toFixed(2)
      },
    },
  }
  </script>
  
  <style scoped>
  .interim-total {
    margin-top: 20px;
  }
  .itog {
    font-size: 18px;
    margin-top: 10px;
  }
  </style>
  