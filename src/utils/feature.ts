import axios from "axios";
import { generate } from "random-words"



export const translateWords = async (params: LangType): Promise<WordType[]>  => {
    try {
        const words: string[] = generate(8).map((i: string) => (
            {
                Text: i
            }
        ))

        const response = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', words, {

            params: {
                'to[0]': params,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '09bccf0200mshab9a4ee894e7becp1bb57ajsnd9444095d742',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
        })


        const receive: FetchedDataType[] = response.data;

        const arr: WordType[] = receive.map((i, idx) => {


            return {
                word: i.translations[0].text,
                meaning: words[idx].Text,
                options: ['sdu']
            }
        })
        console.log(arr);


        return arr;


    } catch (error) {
        console.log(error);

    }
} 