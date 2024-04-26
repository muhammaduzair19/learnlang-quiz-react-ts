import { Button, Container, List, ListItem, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../redux/slices";
import { correctCountNumber } from "../utils/feature";

const Result = () => {
  const { words, result } = useSelector((state: { root: StateType }) => state.root)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const correctAns = correctCountNumber(result, words.map(i => i.meaning));
  const percentage = (correctAns / words.length * 100)

  const resetHandler = (): void => {
    navigate('/')
    dispatch(clearState())
  }

  return (
    <Container maxWidth={'md'}>
      <Typography variant="h3" color={'primary'} m={'2rem 0'}>
        Result
      </Typography>
      <Typography m={'1rem'} variant="h6">
        You got {correctAns} right out of {words?.length}
      </Typography>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Stack>
          <Typography m={'1rem 0'} variant="h5">
            Your Ans
          </Typography>
          <List>
            {
              result?.map((i, idx) => (
                <ListItem>
                  {idx + 1} = {i}
                </ListItem>
              ))
            }
          </List>
        </Stack>
        <Stack>

          <Typography m={'1rem 0'} variant="h5">
            Your Ans
          </Typography>
          <List>
            {
              words?.map((i, idx) => (
                <ListItem>
                  {idx + 1} = {i.meaning}
                </ListItem>
              ))
            }
          </List>
        </Stack>
      </Stack>
      <Typography
        m={'1rem'}
        variant="h5"
        color={percentage > 50 ? 'green' : 'red'}
      >
        {percentage > 50 ? 'Pass' : "Fails"}
      </Typography>
      <Button onClick={resetHandler} sx={{ margin: '1rem' }} variant="contained">
        Reset
      </Button>

    </Container>
  )
}

export default Result