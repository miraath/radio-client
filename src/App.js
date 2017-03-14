import React, { Component, PropTypes } from 'react';
import axios from 'axios';

// import logo from './logo.svg';
import './App.css';

const url = 'http://192.34.56.9';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      current: false,
    };
  }
  componentDidMount() {
    axios.get(`${url}/radiostations.json`)
      .then((res) => {
        const stations = res.data;
        this.setState({ stations, current: stations[0].slug });
        // console.log(stations);
      });
  }

  handleClick = (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    this.setState({ ...this.state, current: e.target.name });
  }

  render() {
    const { stations, current } = this.state;

    const station = (stations.filter(item => (
      item.slug === current
    )))[0];
    console.log(station);

    return (
      <div className="App">
        {
          (current !== false) &&
          <div>
            <div className="">
              <h2>الأقسام</h2>
              <ul>
                {stations.map(item => (
                  <li key={item.slug}>
                    <a name={item.slug} href={`#${item.slug}`} onClick={this.handleClick}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h2>{station.name}</h2>
              <p>{station.description}</p>
              <img src={url + station.logo} alt="صورة" />
              <audio
                src={station.streaming_url}
                controls="controls"
                autoPlay
              >
                Your browser does not support the <code>audio</code> element.
              </audio>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>يبث الآن</th>
                      <th>معدل البث</th>
                      <th>المستمعين</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="info">
                      <td>{station.live_info.current_playing}</td>
                      <td>32 Kbps</td>
                      <td>{station.live_info.listeners_count}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        }
        {
          (current === false) &&
          <h2>Loading</h2>
        }
      </div>
    );
  }
}

export default App;
