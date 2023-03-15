<template>
  <div class="content">
    <Accordion :activeIndex="0">
      <AccordionTab v-for="(group, key) in data[route.params.id]" :key="key" :header="key" >
        <SingleSetComponent :group="group" :group-name="key" @calculated-value="getValue"/>
      </AccordionTab>
    </Accordion>
    <Button label="Continue" icon="pi pi-check" class="saveButton" @click="router.push('/calculate/continue')" :disabled="Object.keys(values).length !== Object.keys(data[route.params.id]).length"/>
  </div>
</template>

<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import SingleSetComponent from "../singleSet/SingleSetComponent.vue";
import {useData} from "@/store/data";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import Button from "primevue/button";

const data = useData().data;
const route = useRoute();
const values = ref({});
const useDataStore = useData();
const router = useRouter();
const getValue = (value) => {
  values.value = {...values.value, ...value};
  if(Object.keys(values.value).length === Object.keys(data[route.params.id]).length){
    useDataStore.setCalculated(values.value);
  }
}
</script>

<style scoped>
.saveButton {
  margin-top: 20px;
}

.p-accordion-content {
  background-color:var(--blue-500);
}
</style>