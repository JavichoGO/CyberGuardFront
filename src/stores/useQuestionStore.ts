import { defineStore } from 'pinia'
import {  axiosInstance } from '@/api/servicesGlobal';

export const useQuestionStore = defineStore('question', {
state: () => ({
    questions: [],
    questionsOld: [],
    modelQuestion: {
        nameQuestions: null,
        functionQuestions: null,
        categoryQuestions: null,
        options: [
            {
                label: 'Alternativa 1 (1 punto)',
                optionValue: 1,
                optionName: null,
            },
            {
                label: 'Alternativa 2 (2 punto)',
                optionValue: 2,
                optionName: null,
            },
            {
                label: 'Alternativa 3 (3 punto)',
                optionValue: 3,
                optionName: null,
            },
            {
                label: 'Alternativa 4 (4 punto)',
                optionValue: 4,
                optionName: null,
            },
            {
                label: 'Alternativa 5 (5 punto)',
                optionValue: 5,
                optionName: null,
            },
        ],
    },
    categories: [],
    categoriesOld: [],
    functions: [],
    statusText: '',
}),
actions: {
    async registerQuestion(userId: any) {
        const response = userId ? await axiosInstance.put('question/update',  {
            ...this.modelQuestion,
            idQuestion: userId,
            functionQuestions: Number(this.modelQuestion.functionQuestions),
            categoryQuestions: Number(this.modelQuestion.categoryQuestions),
            options: this.modelQuestion.options.map((row) => {
                return {
                    idOption: row.idOption,
                    optionName: row.optionName,
                    optionValue: row.optionValue
                }
            })
        }) : await axiosInstance.post('question/create', 
        {
            ...this.modelQuestion,
            functionQuestions: Number(this.modelQuestion.functionQuestions),
            categoryQuestions: Number(this.modelQuestion.categoryQuestions),
            options: this.modelQuestion.options.map((row) => {
                return {
                    optionName: row.optionName,
                    optionValue: row.optionValue
                }
            })
        }
        );
        console.log(response);
    },

    setQuestion(row: any) {
        this.modelQuestion.nameQuestions = row.nameQuestions;
        this.modelQuestion.functionQuestions = row.functionQuestions;
        this.modelQuestion.categoryQuestions = row.categoryQuestions;
        this.modelQuestion.options = row.optionsList.map((row: any, index: number) => {
            return {
                ...row,
                label: `Alternativa ${index + 1} (${index + 1} punto)`,
            }
        });
    },

    async getQuestions() {
        const response2 = await axiosInstance.get('question/list');
        this.questionsOld = response2.data.data.map((row: any, index: number) => {
            return {
                ...row,
                number: index + 1,
            };
        });
        this.questions = response2.data.data.map((row: any, index: number) => {
            return {
                ...row,
                number: index + 1,
            };
        });
      },

      async getCatalog() {
        const response2 = await axiosInstance.get('catalogues/list');
        this.categoriesOld = response2.data.categoria;
        this.categories = response2.data.categoria;
        this.functions = response2.data.funcion;
      },

      async actionDeleteQuestion(id: any) {
        const response = await axiosInstance.post('question/delete', {
          idQuestion: id,
        });
        this.statusText = response.data.message;
      },

      filteredQuestion(value: any) {
        if (value.trim() === '') {
          this.questions = this.questionsOld;
        } else { 
          this.questions = this.questions.filter(item =>
            item.nameQuestions.toLowerCase().includes(value) ||
            item.functionQuestions.toString().includes(value) ||
            item.categoryQuestions.toString().includes(value)
          );
        }
      },

      setFunction(value: number) {
        debugger;
        this.categories = this.categoriesOld.filter(p => p.parent == value);
        console.log(value);
      }
}
})