import { useState, useEffect } from "react";
import "./Page.css";

function Page({ pageID }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(
      "https://front6.edukacija.online/backend/wp-json/wp/v2/pages/" +
        pageID
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Stranica nije pronađena.");
        }
        return res.json();
      })
      .then((data) => {
        setPage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [pageID]);

  if (loading) {
    return (
      <div className="page-loading">
        <p>Učitavanje stranice...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="page-error">
        <h2>Stranica nije pronađena.</h2>
        <p>Pokušajte ponovno kasnije.</p>
      </div>
    );
  }

  return (
    <main className="custom-page">
      <section className="custom-page-header">
        <div className="custom-page-container">
          <p className="custom-page-eyebrow">Žlica & začin</p>

          <h1
            dangerouslySetInnerHTML={{
              __html: page.title.rendered,
            }}
          />
        </div>
      </section>

      <section className="custom-page-container custom-page-content-wrapper">
        <article
          className="custom-page-content"
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />
      </section>
    </main>
  );
}

export default Page;