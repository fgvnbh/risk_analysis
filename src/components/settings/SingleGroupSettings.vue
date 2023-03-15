<template>
  <div style="position: relative">
    <span class="p-float-label margin">
      <InputText id="name" type="text" v-model="name"/>
      <label for="name">Group name</label>
    </span>
    <label for="name" class="risk-levels">Risk levels</label>
    <span class="margin riskWrapper">
      <div v-for="i in 4" :key="i" class="inputsWrapper">
        <label class="inputsLabel">{{ riskNames[i-1] }}</label>
        <div>
           <InputText type="text" :value="riskValue[i-2] || 0" class="riskInput" disabled/>
           <InputText type="text" v-model="riskValue[i-1]" class="riskInput"/>
        </div>
      </div>
    </span>
    <Button label="Save" icon="pi pi-check" class="saveButton" @click="saveChanged"/>
    <Button label="Delete" icon="pi pi-times" class="cancelButton p-button-danger" @click="deleteGroup" />
    <SingleAttributeSettings
        v-for="(attribute, key) in group.attributes"
        :attribute="attribute"
        :key="key"
        :attribute-name="key"
        :diagnose-name="diagnoseName"
        :group-name="groupName"
    />
    <Button label="Add new criteria" icon="pi pi-check" class="saveButton" @click="addNew"/>
  </div>
</template>

<script setup>
import SingleAttributeSettings from "./SingleAttributeSettings.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const props = defineProps({
  group: {
    type: Object,
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

import {onMounted, ref} from "vue";
import {useData} from "../../store/data";
import router from "@/router";

const name = ref(props.groupName);
const riskValue = ref([]);
const riskNames = ref([]);
const useDataStore = useData();

const saveChanged = () => {
  useDataStore.updateGroup(name.value, riskValue.value, props.diagnoseName, props.groupName);
};

const deleteGroup = async () => {
  useDataStore.deleteGroup(props.diagnoseName, props.groupName);
  emits('update');
};
const addNew = () => {
  useDataStore.addNewAttribute(props.diagnoseName, props.groupName);
};

onMounted(() => {
    Object.keys(props.group.riskValue).forEach((item) => {
      riskValue.value.push(props.group.riskValue[item][1]);
      riskNames.value.push(item[0].toUpperCase()+item.slice(1));
    });
})

const emits = defineEmits(['update']);
</script>

<style scoped>
.margin {
  margin-top: 25px;
  margin-right: 20px;
}

.saveButton {
  margin-top:10px;
}

.riskInput {
  width:60px;
  margin-right: 10px;
}

.riskWrapper {
  display: flex;
}

.inputsWrapper {
  margin-right: 40px;
}

.inputsLabel {
  color: #6c757d;
}

.risk-levels {
  position: relative;
  top: 10px;
}

.cancelButton {
  margin-top:10px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>