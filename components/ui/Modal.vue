<template>
  <Transition name="modal">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeOnBackdrop"
    >
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black opacity-30"></div>

        <div
          class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
        >
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              <slot name="header">{{ title }}</slot>
            </h3>
            <button
              @click="$emit('update:modelValue', false)"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Fechar</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="mb-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3">
            <slot name="footer">
              <Button
                variant="secondary"
                @click="$emit('update:modelValue', false)"
              >
                Cancelar
              </Button>
              <Button variant="primary" @click="$emit('confirm')">
                Confirmar
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["update:modelValue", "confirm"]);

const closeOnBackdrop = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("fixed") && props.closeOnClickOutside) {
    emit("update:modelValue", false);
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
