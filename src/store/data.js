import {defineStore} from 'pinia'

export const useData = defineStore('data', {
    state: () => ({
        data: {},
        calculatedDataset: [],
        prefill: {}
    }),

    getters: {
        getData: (state) => state.data
    },

    actions: {
        setData(data) {
            this.data = data;
        },
        setPrefill(data) {
          this.prefill = data;
        },
        updateAttribute(data, initialName, diagnoseName, groupName) {
            const {[initialName]: initialAttribute, ...otherAttributes} = this.data[diagnoseName][groupName].attributes;
            this.data[diagnoseName][groupName].attributes = {[Object.keys(data)[0]]: Object.values(data)[0], ...otherAttributes};
            localStorage.setItem('config', JSON.stringify(this.data));
        },
        deleteAttribute(initialName, diagnoseName, groupName) {
            const {[initialName]: initialAttribute, ...otherAttributes} = this.data[diagnoseName][groupName].attributes;
            this.data[diagnoseName][groupName].attributes = {...otherAttributes};
            localStorage.setItem('config', JSON.stringify(this.data));
        },
        addNewAttribute(diagnoseName, groupName) {
            this.data[diagnoseName][groupName].attributes['New'] = {
                data: [],
                type: 'sLinear',
                weight: 0
            };
            localStorage.setItem('config', JSON.stringify(this.data));
        },
        addNewDiagnose(diagnoseName, groupsNames, riskValues) {
            const groups = {};
            groupsNames.forEach((name) => groups[name] = {
                riskValue: {
                    "high": [0, riskValues[name][0]],
                    "medium": [riskValues[name][0], riskValues[name][1]],
                    "mediumLow": [riskValues[name][1], riskValues[name][2]],
                    "low": [riskValues[name][2], 1]
                },
                attributes: {}
            });
            this.data[diagnoseName] = groups;
            localStorage.setItem('config', JSON.stringify(this.data));
        },
        deleteDiagnose(diagnoseName) {
            const {[diagnoseName]: initialAttribute, ...otherAttributes} = this.data;
            this.data = { ...otherAttributes };
            localStorage.setItem('config', JSON.stringify(this.data));
        },
        setCalculated(dataset) {
            this.calculatedDataset = dataset;
        },
        updateGroup(name, risk, diagnoseName, groupName) {
            const {[groupName]: initialAttribute, ...otherAttributes} = this.data[diagnoseName];
            this.data[diagnoseName] = {
                [name]: {
                    riskValue: {
                        "high": [0, risk[0]],
                        "medium": [risk[0], risk[1]],
                        "mediumLow": [risk[1], risk[2]],
                        "low": [risk[2], 1]
                    },
                    attributes: initialAttribute.attributes
                },
                ...otherAttributes
            }
            localStorage.setItem('config', JSON.stringify(this.data));
        },
        deleteGroup(diagnoseName, groupName) {
            const {[groupName]: initialAttribute, ...otherAttributes} = this.data[diagnoseName];
            this.data[diagnoseName] = {...otherAttributes};
            localStorage.setItem('config', JSON.stringify(this.data));
        }
    },
})