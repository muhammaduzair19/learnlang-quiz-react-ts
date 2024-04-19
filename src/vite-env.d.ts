/// <reference types="vite/client" />

type LangType = 'ja' | 'es' | 'hi' | 'ur' | 'fr'



type WordType = {
    word: string,
    meaning: string,
    options: string[];
}

type StateType = {
    loading: Boolean,
    result: string[],
    words: WordType[],
    error?: string

}

interface FetchedDataType {
    translations: {
        text: string
    }[]
}