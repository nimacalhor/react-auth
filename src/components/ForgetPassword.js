import React, { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAuth } from '../context/AuthContext'


const Login = () => {
    const [emailInputValue, setEmailInputValue] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)
    const [resetError, setResetError] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const [emailError, setEmailError] = useState(false);

    const { resetPass } = useAuth();

    const isInputsValid = function (email) {
        if (!(email.trim().length)) return setEmailError(true);
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return setEmailError(true);

        setEmailError(false);
    }

    const inputChangeHandler = function (e, setterF) {
        setterF(e.target.value);
    }

    const submitHandler = useCallback(async function (e) {
        e.preventDefault();
        setResetError(false)
        isInputsValid(emailInputValue);
        if (emailError) return;
        try {
            setBtnLoading(true)
            await resetPass(emailInputValue);
            setResetSuccess(true);
            setTimeout(() => setResetSuccess(false), 3000)
        } catch (err) {
            setResetError(true)
        }
        setBtnLoading(false)
    }, [emailError, emailInputValue, resetPass])

    return (
        <Box sx={{ width: "min(80vw, 450px)" }} component="form" onSubmit={submitHandler}>
            {
                resetError &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="error">sorry couldn't reset ur password ... u ugly</Alert>
            }
            {
                resetSuccess &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="success">check your email for more info</Alert>
            }
            <Paper sx={{ p: 4 }}>
                <Typography sx={{ m: 0, mx: "auto", width: "fit-content", mb: 2 }} variant="h4">Reset password</Typography>
                <TextField
                    helperText={emailError ? "email is not valid" : ""}
                    error={emailError}
                    value={emailInputValue}
                    onChange={(e) => inputChangeHandler(e, setEmailInputValue)}
                    label="email"
                    type="email"
                    id="signupEmail"
                    fullWidth
                    variant='standard' />
                <Button
                    disabled={btnLoading}
                    type="submit"
                    endIcon={!btnLoading && <SendIcon />}
                    variant="contained"
                    sx={{ mx: "auto", mt: 3 }}
                >{
                        btnLoading ? "loading..." : "SUBMIT"
                    }</Button>
                <Link to="/login">
                    <Button disabled={btnLoading} sx={{ mx: "0.5rem", mt: 3 }} variant="outlined">login</Button>
                </Link>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption">dont have an account ?</Typography>
                    <Link to="/signup">
                        <Button size="small" sx={{ ml: 1 }}>sign up</Button>
                    </Link>
                </Box>
            </Paper>
        </Box>
    )
}

export default React.memo(Login)