import { api } from '../../config/axios'

export const questionsAmount = async(amount) => {
    const questions = await api.get('/', {
        params: {
            amount,
            //type: 'boolean'
        }
    })

    return questions.data
}