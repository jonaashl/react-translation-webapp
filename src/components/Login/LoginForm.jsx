import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import { useUser } from "../../state/UserContext";
import { storageSave } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY_USER } from "../../const/storageKeys";

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
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        if (user !== null) {
            navigate("profile");
        }
    }, [user, navigate]);

    const onSubmit = async ({ username }) => {
        setLoading(true);
        const [error, userResponse] = await loginUser(username);
        if (error !== null) {
            setApiError(error);
        }
        if (userResponse !== null) {
            storageSave(STORAGE_KEY_USER, userResponse);
            setUser(userResponse);
        }
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
                        placeholder="Ola Nordmann"
                        maxLength={24}
                        {...register("username", usernameConfig)}
                    />
                    {errorMessage}
                </fieldset>

                <button type="submit" disabled={loading}>
                    Login
                </button>
                {loading && <p>Logging in...</p>}
                {apiError && <p>{apiError}</p>}
            </form>
        </>
    );
};

export default LoginForm;
