import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { grey } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const logoutHandler = async function () {
        setError(false);
        setLoading(true);
        setSuccess(false)
        try {
            await logout();
            setSuccess(true)
            setLoading(false);
            setTimeout(() => {
                setSuccess(false);
                navigate("/login    ")
            }, 3000)
        } catch (err) {
            setError(true);
            setLoading(false);
            setTimeout(() => setError(false), 3000)
        }
    }

    return (
        <Box sx={{ width: "min(80vw, 450px)" }}>
            {
                error &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="error">sorry couldn't log u in ... u ugly</Alert>
            }
            {
                success &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="success">yea u r not ugly 😀</Alert>
            }
            <Paper sx={{ p: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    <Avatar className='dashboard__avatar' sx={{ borderWidth:"2px", border:"#f4f4f4", borderStyle:"solid", width: "150px", height: "150px", backgroundColor:"transparent" }}>
                        <Typography variant="h2" sx={{ fontWeight: "bolder" }} color={grey[500]}>
                            {currentUser.email.toUpperCase()[0]}
                        </Typography>
                    </Avatar>
                </Box>
                <Typography>Email :</Typography> {currentUser.email}
                <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                    <Button onClick={() => navigate("/update")}>update</Button>
                    <Button onClick={logoutHandler} disabled={loading}>{loading ? "loading ..." : "log out"}</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Dashboard