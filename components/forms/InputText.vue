<template>
  <div>
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative rounded-md">
      <!-- Ícone à esquerda (se houver) -->
      <div
        v-if="$slots.leftIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="leftIcon" />
      </div>

      <!-- Input -->
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :required="required"
        :class="[
          'block w-full rounded-md sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          error
            ? 'border-red-300 text-red-900 placeholder-red-300'
            : 'border-gray-300',
          disabled
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-white',
          readonly === true ? 'bg-gray-50 cursor-default' : '',
          $slots.leftIcon ? 'pl-10' : '',
          $slots.rightIcon ? 'pr-10' : '',
          size === 'sm'
            ? 'py-1.5 text-xs'
            : size === 'lg'
            ? 'py-3 text-base'
            : 'py-2 text-sm',
          classes,
        ]"
        v-bind="$attrs"
      />

      <!-- Ícone à direita (se houver) -->
      <div
        v-if="$slots.rightIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <slot name="rightIcon" />
      </div>
    </div>

    <!-- Mensagem de erro -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

    <!-- Descrição do campo -->
    <p v-else-if="description" class="mt-1 text-xs text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Definição das props do componente
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  classes: {
    type: String,
    default: "",
  },
});

// Eventos emitidos pelo componente
const emit = defineEmits(["update:modelValue", "focus", "blur", "change"]);
</script>
