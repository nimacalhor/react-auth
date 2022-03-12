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


const SignUp = () => {
    const [emailInputValue, setEmailInputValue] = useState("")
    const [passInputValue, setPassInputValue] = useState("")
    const [confirmPassInputValue, setConfirmPassInputValue] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const { signup } = useAuth()
    const navigate = useNavigate()

    const isInputsValid = function (email, pass, confirmPass) {
        if (
            !(email.trim().length) ||
            !(pass.trim().length) ||
            !(confirmPass.trim().length)
        ) {
            setEmailError(true);
            setPassError(true);
            return;
        }
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return setEmailError(true);
        if (pass !== confirmPass) return setPassError(true);

        setEmailError(false);
        setPassError(false);
    }

    const inputChangeHandler = function (e, setterF) {
        setterF(e.target.value);
    }

    const submitHandler = useCallback(async function (e) {
        e.preventDefault();
        setSignUpError(false)
        isInputsValid(emailInputValue, passInputValue, confirmPassInputValue);
        if (emailError || passError) return;
        try {
            setBtnLoading(true)
            await signup(emailInputValue, passInputValue);
            setSignUpSuccess(true)
            setTimeout(() => {
                setSignUpSuccess(false)
                navigate("/")
            }, 3000)
        } catch (err) {
            setSignUpError(true)
        }
        setBtnLoading(false)
    }, [confirmPassInputValue, signup, passInputValue, passError, emailError, emailInputValue, navigate])

    return (
        <Box sx={{ width: "min(80vw, 450px)" }} component="form" onSubmit={submitHandler}>
            {
                signUpError &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="error">sorry couldn't sign u up ... u ugly</Alert>
            }
            {
                signUpSuccess &&
                <Alert sx={{ position: "absolute", inset: "10px 10px auto auto" }} severity="success">yea u r not ugly 😀</Alert>
            }
            <Paper sx={{ p: 4 }}>
                <Typography sx={{ m: 0, mx: "auto", width: "fit-content", mb: 2 }} variant="h4">Sign Up</Typography>
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
                    helperText={passError ? "passwords are not same" : ""}
                    error={passError}
                    value={passInputValue}
                    onChange={(e) => inputChangeHandler(e, setPassInputValue)}
                    label="password"
                    type="password"
                    id="signupPassword"
                    fullWidth
                    variant='standard'
                    sx={{ my: 2 }} />
                <TextField
                    helperText={passError ? "passwords are not same" : ""}
                    error={passError}
                    value={confirmPassInputValue}
                    onChange={(e) => inputChangeHandler(e, setConfirmPassInputValue)}
                    label="confirm password"
                    type="password"
                    id="signupConfirmPassword"
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
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption">already have an account ?</Typography>
                    <Link to="/login">
                        <Button size="small" sx={{ ml: 1 }}>log in</Button>
                    </Link>
                </Box>
            </Paper>
        </Box>
    )
}

export default React.memo(SignUp)