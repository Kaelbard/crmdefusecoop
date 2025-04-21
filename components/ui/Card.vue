<template>
  <div
    :class="[
      'bg-white rounded-lg shadow',
      flat ? 'shadow-none border border-gray-200' : 'shadow',
      hoverable ? 'transition-shadow hover:shadow-md' : '',
      classes,
    ]"
  >
    <!-- Header do Card (opcional) -->
    <div
      v-if="$slots.header || title"
      class="px-6 py-4 border-b border-gray-200"
    >
      <slot name="header">
        <div v-if="title" class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <div v-if="$slots.headerAction">
            <slot name="headerAction" />
          </div>
        </div>
      </slot>
    </div>

    <!-- Corpo do Card -->
    <div :class="['px-6 py-4', contentClass]">
      <slot />
    </div>

    <!-- Footer do Card (opcional) -->
    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Definição das props do componente
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  flat: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
  contentClass: {
    type: String,
    default: "",
  },
});
</script>
