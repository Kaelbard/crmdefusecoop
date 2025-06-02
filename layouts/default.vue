<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <main class="flex-1 overflow-x-hidden">
        <slot />
      </main>
    </div>
    <Footer />

    <!-- Notificações -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="{
          'bg-green-100 border-green-500 text-green-700':
            notification.type === 'success',
          'bg-red-100 border-red-500 text-red-700':
            notification.type === 'error',
          'bg-yellow-100 border-yellow-500 text-yellow-700':
            notification.type === 'warning',
          'bg-blue-100 border-blue-500 text-blue-700':
            notification.type === 'info',
        }"
        class="max-w-sm p-4 border-l-4 rounded shadow-lg"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium">{{ notification.title }}</h4>
            <p class="text-sm mt-1">{{ notification.message }}</p>
          </div>
          <button
            @click="removeNotification(notification.id)"
            class="ml-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUiStore } from "~/stores/ui";
import Navbar from "~/components/layout/Navbar.vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import Footer from "~/components/layout/Footer.vue";

const uiStore = useUiStore();
const { notifications } = storeToRefs(uiStore);

const removeNotification = (id: string) => {
  uiStore.removeNotification(id);
};
</script>
