<template>
    <div class="menu">
      <div class="toggle" @click="toggleMenu">
        <i class="pi pi-share-alt app-iconn"></i>
      </div>
      <div class="menu-items" :class="{ active: menuActive }">
        <!-- Place your menu items here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuActive: false
      };
    },
    methods: {
      toggleMenu() {
        this.menuActive = !this.menuActive;
      }
    }
  };
  </script>
  
  <style>
  .menu {
    position: relative;
    display: flex;
  }
  
  .app-iconn {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  }
  
  .menu-items {
    /* Add your styles for the menu items */
  }
  
  .menu-items.active {
    /* Add your styles for the active menu state */
  }
  </style>
  


