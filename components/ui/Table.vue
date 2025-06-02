<!-- components/ui/Table.vue -->
<template>
  <div
    class="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
  >
    <!-- Cabeçalho da tabela com filtros e ações -->
    <div
      v-if="showHeader"
      class="bg-gray-50 px-6 py-3 border-b border-gray-200"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div class="flex items-center space-x-4">
          <!-- Busca -->
          <div v-if="searchable" class="relative">
            <input
              v-model="searchTerm"
              type="text"
              :placeholder="searchPlaceholder"
              class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Filtros -->
          <slot name="filters" />
        </div>

        <!-- Ações -->
        <div class="flex items-center space-x-2">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <!-- Checkbox para seleção múltipla -->
            <th
              v-if="selectable"
              scope="col"
              class="relative w-12 px-6 sm:w-16 sm:px-8"
            >
              <input
                type="checkbox"
                :checked="allSelected"
                :indeterminate="someSelected"
                @change="toggleSelectAll"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6"
              />
            </th>

            <!-- Cabeçalhos das colunas -->
            <th
              v-for="header in headers"
              :key="header.value"
              scope="col"
              :class="[
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                header.sortable ? 'cursor-pointer hover:bg-gray-100' : '',
                header.align === 'center' ? 'text-center' : '',
                header.align === 'right' ? 'text-right' : '',
              ]"
              :style="{ width: header.width }"
              @click="header.sortable && sort(header.value)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ header.text }}</span>
                <template v-if="header.sortable">
                  <svg
                    v-if="sortBy === header.value"
                    :class="[
                      'h-4 w-4',
                      sortOrder === 'asc' ? 'text-gray-900' : 'text-gray-400',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <svg
                    v-if="sortBy === header.value"
                    :class="[
                      'h-4 w-4 -ml-1',
                      sortOrder === 'desc' ? 'text-gray-900' : 'text-gray-400',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <div
                    v-if="sortBy !== header.value"
                    class="w-4 h-4 opacity-0 group-hover:opacity-50"
                  >
                    <svg
                      class="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                </template>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Estado de carregamento -->
          <tr v-if="loading">
            <td :colspan="columnCount" class="px-6 py-12 text-center">
              <div class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
                Carregando...
              </div>
            </td>
          </tr>

          <!-- Estado vazio -->
          <tr v-else-if="paginatedItems.length === 0">
            <td :colspan="columnCount" class="px-6 py-12 text-center">
              <div class="text-gray-500">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p class="mt-2 text-sm">{{ emptyMessage }}</p>
                <slot name="empty-state" />
              </div>
            </td>
          </tr>

          <!-- Linhas de dados -->
          <tr
            v-else
            v-for="(item, index) in paginatedItems"
            :key="getItemKey(item, index)"
            :class="[
              'hover:bg-gray-50 transition-colors duration-150',
              selectedItems.includes(getItemKey(item, index))
                ? 'bg-blue-50'
                : '',
              rowClass ? rowClass(item, index) : '',
            ]"
            @click="handleRowClick(item, index)"
          >
            <!-- Checkbox para seleção -->
            <td v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8">
              <input
                type="checkbox"
                :checked="selectedItems.includes(getItemKey(item, index))"
                @change="toggleItemSelection(getItemKey(item, index))"
                @click.stop
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6"
              />
            </td>

            <!-- Células de dados -->
            <td
              v-for="header in headers"
              :key="header.value"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                header.align === 'center' ? 'text-center' : '',
                header.align === 'right' ? 'text-right' : '',
                getCellClass(header, item),
              ]"
            >
              <slot
                :name="`item.${header.value}`"
                :item="item"
                :index="index"
                :value="getNestedValue(item, header.value)"
              >
                {{
                  formatCellValue(getNestedValue(item, header.value), header)
                }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginação -->
    <div
      v-if="showPagination && !loading"
      class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
    >
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-4 sm:mb-0">
          <p class="text-sm text-gray-700">
            Mostrando
            <span class="font-medium">{{ startItem }}</span>
            a
            <span class="font-medium">{{ endItem }}</span>
            de
            <span class="font-medium">{{ totalItems }}</span>
            resultados
          </p>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Seletor de itens por página -->
          <select
            v-model="itemsPerPage"
            class="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option
              v-for="option in pageSizeOptions"
              :key="option"
              :value="option"
            >
              {{ option }} por página
            </option>
          </select>

          <!-- Navegação da paginação -->
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          >
            <button
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Anterior</span>
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                ]"
                @click="goToPage(page as number)"
              >
                {{ page }}
              </button>
              <span
                v-else
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                ...
              </span>
            </template>

            <button
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Próximo</span>
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { TableHeader } from "~/types/ui";

interface Props {
  headers: TableHeader[];
  items: any[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  showHeader?: boolean;
  showPagination?: boolean;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  emptyMessage?: string;
  rowClass?: (item: any, index: number) => string;
  keyField?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  searchable: false,
  searchPlaceholder: "Buscar...",
  selectable: false,
  showHeader: true,
  showPagination: true,
  itemsPerPageOptions: () => [10, 25, 50, 100],
  defaultItemsPerPage: 10,
  emptyMessage: "Nenhum resultado encontrado",
  keyField: "id",
});

const emit = defineEmits<{
  "row-click": [item: any, index: number];
  "selection-change": [selectedItems: any[]];
  "sort-change": [sortBy: string, sortOrder: "asc" | "desc"];
}>();

// Estado interno
const searchTerm = ref("");
const sortBy = ref("");
const sortOrder = ref<"asc" | "desc">("asc");
const currentPage = ref(1);
const itemsPerPage = ref(props.defaultItemsPerPage);
const selectedItems = ref<(string | number)[]>([]);

// Computed properties
const columnCount = computed(() => {
  let count = props.headers.length;
  if (props.selectable) count++;
  return count;
});

const filteredItems = computed(() => {
  if (!props.searchable || !searchTerm.value) {
    return props.items;
  }

  const search = searchTerm.value.toLowerCase();
  return props.items.filter((item) => {
    return props.headers.some((header) => {
      const value = getNestedValue(item, header.value);
      return String(value).toLowerCase().includes(search);
    });
  });
});

const sortedItems = computed(() => {
  if (!sortBy.value) return filteredItems.value;

  return [...filteredItems.value].sort((a, b) => {
    const aValue = getNestedValue(a, sortBy.value);
    const bValue = getNestedValue(b, sortBy.value);

    let comparison = 0;
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;

    return sortOrder.value === "desc" ? comparison * -1 : comparison;
  });
});

const totalItems = computed(() => sortedItems.value.length);
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);

const paginatedItems = computed(() => {
  if (!props.showPagination) return sortedItems.value;

  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedItems.value.slice(start, end);
});

const startItem = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, totalItems.value);
});

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

const pageSizeOptions = computed(() => props.itemsPerPageOptions);

const allSelected = computed(() => {
  return (
    paginatedItems.value.length > 0 &&
    paginatedItems.value.every((item) =>
      selectedItems.value.includes(getItemKey(item, 0))
    )
  );
});

const someSelected = computed(() => {
  return (
    paginatedItems.value.some((item) =>
      selectedItems.value.includes(getItemKey(item, 0))
    ) && !allSelected.value
  );
});

// Métodos
const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((o, p) => o?.[p], obj);
};

const getItemKey = (item: any, index: number) => {
  return item[props.keyField] ?? index;
};

const formatCellValue = (value: any, header: TableHeader) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (typeof value === "number" && header.value.includes("price")) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  return String(value);
};

const getCellClass = (header: TableHeader, item: any) => {
  const value = getNestedValue(item, header.value);

  if (header.value.includes("status")) {
    if (value === "active" || value === "completed") return "text-green-600";
    if (value === "inactive" || value === "cancelled") return "text-red-600";
    if (value === "pending") return "text-yellow-600";
  }

  return "text-gray-900";
};

const sort = (column: string) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortOrder.value = "asc";
  }

  emit("sort-change", sortBy.value, sortOrder.value);
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleRowClick = (item: any, index: number) => {
  emit("row-click", item, index);
};

const toggleItemSelection = (key: string | number) => {
  const index = selectedItems.value.indexOf(key);
  if (index > -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(key);
  }

  emit("selection-change", getSelectedItems());
};

const toggleSelectAll = () => {
  if (allSelected.value) {
    // Desmarcar todos os itens da página atual
    paginatedItems.value.forEach((item) => {
      const key = getItemKey(item, 0);
      const index = selectedItems.value.indexOf(key);
      if (index > -1) {
        selectedItems.value.splice(index, 1);
      }
    });
  } else {
    // Marcar todos os itens da página atual
    paginatedItems.value.forEach((item) => {
      const key = getItemKey(item, 0);
      if (!selectedItems.value.includes(key)) {
        selectedItems.value.push(key);
      }
    });
  }

  emit("selection-change", getSelectedItems());
};

const getSelectedItems = () => {
  return props.items.filter((item) =>
    selectedItems.value.includes(getItemKey(item, 0))
  );
};

// Watchers
watch([searchTerm, itemsPerPage], () => {
  currentPage.value = 1;
});

// Expor métodos para o componente pai
defineExpose({
  clearSelection: () => {
    selectedItems.value = [];
    emit("selection-change", []);
  },
  selectAll: () => {
    selectedItems.value = props.items.map((item, index) =>
      getItemKey(item, index)
    );
    emit("selection-change", getSelectedItems());
  },
  getSelectedItems,
});
</script>
