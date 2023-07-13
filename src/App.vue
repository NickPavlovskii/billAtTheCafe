<template>
  <div class="cont">
    <!-- Home icon -->
    <i class="pi pi-home app-icon app-icons app-icons-home" @click="navigateToHome"></i>

    <!-- Share component -->
    <my-share class="share-container" />

    <h1 class="app-title">Cafe Bill Splitter</h1>

    <!-- Router View -->
    <router-view></router-view>

    <div class="niklad-tag">@Niklad</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MyShare from "./components/MyShare";

export default {
  components: {
    MyShare,

  },
  methods: {
    ...mapMutations(['setCurrentScreen', 'setPeople', 'setPositions', 'setShowModal', 'setShowPositionModal', 'setShowModalMain']),

    navigateToHome() {
      this.setCurrentScreen('main-component');
    },
  },
  computed: {
    ...mapState(['currentScreen', 'people', 'positions', 'showModal', 'showPositionModal', 'showModalMain']),
  },
};
</script>

<style lang="scss"  scoped>

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');


.cont {
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border: 1px solid #ccc;
  max-width: 400px;
  text-align: center;


  .app-title {
    font-family: 'Indie Flower', cursive;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: #333;

  }
}



.instruction-button {
  background-color: #27282c;
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;

  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 5;
}



.niklad-tag {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0px 2px;
  font-size: 14px;

}

.share-container {
  position: absolute;
  top: 15px;
  right: 15px;
}

.app-icons {
  margin-left: 12px;
  position: relative;
  right: 130px;
  margin-top: 12px;
}

.app-icon {
  position: relative;
  bottom: 5px;
  font-size: 22px;
  transition: 1.25s;
  cursor: pointer;
}

.app-icons-home {
  position: relative;

  font-size: 1.5em;
}

.app-icon:hover {
  color: #048bfa;
}

//---------------------- result-button-----------------------------




//  <!-- Add persons screen -->

</style>


<style lang="scss" >

.btns{
  margin-top: 120px;
 }
.result-button {
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
  
  
    &:hover {
      color: #fff;
      background: #048bfa;
      letter-spacing: 0.25em;
      transition: 0.5s;
  
      .i::before {
        width: 6px;
        left: calc(50% - 3px);
        border: 2px solid #048bfa;
        box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c, 10px -10px #048bfa;
      }
  
  
      .i::after {
        width: 6px;
        left: calc(50% - 3px);
        border: 2px solid #048bfa;
        box-shadow: 70px 0 #fff;
      }
  
      .button-text .pi-chevron-right {
        color: #fff;
        letter-spacing: 0.25em;
        transition: 0.5s;
      }
    }
  
    &::before {
      content: "";
      position: absolute;
      inset: 2px;
      background: #27282c;
    }
  
  
    .button-text {
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
        transition: 0.5s, box-shadow 0.5s;
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
        transition: 0.5s, box-shadow 0.5s;
      }
  
  
  
    }
  
  }
</style>


