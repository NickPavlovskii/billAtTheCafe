import { createStore } from 'vuex';

export default createStore({
  modules: {
    bill: {
      namespaced: true,
      state: {
        debts: {
          whoOwes: [],
          whoIsOwed: [],
        },
      },
      mutations: {
        setDebts(state, debts) {
          state.debts = debts;
        },
      },
      actions: {
        updateDebts({ commit }, debts) {
          commit('setDebts', debts);
        },
      },
      getters: {
        getDebts(state) {
          return state.debts;
        },
      },
    },
  },
  state: {
    currentScreen: 'main-component',
    people: [],
    positions: [],
    showModal: false,
    showPositionModal: false,
    showModalMain: false,
    personPaid: {}, 
  },
  mutations: {
    setCurrentScreen(state, screen) {
      state.currentScreen = screen;
    },
    setPeople(state, people) {
      state.people = people;
    },
    setPositions(state, positions) {
      state.positions = positions;
    },
 
    addPerson(state, person) {
      state.people.push(person);
    },
    deletePerson(state, person) {
      const index = state.people.findIndex((p) => p.id === person.id);
      if (index !== -1) {
        state.people.splice(index, 1);
      }
    },
    removePosition(state, index) {
      state.positions.splice(index, 1);
    },
    setPersonPaid(state, { personId, amount }) { 
      state.personPaid[personId] = amount;
    },
  },
});
