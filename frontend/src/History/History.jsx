import React, { Component } from "react";
import "./History.css";
import ResultList from "../ResultList/ResultList";
import { ListGroupItem, Grid, Row, Col, Media } from "react-bootstrap";
import axios from "axios";

class History extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      surveys: [
        {
          climate: "1",
          busy: "",
          population: "",
          precipitation: "",
          density: "",
          expensive: "",
          startAirport: "",
          startDate: "mm-dd-yyyy",
          endDate: "mm-dd-yyyy"
        },
        {
          climate: "2",
          busy: "",
          population: "",
          precipitation: "",
          density: "",
          expensive: "",
          startAirport: "",
          startDate: "mm-dd-yyyy",
          endDate: "mm-dd-yyyy"
        },
        {
          climate: "3",
          busy: "",
          population: "",
          precipitation: "",
          density: "",
          expensive: "",
          startAirport: "",
          startDate: "mm-dd-yyyy",
          endDate: "mm-dd-yyyy"
        }
      ]
    };
  }
  render() {
    let results;
    if (this.state.surveys.length === 0) {
      results = <h1 style={{ textAlign: "center" }}>There are no results.</h1>;
    } else {
      results = (
        <Grid className="History">
          <Row>
            <h3>Survey History</h3>
            {this.forLoopSurveys()}
          </Row>
        </Grid>
      );
    }
    return <div>{results}</div>;
  }

  forLoopSurveys() {
    const historyList = [];
    for (let i = 0; i < this.state.surveys.length; i++) {
      historyList.push(
        // <Col xs={8} md={8} key={this.state.surveys[i]}>
        <ListGroupItem className="HistoryResult" key={i}>
          <Media>
            <Media.Body>
              <Media.Heading>
                <strong>Survey choices: </strong>{" "}
              </Media.Heading>
              <Col xs={4}>
                Start Date: {this.state.surveys[i].startDate} <br />
                End Date: {this.state.surveys[i].endDate} <br />
                Closest airport: {this.state.surveys[i].startAirport} <br />
                Budget: {this.state.surveys[i].expensive} <br />
              </Col>
              <Col xs={4}>
                Population: {this.state.surveys[i].population} <br />
                Small or big city: {this.state.surveys[i].density} <br />
                How quiet or busy: {this.state.surveys[i].busy} <br />
                Preferred Temperature: {this.state.surveys[i].climate} <br />
                Preferred Amount of Precipitation:{" "}
                {this.state.surveys[i].precipitation} <br />
              </Col>
              <Col xs={4}>
                <br />
                <ResultList ts={this.state.surveys[i]} />
              </Col>
            </Media.Body>
          </Media>
        </ListGroupItem>
        // </Col>
      );
    }
    return historyList;
  }

  getSurveys() {
    return axios
      .get("/getSurveys")
      .then(function(response) {
        console.log(response.data);
        this.setState({ surveys: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount = () => {
    this.getSurveys();
    // document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}
export default History;
