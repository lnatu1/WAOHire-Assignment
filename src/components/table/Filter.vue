<script setup lang="ts">
import { watch } from "vue";
import { useUserStore } from "@stores/userStore";

const userStore = useUserStore();
watch(
  () => userStore.searchQuery,
  (newVal) => {
    if (newVal.trim() === "") {
      userStore.appliedQuery = "";
    }
  },
);
</script>

<template>
  <div>
    <div class="relative flex w-full max-w-md gap-4">
      <span
        class="material-icons-outlined absolute top-1 left-2 !text-2xl text-gray-400"
        >search</span
      >
      <input
        v-model="userStore.searchQuery"
        type="text"
        placeholder="Search..."
        class="w-full rounded-md py-2 pr-4 pl-10 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        @keydown.enter.exact="userStore.applySearch"
      />

      <button
        type="button"
        class="bg-p-1 cursor-pointer rounded-md px-4 py-2 font-medium text-white duration-200 hover:brightness-90"
        @click="userStore.applySearch"
      >
        Search
      </button>
    </div>
  </div>
</template>
