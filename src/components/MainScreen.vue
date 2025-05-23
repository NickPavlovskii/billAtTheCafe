<template>
  <div class="main-screen">
    <h1>Добро пожаловать в Cafe Bill Splitter</h1>
    <div class="btns">
      <base-btn
        text="Начать"
        rightIcon="./icons/arrow.svg"
        @click="$emit('start')"
      />
      <icon-btn
        class="instruction-button"
        icon="fluent-mdl2:hint-text"
        iconColor="yellow"
        backgroundColor="#048bfa"
        aria-label="Показать инструкцию"
        @click="showModal = true"
      />
    </div>

    <Dialog
      v-model:visible="showModal"
      header=""
      footer=""
      @click.self="showModal = false"
    >
      <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <h3>
            <Icon
              icon="fluent-mdl2:hint-text"
              style="margin-bottom: -3px"
            />
            Инструкция
          </h3>
        </div>
      </template>
      <div
        class="flex items-start gap-4 mb-6 bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <ol
          class="list-decimal list-inside text-gray-800 text-base leading-relaxed space-y-2"
        >
          <li>
            <strong>Шаг 1:</strong>
            Добавьте участников счета
          </li>
          <li>
            <strong>Шаг 2:</strong>
            Укажите позиции
          </li>
          <li>
            <strong>Шаг 3:</strong>
            Получите результат
          </li>
        </ol>
      </div>

      <template #footer>
        <Button
          label="Закрыть"
          text
          severity="secondary"
          autofocus
          style="margin-top: 20px"
          @click="showModal = false"
        />
      </template>
    </Dialog>
    <img
      src="cofe.png"
      class="background-image"
      alt="coffee image"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  const showModal = ref(false)
</script>

<style scoped>
  .main-screen {
    text-align: center;
    padding: 20px;
    position: relative;
    max-width: 400px;
    margin: 0 auto;
  }

  .btns {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;
  }
  .start-button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .btnn {
    margin-top: 30px;
    position: relative;
    color: rgba(255, 255, 255, 0.616);
    background: #444;
    font-size: 1em;
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
    content: '';
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
    content: '';
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
    box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c,
      10px -10px #048bfa;
  }
  .btnn .i::after {
    content: '';
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
    box-shadow: 70px 0 #fff;
  }

  .background-image {
    z-index: -10;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 180px;
    height: 180px;
    opacity: 0.15;
    user-select: none;
    pointer-events: none;
  }
  .instruction-button {
    margin-top: 15px;
  }
  @media (max-width: 600px) {
    .main-screen h1 {
      font-size: 20px;
    }
    .btns {
      flex-direction: column;
      gap: 12px;
    }
    .btnn {
      width: 100%;
    }
    .instruction-button {
      margin-top: -15px;
      align-self: center;
    }
    .background-image {
      width: 100px;
      height: 100px;
    }
  }
</style>
