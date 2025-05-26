<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      v-model="selectedValue"
      :required="required"
      :disabled="disabled"
      :class="[
        'px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-300' : 'border-gray-300',
      ]"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option v-if="placeholder" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const props = defineProps<{
  modelValue: string | number;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "change", value: string | number): void;
  (e: "blur"): void;
}>();

const selectedValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);

const handleChange = () => {
  emit("update:modelValue", selectedValue.value);
  emit("change", selectedValue.value);
};

const handleBlur = () => {
  emit("blur");
};
</script>
