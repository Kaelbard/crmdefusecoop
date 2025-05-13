<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
// O componente Card é um container reutilizável que aceita slots para header, conteúdo principal e footer
</script>