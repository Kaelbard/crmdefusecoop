<template>
  <div>
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Overlay de fundo -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="$emit('close')"
        ></div>

        <!-- Centralizar modal -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <!-- Conteúdo do Modal -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
        >
          <!-- Cabeçalho -->
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                {{ title }}
              </h3>
              <button
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                @click="$emit('close')"
              >
                <span class="sr-only">Fechar</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
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
          </div>

          <!-- Corpo -->
          <div class="bg-white px-4 pb-4 sm:px-6 sm:pb-6">
            <slot></slot>
          </div>

          <!-- Rodapé -->
          <div
            v-if="$slots.footer"
            class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) =>
      ["sm", "md", "lg", "xl", "full"].includes(value),
  },
});

// Emits
defineEmits(["close"]);

// Prevenir scroll do body enquanto o modal estiver aberto
onMounted(() => {
  document.body.style.overflow = "hidden";
});

// Restaurar scroll quando o modal for fechado
onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>
