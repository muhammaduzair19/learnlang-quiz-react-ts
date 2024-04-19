import { Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


const languages = [
    {
        name: 'Japeneese',
        code: 'ja'
    },
    {
        name: 'French',
        code: 'fr'
    },
    {
        name: 'Hindi',
        code: 'hi'
    },
    {
        name: 'Spanish',
        code: 'es'
    },
    {
        name: 'Urdu',
        code: 'ur'
    },
]


const Home = () => {
    const navigate = useNavigate()
    const languageSelectHandler = (langauge: string): void => {
        navigate(`learning?language=${langauge}`)
    }


    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h3" p={'2rem'} textAlign={'center'}>
                Welcome, learn new words daily in any language
            </Typography>


            <Stack direction={'row'} spacing={'2rem'} p={'2rem'} alignItems={'center'} justifyContent={'center'}>
                {
                    languages.map(i => (
                        <Button
                            key={i.code}
                            onClick={
                                () => languageSelectHandler(i.code)
                            }
                            variant="contained" >{i.name}
                        </Button>
                    ))
                }
            </Stack>

            <Typography variant="h5" p={'1rem'} textAlign={'center'}>
                Choose any language from above to learn words in
            </Typography>

        </Container>
    )
}

export default Home