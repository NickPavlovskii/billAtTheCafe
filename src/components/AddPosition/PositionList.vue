<template>
    <div>
      <h3 class="title">Список позиций:</h3>
      <ul class="position-list">
        <li
          v-for="(position, index) in positions"
          :key="index"
          class="position-item"
        >
          <div class="position-info">
            <span class="position-name">{{ position.name }}</span>
            <span class="position-price">{{ position.price }} руб.</span>
            <div class="avatars-container">
              <Avatar
                v-for="(person, personIndex) in position.people"
                :key="personIndex"
                :label="person.name[0]"
                :style="{ backgroundColor: getAvatarColor(personIndex) }"
                :class="['avatar', 'ava', { 'avatar-active': person.checked }]"
                size="small"
                shape="circle"
              />
            </div>
          </div>
          <button
            class="remove-button"
            @click="$emit('remove-position', index)"
          >
            <i class="pi pi-trash"></i>
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Avatar from 'primevue/avatar'
  
  export default {
    name: 'PositionList',
    components: {
      Avatar,
    },
    props: {
      positions: Array,
    },
    methods: {
      getAvatarColor(index) {
        const colors = ['#048bfa', '#ff6b6b', '#67d17e', '#f4b942', '#7c49b3']
        return colors[index % colors.length]
      },
    },
  }
  </script>
  
  <style scoped>
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .position-list {
    list-style: none;
    padding-left: 0;
  }
  .position-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .position-name {
    font-weight: bold;
    margin-right: 8px;
  }
  .position-price {
    color: #888;
  }
  .avatars-container {
    display: flex;
    margin-top: 10px;
  }
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: #f2f2f2;
  }
  .avatar-active {
    background-color: #048bfa;
    border: 2px solid white;
    color: white;
  }
  .remove-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .remove-button i {
    font-size: 1.3rem;
    color: black;
  }
  </style>
  