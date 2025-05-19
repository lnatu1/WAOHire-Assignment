<script setup lang="ts">
import { useUserStore } from "@stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <div class="mt-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <label for="pageSize" class="text-sm">Data per page:</label>
      <select
        id="pageSize"
        class="rounded-md border border-gray-300 px-2 py-1 text-sm"
        v-model.number="userStore.pageSize"
        @change="userStore.changePageSize(userStore.pageSize)"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="bg-p-1 block cursor-pointer rounded px-4 py-1 font-medium text-white hover:brightness-90 disabled:cursor-not-allowed disabled:bg-gray-300"
        :disabled="userStore.currentPage === 1"
        @click="userStore.changePage(userStore.currentPage - 1)"
      >
        Prev
      </button>

      <span class="text-sm">
        Page {{ userStore.currentPage }} of {{ userStore.totalPages }}
      </span>

      <button
        class="bg-p-1 block cursor-pointer rounded px-4 py-1 font-medium text-white hover:brightness-90 disabled:cursor-not-allowed disabled:bg-gray-300"
        :disabled="userStore.currentPage === userStore.totalPages"
        @click="userStore.changePage(userStore.currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
