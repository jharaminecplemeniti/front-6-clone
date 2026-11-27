import { createContext, useContext, useState } from "react";

const TOKEN_KEY = "pikachu";
const NICKNAME_KEY = "nadimak";
const LOGIN_URL =
    "https://front6.edukacija.online/backend/wp-json/jwt-auth/v1/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [nickname, setNickname] = useState(() =>
        localStorage.getItem(NICKNAME_KEY)
    );

    const login = async (username, password, fallbackNickname = "") => {
        let response;
        let data;

        try {
            response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            data = await response.json();
        } catch {
            throw new Error(
                "Došlo je do pogreške prilikom povezivanja s poslužiteljem. Pokušajte ponovno."
            );
        }

        if (!response.ok || !data.token) {
            throw new Error(
                data.message || "Prijava nije uspjela. Provjerite podatke."
            );
        }

        const nextNickname =
            data.user_nicename || fallbackNickname || nickname;

        localStorage.setItem(TOKEN_KEY, data.token);
        if (nextNickname) {
            localStorage.setItem(NICKNAME_KEY, nextNickname);
        }

        setToken(data.token);
        setNickname(nextNickname || null);
        return data;
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(NICKNAME_KEY);
        setToken(null);
        setNickname(null);
    };

    const updateNickname = (value) => {
        localStorage.setItem(NICKNAME_KEY, value);
        setNickname(value);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                nickname,
                isAuthenticated: Boolean(token),
                login,
                logout,
                updateNickname,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth mora se koristiti unutar AuthProvidera.");
    }

    return context;
}
