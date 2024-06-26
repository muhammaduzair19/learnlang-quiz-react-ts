import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/feature";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getWordFail, getWordRequest, getWordSucces } from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const audioRef = useRef()
    const [count, setCount] = useState<number>(0);
    const [audioString, setAudioString] = useState<string>('');
    const params = useSearchParams()[0].get('language') as LangType
    const { loading, words, error } = useSelector((state: { root: StateType }) => state.root);


    const audioHandler = async () => {
        const player: HTMLAudioElement = audioRef.current!
        if (player) {
            player.play()
        } else {
            const data = await fetchAudio(words[count]?.word, params)
            setAudioString(data)
        }
    }


    useEffect(() => {
        dispatch(getWordRequest())
        translateWords(params)
            .then((arr) => dispatch(getWordSucces(arr)))
            .catch((e) => dispatch(getWordFail(e)))

        if (error) {
            alert(error)
            dispatch(clearState())
        }

    }, [params])

    const nextHandler = (): void => {
        setCount(prev => prev + 1)
        setAudioString('')
    }

    if (loading) return <Loader />


    return (

        <Container maxWidth={'lg'} sx={{ padding: '1rem' }}>
            <Button onClick={count === 0 ? () => navigate('/') : () => setCount(p => p - 1)}>
                <ArrowBack />
            </Button>
            <Typography m={'2rem 0'}>
                Only words are enough
            </Typography>

            <Stack direction={'row'} spacing={'1rem'}>
                <Typography variant="h4">
                    {count + 1} - {words[count]?.word}
                </Typography>
                <Typography color={'gray'} variant="h4">
                    {words[count]?.meaning}
                </Typography>
                {
                    audioString && <audio src={audioString} autoPlay ref={audioRef}></audio>
                }
                <Button
                    onClick={audioHandler}
                    sx={{
                        borderRadius: '50%'
                    }}>

                    <VolumeUp />
                </Button>
            </Stack>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '3rem 0' }}
                onClick={() => { count === 7 ? navigate('/quiz') : nextHandler() }}>

                {count === words.length - 1 ? "Test" : "Next"}
            </Button>
        </Container>
    )
}

export default Learning