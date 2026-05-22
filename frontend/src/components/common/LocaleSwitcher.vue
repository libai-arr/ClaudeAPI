<template>
  <div class="relative" ref="dropdownRef">
    <button v-if="false"
      @click="toggleDropdown"
      :disabled="switching"
      class="locale-toggle"
      :class="{ 'locale-toggle-open': isOpen }"
      :title="currentLocale?.name"
      :aria-label="currentLocale?.name"
      :aria-expanded="isOpen"
      type="button"
    >
      <span class="locale-toggle-mark" aria-hidden="true">
        <span class="locale-toggle-mark-native">文</span>
        <span class="locale-toggle-mark-latin">A</span>
      </span>
    </button>

    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-dark-700 dark:bg-dark-800"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          :disabled="switching"
          @click="selectLocale(locale.code)"
          class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700"
          :class="{
            'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400':
              locale.code === currentLocaleCode
          }"
        >
          <span class="text-base">{{ locale.flag }}</span>
          <span>{{ locale.name }}</span>
          <Icon v-if="locale.code === currentLocaleCode" name="check" size="sm" class="ml-auto text-primary-500" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { setLocale, availableLocales } from '@/i18n'

const { locale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const switching = ref(false)

const currentLocaleCode = computed(() => locale.value)
const currentLocale = computed(() => availableLocales.find((l) => l.code === locale.value))

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

async function selectLocale(code: string) {
  if (switching.value || code === currentLocaleCode.value) {
    isOpen.value = false
    return
  }
  switching.value = true
  try {
    await setLocale(code)
    isOpen.value = false
  } finally {
    switching.value = false
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.locale-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid rgba(229, 231, 235, 0.95);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #4b5563;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(10px);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.dark .locale-toggle {
  border-color: rgba(71, 85, 105, 0.7);
  background: rgba(15, 23, 42, 0.85);
  color: #e2e8f0;
  box-shadow: 0 4px 14px rgba(2, 6, 23, 0.24);
}

.locale-toggle:hover,
.locale-toggle-open {
  border-color: rgba(20, 184, 166, 0.35);
  color: #0f766e;
  transform: translateY(-1px);
}

.dark .locale-toggle:hover,
.dark .locale-toggle-open {
  border-color: rgba(45, 212, 191, 0.35);
  color: #99f6e4;
}

.locale-toggle:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(20, 184, 166, 0.18),
    0 8px 24px rgba(15, 23, 42, 0.08);
}

.dark .locale-toggle:focus-visible {
  box-shadow:
    0 0 0 3px rgba(45, 212, 191, 0.18),
    0 8px 24px rgba(2, 6, 23, 0.32);
}

.locale-toggle-mark {
  position: relative;
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
}

.locale-toggle-mark-native,
.locale-toggle-mark-latin {
  position: absolute;
  font-weight: 700;
  line-height: 1;
}

.locale-toggle-mark-native {
  left: 0;
  top: 0;
  font-size: 12px;
}

.locale-toggle-mark-latin {
  right: 0;
  bottom: 0;
  font-size: 9px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}
</style>
