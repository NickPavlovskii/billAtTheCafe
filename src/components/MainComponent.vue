<template>
 <div  style="height: 300px; z-index: 2;">
      <h1>Добро пожаловать в Cafe Bill Splitter</h1>
      <div class="btns">
           <!-- Button to navigate to adding persons screen -->
    

  </div>
  <!-- Modal for main instructions -->
    
       <!-- Background image -->
    <img src="cofe.png" class="background-image" />
    </div>
</template>

<script>

export default {
  components: {
   
 
  

  },
  data() {
    return {
      showModal: false,
      currentScreen: '', // Add the currentScreen variable here
      showModalMain: false, // Flag to control the visibility of the main modal
    };
  },
  methods: {
    goToNextScreen(nextScreen) {
        this.$router.push(nextScreen);
      },
    navigateToPersons() {
    this.currentScreen = 'add-persons';
  },

    // Method to show the instructions modal
    showInstructions() {
      this.showModalMain = true;
    },
     // Method to close the instructions modal
    closeModal() {
      this.showModalMain = false;
    },
  },
};
</script>


<style scoped>
.modal-content {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border: 4px solid #27282c;
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

  .background-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
  z-index: -1;
}
.MainComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

.instruction-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btns{
  margin-top: 120px;
 }
  .MainComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}


button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>