<script setup lang="ts">
import { VgrButton } from '@vgregion/components-vue'

function onSave() {
  console.log('Klick!')
}
</script>

<template>
  <VgrButton variant="primary" @vgrClick="onSave" text="Spara!" />
</template>
