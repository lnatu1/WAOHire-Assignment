<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DashboardNav from "@components/dashboard/MainNav.vue";

const route = useRoute();

const routeTitles: Record<string, string> = {
  Dashboard: "Dashboard",
  Users: "All Users",
};

const pageTitle = computed(() => {
  if (!route.name || typeof route.name !== "string") return "Unnamed Page";

  return (
    routeTitles[route.name] ||
    route.name.charAt(0).toUpperCase() + route.name.slice(1)
  );
});
</script>

<template>
  <div class="h-screen p-4">
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
          <div class="flex h-full flex-col rounded-xl bg-white">
            <h1 class="border-b border-gray-200 p-4 text-2xl font-medium">
              {{ pageTitle }}
            </h1>
            <div class="flex-1 p-4">
              <RouterView />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
