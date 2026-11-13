<script setup lang="ts">
import {
  VgrButton,
  VgrHelpIconAndText,
  VgrIcon,
  VgrTextField,
} from '@vastra-gotalandsregionen/components-vue'

const plusIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>'

const longInfo = {
  title: 'Regionövergripande dokument',
  text: 'Inkluderar övergripande dokument som gäller för alla verksamheter och förvaltningar i Västra Götalandsregionen. Det innefattar bland annat regionala medicinska riktlinjer och rutiner, men också andra styrande dokument som gäller övergripande för hela Västra Götalandsregionen.',
}

function showAlert(message: string) {
  alert(message)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 16px">
    <h2>Button</h2>
    <div style="display: flex; gap: 12px">
      <VgrButton variant="primary" text="Spara" @vgrClick="showAlert('Vue: Spara')" />
      <VgrButton
        variant="secondary"
        text="Avbryt"
        :icon="plusIcon"
        @vgrClick="showAlert('Vue: Avbryt')"
      />
    </div>

    <h2>Icon</h2>
    <VgrIcon :icon="plusIcon" />

    <h2>Help icon and text</h2>
    <VgrHelpIconAndText :info="{ text: 'Hejhej min text' }" />

    <h2>Text field</h2>
    <VgrTextField label="Namn" helpText="Skriv ditt namn" />
    <VgrTextField label="Titel" error="Titel får inte vara tom" :required="true" />
    <VgrTextField label="Dokumenttyp" :optional="true" :info="longInfo" />
    <VgrTextField type="textarea" label="Adress" :disabled="true" />
  </div>
</template>
