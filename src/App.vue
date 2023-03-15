<script setup>
import {onBeforeMount, onMounted, onUpdated, ref, watchEffect} from 'vue';
import {readTextFile, writeFile} from "./helpers/fileHandler";
import {useData} from "./store/data";
import PanelMenu from "primevue/panelmenu";
import {useRouter} from "vue-router";

const useDataStore = useData();

const importConfig = () => {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = _ => {
    const reader = new FileReader();
    reader.readAsText(input.files[0], "UTF-8");
    reader.onload = function (evt) {
      useDataStore.setData(JSON.parse(evt.target.result));
      localStorage.setItem('config', JSON.stringify(useDataStore.data));
    }
  };
  input.click();
}

const exportConfig = () => {
  writeFile(useDataStore.data);
}

const items = ref([
  {
    key: '0',
    label: 'Calculate',
    items: []
  },
  {
    key: '1',
    label: 'Settings',
    items: [
      {
        key: '1_0',
        label: 'Edit existing config',
        to: '/settings/edit'
      },
      {
        key: '1_2',
        label: 'New diagnose calc',
        to: '/settings/new'
      },
    ]
  },
  {
    key: '0',
    label: 'Import config',
    command: importConfig
  },
  {
    key: '0',
    label: 'Export config',
    command: exportConfig
  },
]);

const router = useRouter();

onBeforeMount(() => {
  const savedData = localStorage.getItem('config');
  if (savedData) {
    useDataStore.setData(JSON.parse(localStorage.getItem('config')));
    useDataStore.setPrefill(JSON.parse(localStorage.getItem('prefill')));
  } else {
    router.push('/');
    useDataStore.setData(JSON.parse(readTextFile('data.json')));
    localStorage.setItem('config', JSON.stringify(useDataStore.data));
    useDataStore.setPrefill(JSON.parse(readTextFile('prefill.json')));
    localStorage.setItem('prefill', JSON.stringify(useDataStore.prefill));
  }
  items.value[0].items = Object.keys(useDataStore.data).map((item, index)=>({
    'key': `0_${index}`,
    'label': item,
    'to': `/calculate/${item}`
  }))
});

watchEffect(() => {
  items.value[0].items = Object.keys(useDataStore.data).map((item, index)=>({
    'key': `0_${index}`,
    'label': item,
    'to': `/calculate/${item}`
  }))
})

</script>
<template>
  <div>
    <div class="mainWrapper">
      <PanelMenu :model="items" class="menu" :key="updateKey"/>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: 250px;
  margin-right: 30px;
}

.content {
  width: 100%;
  border-radius: 4px;
}

.mainWrapper {
  display: flex;
  flex-direction: row;
}

.menuBtn {
  width: 150px;
  margin: 2px;
}
</style>
