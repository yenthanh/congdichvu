<script setup>
import { ref, onMounted, computed, watch } from "vue";
const props = defineProps({
  pageInput: {
    type: Number,
    default: 0,
  },
  pageCount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  showTong: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["changePage"]);
const currentPage = ref(0);
const currentPagePagination = ref(1);
const listPage = ref([]);

const prevPage = function () {
  currentPage.value -= 1;
  currentPagePagination.value = currentPage.value;
};
const nextPage = function () {
  currentPage.value += 1;
  currentPagePagination.value = currentPage.value;
};
const firstPage = function () {
  currentPage.value = 1;
  currentPagePagination.value = currentPage.value;
};
const lastPage = function () {
  currentPage.value = props.pageCount;
  currentPagePagination.value = currentPage.value;
};

watch(
  () => props.pageCount,
  (newPageCount) => {
    let items = [];
    for (let i = 1; i <= newPageCount; i++) {
      let item = {
        name: "Trang" + " " + i,
        value: i,
      };
      items.push(item);
    }
    listPage.value = items;
  },
  { immediate: true }
);

watch(
  () => props.pageInput,
  (newPageCount) => {
    currentPage.value = newPageCount;
    currentPagePagination.value = newPageCount;
  },
  { immediate: true }
);

watch(currentPagePagination, async (newPagePagination, oldPagePagination) => {
  currentPage.value = newPagePagination;
  emit("changePage", currentPage);
});
</script>

<template>
  <v-row class="my-0 mx-0" style="align-items: center">
    <v-col class="flex py-0" style="max-width: 150px">
      <span style="color: var(--main-color); font-weight: 700">Tổng số:</span
      >&nbsp;
      <span style="color: var(--main-color); font-weight: 700">{{
        props.total
      }}</span>
    </v-col>

    <v-col class="py-0">
      <div class="flex text-center">
        <nav
          role="navigation"
          aria-label="Pagination Navigation"
          style="position: initial"
        >
          <ul class="v-pagination theme--light">
            <li>
              <button
                @click="firstPage"
                type="button"
                aria-label="Previous page"
                style="width: 32px; height: 32px"
                :class="
                  currentPage == 1
                    ? 'mx-0 v-pagination__navigation v-pagination__navigation--disabled'
                    : 'mx-0 v-pagination__navigation'
                "
              >
                <i
                  aria-hidden="true"
                  class="v-icon notranslate mdi mdi-chevron-double-left theme--light"
                ></i>
              </button>
            </li>
            <li>
              <button
                @click="prevPage"
                type="button"
                aria-label="Previous page"
                style="width: 32px; height: 32px"
                :class="
                  currentPage == 1
                    ? 'v-pagination__navigation v-pagination__navigation--disabled'
                    : 'v-pagination__navigation'
                "
              >
                <i
                  aria-hidden="true"
                  class="v-icon notranslate mdi mdi-chevron-left theme--light"
                ></i>
              </button>
            </li>
            <li>
              <button
                style="background: #fff"
                type="button"
                aria-current="true"
                class="px-2 v-pagination__item v-pagination__item--active primary"
              >
                {{ currentPage }} / {{ props.pageCount }}
              </button>
            </li>
            <li>
              <button
                @click="nextPage"
                type="button"
                aria-label="Next page"
                style="width: 32px; height: 32px"
                :class="
                  currentPage == props.pageCount
                    ? 'v-pagination__navigation v-pagination__navigation--disabled'
                    : 'v-pagination__navigation'
                "
              >
                <i
                  aria-hidden="true"
                  class="v-icon notranslate mdi mdi-chevron-right theme--light"
                ></i>
              </button>
            </li>
            <li>
              <button
                @click="lastPage"
                type="button"
                aria-label="Next page"
                style="width: 32px; height: 32px"
                :class="
                  currentPage == props.pageCount
                    ? 'mx-0 v-pagination__navigation v-pagination__navigation--disabled'
                    : 'mx-0 v-pagination__navigation'
                "
              >
                <i
                  aria-hidden="true"
                  class="v-icon notranslate mdi mdi-chevron-double-right theme--light"
                ></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </v-col>
    <v-col class="py-1" style="max-width: 150px">
      <v-autocomplete
        class="input-form"
        hide-no-data
        :items="listPage"
        v-model="currentPagePagination"
        item-title="name"
        item-value="value"
        dense
        outlined
        hide-details="auto"
        style=""
      >
      </v-autocomplete>
    </v-col>
  </v-row>
</template>

<style></style>
