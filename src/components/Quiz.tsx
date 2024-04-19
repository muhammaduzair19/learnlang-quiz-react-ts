import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Quiz = () => {
    const [result, setResult] = useState<string[]>([])
    const [count, setCount] = useState<number>(0)
    const [ans, setAns] = useState<string>('')
    const navigate = useNavigate()



    const nextHandler = (): void => {
        setResult((prev) => [...prev, ans])
        setCount(p => p + 1)
        setAns('')
    }


    return (
        <Container
            maxWidth={'md'}
            sx={{
                padding: '1rem'
            }}>
                
            <Typography m={'2rem 0'}>
                QUIZ
            </Typography>
            <Typography variant="h3">
                {count + 1} - {'Randoms'}
            </Typography>
            <FormControl>
                <FormLabel
                    sx={{
                        mt: '2rem',
                        mb: '1rem'
                    }}
                >
                    Meaning
                </FormLabel>
                <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
                    <FormControlLabel
                        value={'lol'}
                        control={<Radio />}
                        label="option 1"
                    >

                    </FormControlLabel>

                </RadioGroup>
            </FormControl>
            <Button
                sx={{
                    margin: '3rem 0'
                }}
                variant="contained"
                fullWidth
                onClick={nextHandler}
                disabled={ans === ''}
            >
                {count === 7 ? 'Submit' : "Next"}
            </Button>
        </Container>
    )
}

export default Quiz