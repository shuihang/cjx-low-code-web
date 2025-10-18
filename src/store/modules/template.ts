import { defineStore } from 'pinia'
 
export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

export type TemplateDataProps = {
  templateData: TemplateProps[]
}

const useTemplateStore = defineStore('Template', {
  state: (): TemplateDataProps => ({
    templateData: [{id: 1, title: '1', coverImg: '11', author: 'test', copiedCount: 1}]
  }),
  actions: {
    
  }
})

export default useTemplateStore