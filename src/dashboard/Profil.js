
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Profil() {
    const location = useLocation();
    const navigate = useNavigate();
    const { nickname, updateNickname } = useAuth();

    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [nadimak, setNadimak] = useState("");
    const [email, setEmail] = useState("");
    const [profilnaSlika, setProfilnaSlika] = useState("");
    const [novaLozinka, setNovaLozinka] = useState("");
    const [potvrdaLozinke, setPotvrdaLozinke] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Učitavanje spremljenih podataka profila
    // i podataka prenesenih nakon registracije
    useEffect(() => {
        const spremljeniProfil = JSON.parse(
            localStorage.getItem("profil") || "{}"
        );

        const podaciRegistracije = location.state;

        // Ako korisnik dolazi nakon registracije
        if (podaciRegistracije?.profileSetup) {
            setIme(podaciRegistracije.firstName || "");
            setPrezime(podaciRegistracije.lastName || "");
            setEmail(podaciRegistracije.email || "");

            setNadimak(
                spremljeniProfil.nadimak ||
                podaciRegistracije.firstName ||
                ""
            );

            setProfilnaSlika(
                spremljeniProfil.profilnaSlika || ""
            );
        } else {
            // Ako korisnik dolazi na profil uobičajenim putem
            setIme(spremljeniProfil.ime || "");
            setPrezime(spremljeniProfil.prezime || "");

            setNadimak(
                spremljeniProfil.nadimak ||
                nickname ||
                ""
            );

            setEmail(spremljeniProfil.email || "");
            setProfilnaSlika(
                spremljeniProfil.profilnaSlika || ""
            );
        }
    }, [location.state, nickname]);

    // Odabir profilne slike
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setError("");
        setMessage("");

        if (!file.type.startsWith("image/")) {
            setError("Molimo odaberite slikovnu datoteku.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Slika ne smije biti veća od 2 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilnaSlika(reader.result);
        };

        reader.readAsDataURL(file);
    };

    // Uklanjanje profilne slike
    const removeProfileImage = () => {
        setProfilnaSlika("");
    };

    // Spremanje promjena
    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        // Provjera nadimka
        if (!nadimak.trim()) {
            setError("Nadimak je obavezan.");
            return;
        }

        // Provjera lozinke ako je korisnik želi promijeniti
        if (novaLozinka || potvrdaLozinke) {
            if (novaLozinka.length < 7) {
                setError("Nova lozinka mora imati najmanje 7 znakova.");
                return;
            }

            if (!/(?=.*[0-9])(?=.*[.,!?#&+=])/.test(novaLozinka)) {
                setError(
                    "Lozinka mora sadržavati barem jedan broj i jedan simbol (.,!?#&+=)."
                );
                return;
            }

            if (novaLozinka !== potvrdaLozinke) {
                setError("Lozinke se ne podudaraju.");
                return;
            }
        }

        const profil = {
            ime,
            prezime,
            nadimak,
            email,
            profilnaSlika,
        };

        // Spremanje podataka profila
        localStorage.setItem("profil", JSON.stringify(profil));
        updateNickname(nadimak);

        setNovaLozinka("");
        setPotvrdaLozinke("");

        setMessage(
            "Promjene su spremljene! Promjena lozinke bit će aktivna nakon povezivanja s poslužiteljem."
        );

        // Uklanjanje registracijskih podataka iz Router statea
        // kako se nakon ponovnog otvaranja profila ne bi ponovno učitavali
        if (location.state?.profileSetup) {
            navigate("/profil", { replace: true, state: null });
        }
    };

    // Vraćanje spremljenih podataka
    const handleCancel = () => {
        const spremljeniProfil = JSON.parse(
            localStorage.getItem("profil") || "{}"
        );

        // Ako profil još nije spremljen, vraćamo podatke registracije
        if (location.state?.profileSetup) {
            setIme(location.state.firstName || "");
            setPrezime(location.state.lastName || "");
            setEmail(location.state.email || "");

            setNadimak(
                spremljeniProfil.nadimak ||
                location.state.firstName ||
                ""
            );

            setProfilnaSlika(
                spremljeniProfil.profilnaSlika || ""
            );
        } else {
            setIme(spremljeniProfil.ime || "");
            setPrezime(spremljeniProfil.prezime || "");

            setNadimak(
                spremljeniProfil.nadimak ||
                nickname ||
                ""
            );

            setEmail(spremljeniProfil.email || "");
            setProfilnaSlika(
                spremljeniProfil.profilnaSlika || ""
            );
        }

        setNovaLozinka("");
        setPotvrdaLozinke("");
        setError("");
        setMessage("");
    };

    return (
        <main className="profile-page">
            <section className="profile-container">

                {/* NASLOV */}
                <div className="profile-header">
                    <span className="profile-kicker">
                        ŽLICA & ZAČIN
                    </span>

                    <h1>Moj profil</h1>

                    <p>
                        Uredi svoje podatke i prilagodi svoj profil.
                    </p>
                </div>

                {/* PROFILNA SLIKA */}
                <div className="profile-avatar-section">

                    <div className="profile-avatar">
                        {profilnaSlika ? (
                            <img
                                src={profilnaSlika}
                                alt="Profilna slika"
                            />
                        ) : (
                            <span>
                                {ime || nadimak
                                    ? (ime || nadimak).charAt(0).toUpperCase()
                                    : "Ž"}
                            </span>
                        )}
                    </div>

                    <div className="profile-avatar-actions">
                        <label
                            htmlFor="profile-image"
                            className="profile-image-button"
                        >
                            Promijeni sliku
                        </label>

                        <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />

                        {profilnaSlika && (
                            <button
                                type="button"
                                className="profile-remove-image"
                                onClick={removeProfileImage}
                            >
                                Ukloni sliku
                            </button>
                        )}

                        <p>
                            JPG, PNG ili druga slika (maks. 2 MB)
                        </p>
                    </div>
                </div>

                {/* OBRAZAC PROFILA */}
                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="profile-section-heading">
                        <h2>Osobni podaci</h2>
                        <p>
                            Podaci koji će biti prikazani na tvom profilu.
                        </p>
                    </div>

                    {/* IME I PREZIME */}
                    <div className="profile-fields-row">

                        <div className="profile-field">
                            <label htmlFor="profile-name">
                                Ime
                            </label>

                            <input
                                id="profile-name"
                                type="text"
                                value={ime}
                                onChange={(e) => setIme(e.target.value)}
                                placeholder="Unesi ime"
                                autoComplete="given-name"
                            />
                        </div>

                        <div className="profile-field">
                            <label htmlFor="profile-surname">
                                Prezime
                            </label>

                            <input
                                id="profile-surname"
                                type="text"
                                value={prezime}
                                onChange={(e) => setPrezime(e.target.value)}
                                placeholder="Unesi prezime"
                                autoComplete="family-name"
                            />
                        </div>

                    </div>

                    {/* NADIMAK */}
                    <div className="profile-field">
                        <label htmlFor="profile-nickname">
                            Nadimak
                        </label>

                        <input
                            id="profile-nickname"
                            type="text"
                            value={nadimak}
                            onChange={(e) => setNadimak(e.target.value)}
                            placeholder="Unesi nadimak"
                            required
                        />

                        <small>
                            Nadimak će se koristiti za prikaz uz tvoje komentare.
                        </small>
                    </div>

                    {/* EMAIL */}
                    <div className="profile-field">
                        <label htmlFor="profile-email">
                            E-mail adresa
                        </label>

                        <input
                            id="profile-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="primjer@mail.com"
                            autoComplete="email"
                        />
                    </div>

                    {/* LOZINKA */}
                    <div className="profile-section-heading profile-password-heading">
                        <h2>Promjena lozinke</h2>
                        <p>
                            Ako ne želiš promijeniti lozinku, ostavi polja prazna.
                        </p>
                    </div>

                    <div className="profile-fields-row">

                        <div className="profile-field">
                            <label htmlFor="profile-password">
                                Nova lozinka
                            </label>

                            <div className="profile-password-field">
                                <input
                                    id="profile-password"
                                    type={showPassword ? "text" : "password"}
                                    value={novaLozinka}
                                    onChange={(e) =>
                                        setNovaLozinka(e.target.value)
                                    }
                                    placeholder="Nova lozinka"
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((value) => !value)
                                    }
                                >
                                    {showPassword ? "Sakrij" : "Prikaži"}
                                </button>
                            </div>
                        </div>

                        <div className="profile-field">
                            <label htmlFor="profile-confirm-password">
                                Potvrda lozinke
                            </label>

                            <input
                                id="profile-confirm-password"
                                type={showPassword ? "text" : "password"}
                                value={potvrdaLozinke}
                                onChange={(e) =>
                                    setPotvrdaLozinke(e.target.value)
                                }
                                placeholder="Ponovi novu lozinku"
                                autoComplete="new-password"
                            />
                        </div>

                    </div>

                    {/* PORUKE */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="alert alert-success" role="status">
                            {message}
                        </div>
                    )}

                    {/* GUMBI */}
                    <div className="profile-form-actions">

                        <button
                            type="button"
                            className="profile-cancel-button"
                            onClick={handleCancel}
                        >
                            Odustani
                        </button>

                        <button
                            type="submit"
                            className="profile-save-button"
                        >
                            Spremi promjene
                        </button>

                    </div>

                </form>

                {/* POVRATAK */}
                <div className="profile-back">
                    <Link to="/">
                        ← Povratak na početnu
                    </Link>
                </div>

            </section>
        </main>
    );
}

export default Profil;
