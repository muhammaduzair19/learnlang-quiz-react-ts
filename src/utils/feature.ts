import axios from "axios";
import _ from "lodash";
import { generate } from "random-words"


const generateMCQ = (meaning: { Text: string }[], idx: number): string[] => {

    const correctAns: string = meaning[idx].Text

    const allMeaningButCorrectAns = meaning.filter((i) => i.Text !== correctAns);

    const incorrectOptions: string[] = _.sampleSize(
        allMeaningButCorrectAns, 3
    ).map((i) => i.Text)

    const mcqOptions = _.shuffle([...incorrectOptions, correctAns])

    return mcqOptions
}

export const translateWords = async (params: LangType) => {

    try {

        const words: WordType[] = generate(8).map((i: string) => (
            { Text: i }
        ));

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

            const options = generateMCQ(words, idx)


            return {
                word: i.translations[0].text,
                meaning: words[idx].Text,
                options
            }
        })


        return arr;


    } catch (error) {
        console.log(error);

    }
}


export const correctCountNumber = (
    arr1: string[],
    arr2: string[]

): number => {

    if (arr1.length !== arr2.length) throw new Error('Arrays are not equal')

    let matchedAnswers = 0;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) matchedAnswers++
    }

    return matchedAnswers
}


export const fetchAudio = async (text: string, language: LangType): Promise<string> => {
    const key = import.meta.env.VITE_TEXT_TO_SPEECHY_API_KEY
    const rapidKey = import.meta.env.VITE_RAPID_API_KEY
    const encodedParams = new URLSearchParams({
        src: text,
        r: "0",
        c: 'mp3',
        f: '8khz_8bit_mono',
        b64: 'true'
    });

    if (language === 'es') encodedParams.set('hl', 'es-es')
    else if (language === 'fr') encodedParams.set('hl', 'fr-fr')
    else if (language === 'hi') encodedParams.set('hl', 'hi-in')
    else if (language === 'ja') encodedParams.set('hl', 'ja-jp')
    else encodedParams.set('hl', 'ur-pk')

    console.log(encodedParams);


    const { data }: { data: string } = await axios.post('https://voicerss-text-to-speech.p.rapidapi.com/', encodedParams,
        {
            params: {
                key
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
            },
        })




    return data

}