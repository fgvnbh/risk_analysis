<template>
  <div>
    <Accordion :activeIndex="0" :key="updateAccordion">
      <AccordionTab v-for="(diagnose, diagnoseName) in store.getData" :key="diagnoseName" :header="diagnoseName">
        <i class="pi pi-times" style="position:absolute; right:10px; top: -32px;" @click="deleteDiagnosis(diagnoseName)"></i>
        <Accordion :activeIndex="0" :key="updateKey">
          <AccordionTab v-for="(group, key) in diagnose" :key="key" :header="key">
            <SingleGroupSettings :group="group" :group-name="key" :diagnose-name="diagnoseName"
                                 @update="updateComponent"/>
          </AccordionTab>
        </Accordion>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import {useData} from "@/store/data";
import SingleGroupSettings from "./SingleGroupSettings.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
import router from "@/router";

const store = useData();

const route = useRoute();

const updateKey = ref(0);

const updateAccordion = ref(0);
const updateComponent = () => {
  updateKey.value += 1;
}

const deleteDiagnosis = (diagnoseName) => {
  store.deleteDiagnose(diagnoseName);
  updateAccordion.value += 1;
}

const emits = defineEmits(['updateComponent']);
</script>

<style scoped>
.cancelButton {

}
</style>