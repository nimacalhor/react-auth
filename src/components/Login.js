import React, { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    const [emailInputValue, setEmailInputValue] = useState("")
    const [passInputValue, setPassInputValue] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const isInputsValid = function (email, pass, confirmPass) {
        if (
            !(email.trim().length) ||
            !(pass.trim().length)
        ) {
            setEmailError(true);
            setPassError(true);
            return;
        }
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return setEmailError(true);

        setEmailError(false);
        setPassError(false);
    }

    const inputChangeHandler = function (e, setterF) {
        setterF(e.target.value);
    }

    const submitHandler = useCallback(async function (e) {
        e.preventDefault();
        setSignUpError(false)
        isInputsValid(emailInputValue, passInputValue);
        if (emailError || passError) return;
        try {
            setBtnLoading(true)
            await login(emailInputValue, passInputValue);
            setSignUpSuccess(true)
            setTimeout(() => {
                setSignUpSuccess(false);
                navigate("/")
            }, 3000)
        } catch (err) {
            setSignUpError(true)
        }
        setBtnLoading(false)
    }, [login, passInputValue, passError, emailError, emailInputValue, navigate])

    return (
        <Box sx={{ width: "min(80vw, 450px)" }} component="form" onSubmit={submitHandler}>
            {
                signUpError &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="error">sorry couldn't log u in ... u ugly</Alert>
            }
            {
                signUpSuccess &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="success">yea u r not ugly 😀</Alert>
            }
            <Paper sx={{ p: 4 }}>
                <Typography sx={{ m: 0, mx: "auto", width: "fit-content", mb: 2 }} variant="h4">Log In</Typography>
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
                <TextField
                    helperText={passError ? "passwords is incorrect" : ""}
                    error={passError}
                    value={passInputValue}
                    onChange={(e) => inputChangeHandler(e, setPassInputValue)}
                    label="password"
                    type="password"
                    id="signupPassword"
                    fullWidth
                    variant='standard'
                    sx={{ my: 2 }} />
                <Button
                    disabled={btnLoading}
                    type="submit"
                    endIcon={!btnLoading && <SendIcon />}
                    variant="contained"
                    sx={{ mx: "auto", mt: 3 }}
                >{
                        btnLoading ? "loading..." : "SUBMIT"
                    }</Button>
                <Divider sx={{ my: 2 }} />
                <Box sx={{}}>
                    <Typography variant="caption">dont have an account ?</Typography>
                    <Link to="/signup">
                        <Button size="small" sx={{ ml: 1 }}>sign up</Button>
                    </Link>
                    <br />
                    <Link to="/forgot-pass">
                        <Button sx={{ fontSize: "11px" }}>forgot password ?</Button>
                    </Link>
                </Box>
            </Paper>
        </Box>
    )
}

export default React.memo(Login)