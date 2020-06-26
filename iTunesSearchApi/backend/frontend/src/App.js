import React from 'react';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Favorite from './components/Favorite.js';
import Utils from './components/Utils.js';
import './style/App.css'

const options = [
    'All',
    'Audiobook',
    'eBook',
    'Movie',
    'Music',
    'Music Video',
    'Podcast',
    'TV Show',
    'Software'
];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            media: "All",
            data: [],
            favoriteList: []
        };

        this.addToFavorite = this.addToFavorite.bind(this);
        this.removefromFavorite = this.removefromFavorite.bind(this);
    }

    handleInputChange = e => {
        const query = e.target.value;
        const media = this.state.media;

        this.setState({
            query: query
        });

        this.componentDidMount(query, media);
    };

    handleDropdownClick = e => {
        const media = e.target.text;

        this.setState({
            media: media
        });
    }

    getData = (query, media) => {
        if (!query) {
            this.setState({
                query,
                data: []
            });
        } else {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            console.log(Utils.removeWhiteSpace(query));

            fetch(`/music/${Utils.removeWhiteSpace(query)}/${media.toLowerCase()}`, requestOptions)
                .then(res => res.json())
                .then(
                    (res) => {
                        this.setState({
                            data: res.results
                        });
                    },
                    (error) => {
                        console.log('error', error)
                    });
        }
    };

    componentDidMount = (query, media) => {
        this.getData(query, media);
    }

    addToFavorite(data, index) {
        const { favoriteList } = this.state;
        const { previewUrl, trackName, artworkUrl100 } = data;

        let item = {
            id: index,
            link: previewUrl,
            title: trackName,
            img: artworkUrl100
        };

        this.setState({ favoriteList: [...favoriteList, item] });
    };

    removefromFavorite(index) {
        let { favoriteList } = this.state;

        favoriteList.map((favorite, key) => {
            console.log(index, key, favorite.id);

            if (index === favorite.id) {
                favoriteList.splice(key, 1);
            }
        });

        this.setState({ favoriteList: [...favoriteList] });
    }

    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossorigin="anonymous"
                />
                <h3 className="center">iTunes Search API:</h3>
                <Container fluid className="search-wrapper">
                    <Row className="justify-content-md-center">
                        <Col xs lg="1">
                            <div className="searchForm">
                                <form>
                                    <input
                                        placeholder="Search for..."
                                        value={this.state.query}
                                        onChange={this.handleInputChange}
                                    />
                                </form>
                            </div>
                        </Col>
                        <Col xs lg="1">
                            <div>
                                <Dropdown className="dropdown-wrapper">
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
                                        {this.state.media}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {options.map((options) =>
                                            <Dropdown.Item
                                                value={options}
                                                onClick={this.handleDropdownClick}
                                            >
                                                {options}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Row className="search-result-wrapper justify-content-md-center">
                        <Col>
                            <div>
                                {this.state.data.map((data, index) => {
                                    return (
                                        <div className="card-wrapper">
                                            <div className="card">
                                                <div className="card-image center">
                                                    <a key={index} href={data.link}>
                                                        <img
                                                            alt="img"
                                                            className="activator"
                                                            src={data.artworkUrl100.replace('100x100', '200x200')}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title activator grey-text text-darken-4">{data.trackName || data.collectionName}</span>
                                                    <p>
                                                        <a target="_blank" href={data.trackViewUrl || data.collectionViewUrl}>See More</a>
                                                    </p>
                                                </div>
                                                <div className="card-reveal">
                                                    <span className="card-title grey-text text-darken-4">Description</span>
                                                    <p>{data.longDescription || data.description || 'None.'}</p>
                                                </div>
                                                <div>
                                                    <Button
                                                        className="Btn"
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => this.addToFavorite(data, index)}
                                                    >
                                                        Add to favorite
                                                    </Button>
                                                    <Button
                                                        className="Btn"
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => this.removefromFavorite(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                        <Col lg="4">
                            <Favorite favoriteList={this.state.favoriteList} />
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default App;