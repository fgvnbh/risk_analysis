<template>
  <div class="attributeWrapper">
    <span class="p-float-label margin">
      <InputText id="username" type="text" v-model="readableName"/>
      <label for="username">Name of criteria</label>
    </span>
    <span class="p-float-label margin">
      <InputText id="username" type="number" v-model="weight"/>
      <label for="username">Weight</label>
    </span>
    <span class="p-float-label margin">
      <Dropdown v-model="selectedFunc" :options="funcs" optionLabel="name" option-value="name"/>
      <label for="username">Function</label>
    </span>
    <span class="p-float-label margin">
      <InputText v-for="i in funcsInputLength[selectedFunc]" :id="i" type="number" class="marginRight"
                 v-model="funcValues[i-1]"/>
      <label for="username">Function inputs</label>
    </span>
    <Button label="Save" icon="pi pi-check" class="saveButton" @click="saveChanged"/>
    <Button label="Delete" icon="pi pi-times" class="cancelButton p-button-danger" @click="deleteAttribute" />
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import {onMounted, ref, watch} from "vue";
import {mathFuncs, funcsInputLength} from "@/helpers/mathFormulas";
import Button from "primevue/button";
import {useData} from "@/store/data";

const props = defineProps({
  attribute: {
    type: Object,
    required: true
  },

  attributeName: {
    type: String,
    required: true
  },

  groupName: {
    type: String,
    required: true
  },

  diagnoseName: {
    type: String,
    required: true
  }
})

const selectedFunc = ref(props.attribute.type);
const weight = ref(props.attribute.weight);
const readableName = ref(props.attributeName);
const funcValues = ref(props.attribute.data);
const funcs = ref(Object.keys(mathFuncs).map((item) => ({name: item})));

const useDataStore = useData();

const saveChanged = () => {
  useDataStore.updateAttribute({
    [readableName.value]: {
      data: funcValues.value.map((item)=>parseFloat(item)),
      type: selectedFunc.value,
      weight: parseFloat(weight.value)
    }
  }, props.attributeName, props.diagnoseName, props.groupName);
};

const deleteAttribute = () => {
  useDataStore.deleteAttribute(props.attributeName, props.diagnoseName, props.groupName);
}

watch(()=>selectedFunc.value,()=>{
  funcValues.value = Array.from({ length: funcsInputLength[selectedFunc.value] });
})

</script>

<style scoped>
.margin {
  margin-top: 25px;
  margin-right: 20px;
}

.marginRight {
  margin-right: 20px;
}

.attributeWrapper {
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-top: 10px;
  padding: 5px;
  position: relative;
}

.saveButton {
  margin-top: 20px;
}

.cancelButton {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>