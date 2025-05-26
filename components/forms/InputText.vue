<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      type="text"
      v-model="inputValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="[
        'px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-300' : 'border-gray-300',
      ]"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur"): void;
}>();

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const handleInput = () => {
  emit("update:modelValue", inputValue.value);
};

const handleBlur = () => {
  emit("blur");
};
</script>
