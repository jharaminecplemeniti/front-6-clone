
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Prijava() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Provjera postojeće prijave
    useEffect(() => {
        const token = localStorage.getItem("pikachu");
        const nadimak = localStorage.getItem("nadimak");

        if (token && nadimak) {
            window.location.href = "/";
        }
    }, []);

    // Obrada prijave
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://front6.edukacija.online/backend/wp-json/jwt-auth/v1/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("pikachu", data.token);

                // Spremanje nadimka ako ga API vraća
                if (data.user_nicename) {
                    localStorage.setItem("nadimak", data.user_nicename);
                }

                window.location.href = "/";
            } else {
                setError(
                    data.message || "Prijava nije uspjela. Provjerite podatke."
                );
            }
        } catch (err) {
            console.error("Greška prilikom prijave:", err);

            setError(
                "Došlo je do pogreške prilikom povezivanja s poslužiteljem. Pokušajte ponovno."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-shell">

                {/* LIJEVA STRANA */}
                <div className="login-intro">
                    <span className="login-eyebrow">
                        DOBRO DOŠLI NATRAG
                    </span>

                    <h1>
                        Drago nam je
                        <br />
                        što ste ovdje.
                    </h1>

                    <p>
                        Prijavite se i nastavite otkrivati recepte,
                        čuvati omiljene ideje i stvarati nešto ukusno.
                    </p>

                    <div className="login-decoration" aria-hidden="true">
                        <span>Ž</span>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>

                    <p className="login-side-note">
                        Malo inspiracije, prstohvat začina
                        <br />
                        i puno ljubavi na svakom tanjuru.
                    </p>
                </div>

                {/* DESNA STRANA – OBRAZAC */}
                <div className="login-form-panel">

                    <div className="login-form-heading">
                        <span className="login-small-mark">Ž</span>

                        <div>
                            <span className="login-kicker">
                                ŽLICA & ZAČIN
                            </span>

                            <h2>Prijava</h2>

                            <p>
                                Unesite svoje podatke za pristup računu.
                            </p>
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>

                        <label htmlFor="login-email">
                            E-mail adresa
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="primjer@mail.com"
                            autoComplete="email"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="Unesite ispravnu e-mail adresu, npr. primjer@mail.com"
                            required
                        />

                        <div className="login-password-label">
                            <label htmlFor="login-password">
                                Lozinka
                            </label>

                            <Link to="/zaboravljena-lozinka">
                                Zaboravili ste lozinku?
                            </Link>
                        </div>

                        <div className="login-password-field">
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Unesite lozinku"
                                autoComplete="current-password"
                                pattern="(?=.*[0-9])(?=.*[.,!?#&+=]).{7,}"
                                title="Lozinka mora imati najmanje 7 znakova, barem jedan broj i jedan simbol (.,!?#&+=)."
                                minLength={7}
                                required
                            />

                            <button
                                type="button"
                                className="login-show-password"
                                onClick={() => setShowPassword((value) => !value)}
                                aria-label={
                                    showPassword
                                        ? "Sakrij lozinku"
                                        : "Prikaži lozinku"
                                }
                            >
                                {showPassword ? "Sakrij" : "Prikaži"}
                            </button>
                        </div>

                        <label className="login-remember">
                            <input type="checkbox" />
                            <span>Zapamti me</span>
                        </label>

                        {/* PORUKA O GREŠCI */}
                        {error && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            className="login-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Prijavljivanje..." : "Prijavi se"}
                            {!loading && (
                                <span aria-hidden="true"> →</span>
                            )}
                        </button>

                    </form>

                    <div className="login-register">
                        Još nemate račun?{" "}
                        <Link to="/registracija">
                            Registrirajte se
                        </Link>
                    </div>

                    <div className="login-form-footer">
                        <span>Žlica & začin</span>
                        <span>RECEPTI ZA SVAKI DAN</span>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default Prijava;
