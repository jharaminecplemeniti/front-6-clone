/* ovu stranicu treba promjeniti iz ugostiteljskih objekata u recepte*/

import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Recepti.css";

function Recipes(){
    const [posts, setPosts] = useState([]);

     const [venueType, setVenueType] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState("");

    const [lokacije, setLokacije] = useState([]);
    const [selectedLokacija, setSelectedLokacija] = useState("");


    useEffect(() => {
       fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/venue_type?_fields=id,name")
            .then(res => res.json())
            .then(data => setVenueType(data))
            .catch(err => console.log(err))

        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/lokacija?_fields=id,name&per_page=100")
            .then(res => res.json())
            .then(data => setLokacije(data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        let url = "https://front6.edukacija.online/backend/wp-json/wp/v2/venue?"

        if(selectedVenue) url += "venue_type=" + selectedVenue + "&";
        if(selectedLokacija) url += "lokacija=" + selectedLokacija;

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, [selectedVenue, selectedLokacija]);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Recepti</h1>
            <div className="row">
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedVenue}
                        onChange={e => setSelectedVenue(e.target.value)}
                    >
                        <option value="">Svi objekti</option>
                        {
                            venueType.map(type => {
                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedLokacija}
                        onChange={e => setSelectedLokacija(e.target.value)}
                    >
                        <option value="">Sve lokacije</option>
                        {
                            lokacije.map(lokacija => {
                                return <option key={lokacija.id} value={lokacija.id}>{lokacija.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="row">
                {
                    posts.map(post => {
                        return(
                            <div className="col-md-4">
                                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
                               
                                <Link to={'/recipes/' + post.slug}>Pročitaj više</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Recipes;