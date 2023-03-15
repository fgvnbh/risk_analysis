<template>
  <div class="continueWrapper">
    <div v-if="final" class="final-res">
      <div style="font-size: 24px">Resulting value:
        <div style="font-size: 60px; margin-top: 50px">{{final.toFixed(3)}}</div>
      </div>
      <div class="chart">
        <Chart type="bar" :data="basicData" :options="options" :height="300"/>
      </div>
      <div>
        <div class="risk-label"><span class="risk-color" style="background-color: #ff0000"/> - Extremely high</div>
        <div class="risk-label"><span class="risk-color" style="background-color: #ED5147"/> - High</div>
        <div class="risk-label"><span class="risk-color" style="background-color: #ffb302"/> - Medium</div>
        <div class="risk-label"><span class="risk-color" style="background-color: #fce83a"/> - Below medium</div>
        <div class="risk-label"><span class="risk-color" style="background-color: #56f000"/> - Low</div>
      </div>
    </div>
    <div v-else v-for="(item, key) in useDataStore.calculatedDataset" class="wrapper">
      <span class="p-float-label margin">
        <InputText id="username" type="text" :placeholder="item" disabled />
        <label for="username">{{ key }}</label>
      </span>
      <span class="p-float-label margin">
        <InputText type="text" v-model="weights[key]" />
        <label for="username">Weight</label>
      </span>
    </div>
    <Button v-if="!final" label="Calculate" icon="pi pi-check" class="saveButton" @click="calculate" :disabled="buttonEnabled()"/>
  </div>
</template>

<script setup>
import {useData} from "../../store/data";
import InputText from "primevue/inputtext";
import {ref} from "vue";
import Button from "primevue/button";
import Chart from "primevue/chart";

const useDataStore = useData();

const weights = ref({});
const final = ref(0);
const buttonEnabled = () => {
  return Object.keys(weights.value).length !== Object.keys(useDataStore.calculatedDataset).length && Object.keys(weights.value).length !==0;
}

const calculate = () => {
  let result = 0;
  if(Object.keys(weights.value).length > 0) {
    const weightsSum = Object.values(weights.value).reduce((a, b) => a + parseInt(b), 0);
    Object.keys(useDataStore.calculatedDataset).forEach((item)=>{
      result+= useDataStore.calculatedDataset[item] * (weights.value[item]/weightsSum);
    });
  } else {
    Object.keys(useDataStore.calculatedDataset).forEach((item)=>{
      result+= parseFloat(useDataStore.calculatedDataset[item]);
    });
    result*=(1/Object.keys(useDataStore.calculatedDataset).length);
  }
  final.value = result;
  basicData.value.datasets[0] = {
    backgroundColor: valueBasedColor(final.value),
    data: [final.value]
  };
}

const basicData = ref({
  labels: ['Value'],
  datasets: [
    {
      backgroundColor: '#42A5F5',
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
        label: () => final.value.toFixed(3),
        title: () => 'Risk level'
      }
    }
  }
});

const valueBasedColor = (val) => {
  console.log(val);
  switch (true){
    case (val < 0.2): {
      return '#ff0000';
    }
    case (val < 0.4): {
      return '#ED5147';
    }
    case (val < 0.6): {
      return '#ffb302';
    }
    case (val < 0.8): {
      return '#fce83a';
    }
    case (val < 1): {
      return '#56f000';
    }
  }
}
</script>

<style scoped>
.margin {
  margin-bottom: 25px;
  margin-right: 20px;
}

.wrapper {
  display: flex;
}

.continueWrapper {
  position: relative;
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 10px;
  padding-top: 25px;
  height: calc(100% + 60px);
  background-color: white;
}

.saveButton {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.chart {
  width: 200px;
  height:200px;
}

.final-res {
  display: flex;
  flex-flow: row;
  justify-content: start;
  gap: 180px;
  margin-top: 50px;
  margin-left: 20px;
}

.risk-label {
  margin-top: 20px;
  display: flex;
}

.risk-label:first-of-type {
  margin-top: 0;
  display: flex;
}

.risk-color {
  height: 20px;
  width: 100px;
  display: inline-block;
}
</style>