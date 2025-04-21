<template>
  <component
    :is="as"
    :type="type"
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      variantStyles,
      sizeStyles,
      rounded ? 'rounded-full' : 'rounded-md',
      fullWidth ? 'w-full' : '',
      isLoading ? 'opacity-70 pointer-events-none' : '',
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      classes,
    ]"
    :disabled="disabled || isLoading"
    v-bind="$attrs"
  >
    <span v-if="isLoading" class="mr-2">
      <svg
        class="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <span v-if="icon && iconPosition === 'left'" class="mr-2">
      <slot name="icon" />
    </span>

    <slot />

    <span v-if="icon && iconPosition === 'right'" class="ml-2">
      <slot name="icon" />
    </span>
  </component>
</template>

<script setup lang="ts">
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonIconPosition = "left" | "right";

// Definição das props do componente
const props = defineProps({
  as: {
    type: String,
    default: "button",
  },
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String as () => ButtonVariant,
    default: "primary",
  },
  size: {
    type: String as () => ButtonSize,
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String as () => ButtonIconPosition,
    default: "left",
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
});

// Estilos de variantes
const variantStyles = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500";
    case "secondary":
      return "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-500";
    case "outline":
      return "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500";
    case "ghost":
      return "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500";
    case "danger":
      return "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500";
    case "success":
      return "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500";
    case "warning":
      return "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500";
    default:
      return "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500";
  }
});

// Estilos de tamanho
const sizeStyles = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-xs h-8 px-3";
    case "md":
      return "text-sm h-10 px-4";
    case "lg":
      return "text-base h-12 px-6";
    case "xl":
      return "text-lg h-14 px-8";
    default:
      return "text-sm h-10 px-4";
  }
});
</script>
