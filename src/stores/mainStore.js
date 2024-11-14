import {defineStore} from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    name: 'Pinia Store'
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    setName(newName) {
      this.name = newName
    }
  }
})
