import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import axios from "axios";
const { cookies } = useCookies();
export const useHosoDvcStore = defineStore("hosoDvcStore", {
  state: () => ({}),
  getters: {},
  actions: {},
});
