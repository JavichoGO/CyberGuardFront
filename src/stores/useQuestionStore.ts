import { defineStore } from 'pinia'
import {  axiosInstance } from '@/api/servicesGlobal';

interface MyItem {
    optionValue: number | null;
    label: string | null;
    optionName: string | null;
  }
  

export const useQuestionStore = defineStore('question', {
state: () => ({
    questions: [] as any[],
    questionsOld: [] as any[],
    modelQuestion: {
        nameQuestions: '' as string | null,
        functionQuestions: null as number | null,
        categoryQuestions: '' as string | null,
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
        ] as MyItem[],
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
            options: this.modelQuestion.options.map((row: any) => {
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
                replied: row.replied || false, // Incluye el campo 'replied', por defecto false si no está presente

            };
        });
        this.questions = response2.data.data.map((row: any, index: number) => {
            return {
                ...row,
                number: index + 1,
                replied: row.replied || false, // Incluye el campo 'replied', por defecto false si no está presente

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

      filteredQuestion(value: string) {
        if (value.trim() === '') {
          this.questions = this.questionsOld; // Restaurar la lista completa si no hay búsqueda
        } else {
          const query = value.toLowerCase().trim();
          this.questions = this.questionsOld.filter((item: any) =>
            item.nameQuestions.toLowerCase().includes(query) ||
            (item.functionQuestionsDescription && item.functionQuestionsDescription.toLowerCase().includes(query)) ||
            (item.categoryQuestionsDescription && item.categoryQuestionsDescription.toLowerCase().includes(query))
          );
        }
      },


      setFunction(value: number) {
        this.categories = this.categoriesOld.filter((p: any) => p.parent == value);
      }
}
})