<template>
  <div class="createNewWrapper">
    <span class="p-float-label margin">
      <InputText id="username" type="text" v-model="name"/>
      <label for="username">Name of the diagnosis</label>
    </span>
    <span v-for="j in groupNames.length" class="margin riskWrapper">
      <InputText type="text" v-model="groupNames[j-1]" class="nameInput"/>
      <div v-for="i in 4" :key="i" class="inputsWrapper">
        <label class="inputsLabel">{{ riskNames[i - 1] }}</label>
        <div>
          <InputText type="text" :value="riskValue[groupNames[j-1]][i-2] || 0" class="riskInput" disabled/>
          <InputText type="text" v-model="riskValue[groupNames[j-1]][i-1]" class="riskInput"/>
        </div>
      </div>
    </span>
    <Button icon="pi pi-plus" class="plusButton" @click="addMore"/>
    <Button label="Save" icon="pi pi-check" class="saveButton" @click="saveDiagnose"/>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import {onMounted, onUpdated, ref, watchEffect} from "vue";
import Chips from "primevue/chips";
import Button from "primevue/button";
import {useData} from "../../store/data";
import {useRouter} from "vue-router";

const newName = 'name';
const newRisk = [0.4,0.6,0.8,1];

const name = ref('');
const groupNames = ref([newName]);
const riskValue = ref({[newName]:newRisk});
const riskNames = ref(["high", "medium", "mediumLow", "low"]);
const useDataStore = useData();
const router = useRouter();

const addMore = () => {
  const dynamicName = newName+groupNames.value.length;
  riskValue.value[dynamicName]= newRisk;
  groupNames.value.push(dynamicName);
}
const saveDiagnose = async () => {
  useDataStore.addNewDiagnose(name.value, groupNames.value, riskValue.value);
  await router.push('/settings/edit');
}

</script>

<style scoped>
.createNewWrapper {
  position: relative;
  border-radius: 4px;
  border: 1px solid #ced4da;
  height: calc(100% + 60px);
  padding: 10px;
  padding-top: 25px;
  background-color: white;
}

.namesChips {
  margin-top: 20px;
}

.saveButton {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.riskInput {
  width: 60px;
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

.nameInput {
  width:200px;
  height: 39px;
  margin-top: 19px;
  margin-right: 40px;
}

.plusButton {
  margin-top: 10px;
}
</style>