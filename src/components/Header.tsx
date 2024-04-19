import { AppBar, Toolbar, Typography, colors } from "@mui/material"
import { Link } from "react-router-dom"

const Header = () => {
    const styles = {
        color: 'white',
        margin: '0.5rem',
        textDecoration: 'none',
    }
    return (
        <AppBar position="static">
            <Toolbar sx={{ alignItems: "center" }}>
                <Typography variant="h5" mr={'auto'}>
                    Eng-2-Other
                </Typography>
                <Link style={styles} to={'/'}>
                    Home
                </Link>
                <Link style={styles} to={'/login'}>
                    Login
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header