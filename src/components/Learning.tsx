import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const Learning = () => {
    const navigate = useNavigate()
    const [count, setCount] = useState<number>(0);
    const [audioString, setAudioString] = useState<string>('');
    const params = useSearchParams()[0].get('langauge') as LangType

    const nextHandler = (): void => {
        setCount(prev => prev + 1)
    }

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
                    {count + 1} - {'Sample'}
                </Typography>
                <Typography color={'gray'} variant="h4">
                    : {'lol'}
                </Typography>
                <Button
                    sx={{
                        borderRadius: '50%'
                    }}
                >
                    <VolumeUp />
                </Button>
            </Stack>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '3rem 0' }}
                onClick={() => { count === 7 ? navigate('/quiz') : nextHandler() }}
            >
                {count === 7 ? "Test" : "Next"}
            </Button>
        </Container>
    )
}

export default Learning