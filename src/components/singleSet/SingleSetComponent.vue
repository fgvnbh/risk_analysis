<template>
  <div class="accordionElemWrapper" id="abc">
    <div class="inputsWrapper">
      <div v-for="(value, key) in group.attributes" class="singleInput">
      <span class="p-float-label inputWrapper">
        <InputText id="username" type="number" v-model="data.data[key]"/>
        <label for="username" class="nameLabel">{{ key }}</label>
      </span>
      </div>
    </div>
    <div class="chart">
      <Chart type="bar" :data="basicData" :options="options" :height="300"/>
    </div>
  </div>
  <Dropdown v-model="selectedRiskLevel" :options="Object.keys(props.group.riskValue)" placeholder="Select risk level" class="risk-dropdown"/>
  <Button v-if="Object.keys(useData().prefill).includes(groupName)" label="Prefill with test data" class="prefillButton" @click="prefillData"/>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Chart from "primevue/chart";
import {computed, onUpdated, reactive, ref} from "vue";
import { mathFuncs } from "@/helpers/mathFormulas";
import Dropdown from 'primevue/dropdown';
import {useData} from "@/store/data";
import Button from "primevue/button";

const props = defineProps({
  group: {
    type: Object,
    default: () => ({})
  },
  groupName: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['calculatedValue']);

const weightSum = computed(()=>{
  const attributes = props.group?.attributes;
  return Object.keys(attributes).reduce((partialSum, item) => partialSum + attributes[item].weight, 0);
})

const calculateValue = () => {
  const attributes = props.group?.attributes;
  return Object.keys(attributes).reduce((partialSum, item) => {
    const val = attributes[item];
    const func = mathFuncs[val.type];
    return partialSum + (func(data.data[item],...val.data) * (attributes[item].weight ? attributes[item].weight / weightSum.value : 0));
  }, 0).toFixed(3);
};

const prefillData = () => {
  Object.keys(props.group.attributes).filter((attribute) => Object.keys(useData().prefill[props.groupName]).includes(attribute)).forEach((attribute) => data.data[attribute] = useData().prefill[props.groupName][attribute]);
  selectedRiskLevel.value = 'low';
}

const basicData = ref({
  labels: ['Value'],
  datasets: [
    {
      backgroundColor: '#3d5a80',
      data: [0]
    },
  ]
});

const options = ref({
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: () => resultingValue.value.toFixed(3),
        title: () => 'Risk level'
      }
    }
  }
});

const data = reactive({data: []});

const risk = ref();

const selectedRiskLevel = ref();

const resultingValue = ref();
const readyToCalc = () => {
    const dataLength = Object.keys(data.data).length;
    const attributesLength = Object.keys(props.group.attributes || {}).length;
    const everyInputFilled = Object.values(data.data).every((item) => item === 0 || !!item);
    return dataLength > 0 && dataLength === attributesLength && everyInputFilled && selectedRiskLevel.value;
};

const valueBasedColor=(val)=>{
  const riskValue = props.group.riskValue;
  const riskLevel = Object.keys(riskValue).find((item)=>{
    if(val > riskValue[item][0] && val <= riskValue[item][1]) {
      return item;
    }
  });
  risk.value = riskLevel;
  switch (riskLevel) {
    case 'high': {
      return '#ff3838';
    }
    case 'medium': {
      return '#ffb302';
    }
    case 'mediumLow': {
      return '#fce83a';
    }
    case 'low': {
      return '#56f000';
    }
  }
}

onUpdated(() => {
  if(readyToCalc()){
    const calculatedVal = calculateValue();
    const riskValue = props.group.riskValue;
    resultingValue.value = calculatedVal*riskValue[selectedRiskLevel.value][1];
    basicData.value.datasets[0] = {
      label: 'dfv',
      data: [calculatedVal]
    };
    emit('calculatedValue', {[props.groupName]: resultingValue.value.toFixed(3)});
  }
})

</script>

<style scoped>
.inputWrapper {
  margin-bottom: 30px;
}

.accordionElemWrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.chart {
  width: 200px;
  height:200px;
  margin-left: auto;
}

.singleInput {
  height: 40px;
  flex: 1 0 26%;
}

.inputsWrapper {
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 20px;
  max-width:75%;
  height: fit-content;
  margin-top:10px;
}

.calculateBtn {
  margin-top: 10px;
}

.nameLabel {
  white-space: nowrap;
  width: 184px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.risk-dropdown {
  margin-top: 20px;
}

.prefillButton {
  margin-left: 20px;
}
</style>