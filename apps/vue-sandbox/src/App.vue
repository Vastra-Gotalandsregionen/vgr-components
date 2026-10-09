<script setup lang="ts">
import { VgrButton } from '@vastra-gotalandsregionen/components-vue'

function onSave() {
  console.log('Klick!')
}
</script>

<template>
  <VgrButton variant="primary" @vgrClick="onSave" text="Spara!" />
</template>
