import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

interface Options {
  optionValue: string;
  nameOption: string;
  id: string;
  value: string;
}

interface MyItem {
  categoryQuestionsDescription: string;
  functionQuestionsDescription: number;
  nameQuestion: string;
  optionValue: string;
  optionsList: Options[];
  id: string;
}


export const useFormStore = defineStore('form', {
  state: () => ({
    forms: [],
    showFinish: null,
    questionsIdentify: [] as MyItem[],
    questionDetect: [] as MyItem[],
    questionProtect: [] as MyItem[],
    questionRecover: [] as MyItem[],
    questionRespond: [] as MyItem[],
  }),
  actions: {
   async getQuestionIdentification() {
    const identiicationUser = sessionStorage.getItem('identification');
      const response = await axiosInstance.post('question-user/find', {
        identification: identiicationUser,
      });
      this.showFinish = response.data.data.finish;
      this.forms = response.data.data.questions;
      this.questionsIdentify = response.data.data.questions.IDENTIFY;
      this.questionDetect = response.data.data.questions.DETECT;
      this.questionProtect = response.data.data.questions.PROTECT;
      this.questionRecover = response.data.data.questions.RECOVER;
      this.questionRespond = response.data.data.questions.RESPOND;
    },
    async fetchSaveQuestion() {
      const arrayQuestion = this.questionsIdentify && this.questionsIdentify.map((row: any) => {
        return {
          questionId: row.idQuestion,
          optionValue: row.optionValue,
        }
      });
      const arrayDetected = this.questionDetect.map((row: any) => {
        return {
          questionId: row.idQuestion,
          optionValue: row.optionValue,
        }
      });
      const arrayProtect = this.questionProtect.map((row: any) => {
        return {
          questionId: row.idQuestion,
          optionValue: row.optionValue,
        }
      });
      const arrayRecover = this.questionRecover.map((row: any) => {
        return {
          questionId: row.idQuestion,
          optionValue: row.optionValue,
        }
      });
      const arrayRespond = this.questionRespond.map((row: any) => {
        return {
          questionId: row.idQuestion,
          optionValue: row.optionValue,
        }
      });
      const responses = [...arrayQuestion, ...arrayDetected, ...arrayProtect, ...arrayRecover, ...arrayRespond];
      console.log(responses);
      const response = await axiosInstance.post('question-user/save/answers', {
        responses,
      });
      console.log(response);
    },
    async resetQuestion() {
      const identiicationUser = sessionStorage.getItem('identification');
      const response = await axiosInstance.get(`user/create/new/question/${identiicationUser}`);
      console.log(response);
    }
  }
});