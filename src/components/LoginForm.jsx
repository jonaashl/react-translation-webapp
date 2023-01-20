import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/user";

const usernameConfig = {
    required: true,
    minLength: 3,
    maxLength: 23,
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const onSubmit = async ({ username }) => {
        setLoading(true);
        const [error, user] = await loginUser(username);
        console.log("Error: " + error);
        console.log("User: " + user);
        setLoading(false);
    };

    const errorMessage = (() => {
        if (!errors.username) {
            return null;
        }

        if (errors.username.type === "required") {
            return <span>Username is required</span>;
        }
        if (errors.username.type === "minLength") {
            return <span>Username is too short (min 3)</span>;
        }
        if (errors.username && errors.username.type === "maxLength") {
            return <span>Max length reached (max 24)</span>;
        }
    })();

    return (
        <>
            <h2>Enter name:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        maxLength={24}
                        {...register("username", usernameConfig)}
                    />
                    {errorMessage}
                </fieldset>

                <button type="submit" disabled={loading}>Login</button>
                {loading && <p>Logging in...</p>}
            </form>
        </>
    );
};

export default LoginForm;