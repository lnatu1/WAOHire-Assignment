<script setup lang="ts">
import DashboardNav from "@components/dashboard/MainNav.vue";
</script>

<template>
  <div class="h-screen overflow-y-auto bg-[#faf5f5] p-4">
    <div class="grid h-full grid-cols-12 gap-4">
      <aside class="col-span-2">
        <div class="h-full">
          <div class="h-full rounded-xl bg-white p-4">
            <DashboardNav />
          </div>
        </div>
      </aside>
      <main class="col-span-10">
        <div class="h-full">
          <div class="h-full rounded-xl bg-white p-4"><RouterView /></div>
        </div>
      </main>
    </div>
  </div>
</template>
