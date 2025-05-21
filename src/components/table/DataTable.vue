<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@stores/userStore';
import Filter from '@/components/table/TableFilter.vue';
import Pagination from '@/components/table/TablePagination.vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<template>
  <Filter />
  <div class="mt-4 overflow-auto rounded-lg border border-gray-200">
    <table class="w-full min-w-max table-auto text-left text-slate-800">
      <thead>
        <tr class="border-b border-slate-300 bg-slate-50 font-bold text-slate-900">
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('name')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Name
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('username')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Username
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('email')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Email
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('phone')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Phone
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('company')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Company
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('website')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Website
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
          <th
            class="cursor-pointer p-4"
            @click="userStore.toggleSort('address')"
          >
            <div class="group flex cursor-pointer items-center gap-2">
              <p class="text-sm leading-none">
                Address
              </p>
              <div class="rotate-90 opacity-0 group-hover:opacity-100">
                <span class="material-icons !text-sm">sync_alt</span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in userStore.paginatedUsers"
          :key="user.id"
          class="border-b border-slate-100 hover:bg-slate-50"
        >
          <td class="p-4">
            <p class="text-sm font-bold">
              {{ user.name }}
            </p>
          </td>
          <td class="p-4">
            <p class="text-sm">
              {{ user.username }}
            </p>
          </td>
          <td class="p-4">
            <p class="text-sm">
              {{ user.email }}
            </p>
          </td>
          <td class="p-4">
            <p class="text-sm">
              {{ user.phone }}
            </p>
          </td>
          <td class="p-4">
            <p class="text-sm">
              {{ user.company.name }}
            </p>
          </td>
          <td class="p-4">
            <p class="text-sm">
              {{ user.website }}
            </p>
          </td>
          <td class="p-4">
            <p class="text-sm">
              {{ user.address.street }} / {{ user.address.city }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>

    <p
      v-if="userStore.paginatedUsers.length === 0"
      class="my-6 text-center font-medium"
    >
      No data found
    </p>
  </div>
  <Pagination />
</template>
