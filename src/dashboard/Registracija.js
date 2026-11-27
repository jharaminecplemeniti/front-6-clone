
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Registracija() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    // Prvo slovo veliko, ostala slova mala
    const formatName = (value) => {
        const lettersOnly = value.replace(
            /[^a-zA-ZčćžšđČĆŽŠĐ\s-]/g,
            ""
        );

        return lettersOnly
            .toLocaleLowerCase("hr-HR")
            .replace(/(^|[\s-])(\p{L})/gu, (match, separator, letter) =>
                separator + letter.toLocaleUpperCase("hr-HR")
            );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setMessageType("");

        // Provjera podudaranja lozinki
        if (password !== confirmPassword) {
            setMessage("Lozinke se ne podudaraju.");
            setMessageType("error");
            return;
        }

        // Provjera prihvaćanja uvjeta
        if (!acceptedTerms) {
            setMessage("Morate prihvatiti uvjete korištenja.");
            setMessageType("error");
            return;
        }

        setLoading(true);

        try {
            // REGISTRACIJA
            const response = await fetch(
                "https://front6.edukacija.online/backend/wp-json/custom/v1/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password,
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                const serverMessage = String(
                    data.message || data.error || ""
                );

                const normalizedMessage = serverMessage.toLowerCase();

                // Prepoznavanje već registrirane email adrese
                const emailAlreadyExists =
                    normalizedMessage.includes("email already exists") ||
                    normalizedMessage.includes("email already registered") ||
                    normalizedMessage.includes("email is already registered") ||
                    normalizedMessage.includes("user already exists") ||
                    normalizedMessage.includes("username already exists") ||
                    normalizedMessage.includes("already taken") ||
                    normalizedMessage.includes("already in use") ||
                    normalizedMessage.includes("already registered") ||
                    normalizedMessage.includes("email_exists") ||
                    normalizedMessage.includes("existing user") ||
                    normalizedMessage.includes("korisnik već postoji") ||
                    normalizedMessage.includes("email već postoji") ||
                    normalizedMessage.includes("email je već registriran") ||
                    normalizedMessage.includes("email je već registrovan") ||
                    normalizedMessage.includes(
                        "korisničko ime, e-mail ili lozinka su obavezni"
                    );

                const errorMessage = emailAlreadyExists
                    ? "Ova email adresa već je registrirana. Pokušajte se prijaviti."
                    : serverMessage ||
                      "Registracija nije uspjela. Pokušajte ponovno.";

                setMessage(errorMessage);
                setMessageType("error");

                console.error("Greška pri registraciji:", data);
            } else {
                console.log("Registracija uspješna:", data);

                try {
                    await login(email, password, email);
                } catch (loginError) {
                    console.error(
                        "Automatska prijava nakon registracije nije uspjela:",
                        loginError
                    );
                    setMessage(
                        "Registracija je uspješna, ali automatska prijava nije uspjela. Molimo prijavite se ručno."
                    );
                    setMessageType("error");
                    return;
                }

                navigate("/profil", {
                    state: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        profileSetup: true,
                    },
                });
            }
        } catch (error) {
            console.error(
                "Greška prilikom povezivanja s poslužiteljem:",
                error
            );

            setMessage(
                "Došlo je do greške pri povezivanju s poslužiteljem. Pokušajte ponovno."
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-shell registration-shell">

                {/* LIJEVA STRANA */}
                <div className="login-intro">
                    <span className="login-eyebrow">
                        POSTANITE DIO NAŠE PRIČE
                    </span>

                    <h1>
                        Dobro došli
                        <br />
                        za naš stol.
                    </h1>

                    <p>
                        Izradite svoj račun i spremite omiljene recepte,
                        pronađite inspiraciju i uživajte u novim okusima.
                    </p>

                    <div className="login-decoration" aria-hidden="true">
                        <span>Ž</span>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>

                    <p className="login-side-note">
                        Svaki dobar recept počinje
                        <br />
                        prstohvatom inspiracije.
                    </p>
                </div>

                {/* DESNA STRANA – OBRAZAC */}
                <div className="login-form-panel registration-form-panel">

                    <div className="login-form-heading">
                        <span className="login-small-mark">Ž</span>

                        <div>
                            <span className="login-kicker">
                                ŽLICA & ZAČIN
                            </span>

                            <h2>Registracija</h2>

                            <p>
                                Ispunite podatke i izradite svoj račun.
                            </p>
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>

                        {/* IME */}
                        <label htmlFor="register-firstname">
                            Ime
                        </label>

                        <input
                            className="login-name-input"
                            id="register-firstname"
                            type="text"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(formatName(e.target.value))
                            }
                            placeholder="Vaše ime"
                            pattern="[A-ZČĆŽŠĐ][a-zčćžšđ]*(?:[ -][A-ZČĆŽŠĐ][a-zčćžšđ]*)*"
                            title="Ime mora počinjati velikim slovom i sadržavati samo slova."
                            autoComplete="given-name"
                            required
                        />

                        {/* PREZIME */}
                        <label htmlFor="register-lastname">
                            Prezime
                        </label>

                        <input
                            className="login-name-input"
                            id="register-lastname"
                            type="text"
                            value={lastName}
                            onChange={(e) =>
                                setLastName(formatName(e.target.value))
                            }
                            placeholder="Vaše prezime"
                            pattern="[A-ZČĆŽŠĐ][a-zčćžšđ]*(?:[ -][A-ZČĆŽŠĐ][a-zčćžšđ]*)*"
                            title="Prezime mora počinjati velikim slovom i sadržavati samo slova."
                            autoComplete="family-name"
                            required
                        />

                        {/* EMAIL */}
                        <label htmlFor="register-email">
                            E-mail adresa
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="primjer@mail.com"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="Unesite ispravnu e-mail adresu, npr. primjer@mail.com."
                            autoComplete="email"
                            required
                        />

                        {/* LOZINKA */}
                        <label htmlFor="register-password">
                            Lozinka
                        </label>

                        <div className="login-password-field">
                            <input
                                id="register-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Unesite lozinku"
                                pattern="(?=.*[0-9])(?=.*[.,!?#&+=]).{7,}"
                                title="Lozinka mora imati najmanje 7 znakova, barem jedan broj i jedan simbol (.,!?#&+=)."
                                minLength={7}
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="login-show-password"
                                onClick={() =>
                                    setShowPassword((value) => !value)
                                }
                                aria-label={
                                    showPassword
                                        ? "Sakrij lozinku"
                                        : "Prikaži lozinku"
                                }
                            >
                                {showPassword ? "Sakrij" : "Prikaži"}
                            </button>
                        </div>

                        {/* POTVRDA LOZINKE */}
                        <label htmlFor="register-confirm-password">
                            Potvrda lozinke
                        </label>

                        <div className="login-password-field">
                            <input
                                id="register-confirm-password"
                                type={
                                    showConfirmPassword ? "text" : "password"
                                }
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Ponovite lozinku"
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="login-show-password"
                                onClick={() =>
                                    setShowConfirmPassword((value) => !value)
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Sakrij lozinku"
                                        : "Prikaži lozinku"
                                }
                            >
                                {showConfirmPassword ? "Sakrij" : "Prikaži"}
                            </button>
                        </div>

                        {/* UVJETI KORIŠTENJA */}
                        <div className="login-remember registration-terms">
                            <input
                                id="accept-terms"
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) =>
                                    setAcceptedTerms(e.target.checked)
                                }
                                required
                            />

                            <label htmlFor="accept-terms">
                                Prihvaćam
                            </label>

                            <span>
                                <Link
                                    to="/uvjeti-koristenja"
                                    className="me-1"
                                >
                                    uvjete korištenja
                                </Link>
                                {" i "}
                                <Link
                                    to="/privatnost"
                                    className="ms-1"
                                >
                                    pravila privatnosti
                                </Link>.
                            </span>
                        </div>

                        {/* PORUKA */}
                        {message && (
                            <div
                                className={`alert ${
                                    messageType === "success"
                                        ? "alert-success"
                                        : "alert-danger"
                                }`}
                                role="alert"
                            >
                                {message}
                            </div>
                        )}

                        {/* GUMB */}
                        <button
                            className="login-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Registracija u tijeku..."
                                : "Registriraj se"}
                            {!loading && (
                                <span aria-hidden="true"> →</span>
                            )}
                        </button>

                    </form>

                    {/* PRIJAVA */}
                    <div className="login-register">
                        Već imate račun?{" "}
                        <Link to="/prijava">
                            Prijavite se!
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

export default Registracija;
