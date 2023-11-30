import { useState, useEffect } from "react";
import Map from "./Map";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled("div")`
  height: 500px;
`;

const Header = styled("h1")`
  font-size: 50px;
  font-weight: 300;
  margin: 10px;
`;

const HeaderInfo = styled("p")`
  font-size: 30px;
  font-weight: 200;
  margin: 10px;
`;

const Form = styled("form")`
  display: flex;
  height: 300px;
  margin: 20px;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  flex-grow: 0;
`;

const Result = styled("div")``;
const ResultDespriction = styled("p")`
  font-size: 25px;
  font-weight: 100;
  margin: 10px;
`;
const ResultValue = styled("span")``;

function MyApp() {
  const [position, setPosition] = useState([41.881832, -87.623177]);
  const [lat, long] = position;
  const [time, setTime] = useState(dayjs("2022-04-17T15:30"));
  const [safety, setSafety] = useState({
    score: "--",
    crime: "--",
    women: "--",
  });

  function mapChangeHandler(pos) {
    setPosition(pos);
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const URL = "https://location-safety.onrender.com/sentiment_score";
      // const URL = "http://127.0.0.1:8000/sentiment_score";
      const val = await axios.post(URL, {
        lat: lat,
        long: long,
        hour: time.hour(),
        minute: time.minute(),
      });
      const { score, crime, women } = val.data;
      setSafety({ score, crime, women });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid height={"100vh"} width={"100vw"} container spacing={2}>
        <Grid height={"100%"} width={"100%"} item xs={12} md={6} lg={5}>
          <FormContainer>
            <Header>Safety in Chicago</Header>
            <HeaderInfo>Predict your Safety</HeaderInfo>
            <Form onSubmit={submitHandler}>
              <TextField
                disabled
                id="outlined"
                label="Latitute"
                value={lat}
                type="number"
              />
              <TextField
                disabled
                id="outlined"
                label="Longitute"
                value={long}
                type="number"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Pick the Time"
                    value={time}
                    onChange={(newValue) => {
                      console.log(newValue.hour(), newValue.minute());
                      setTime(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button size="large" type="submit">
                is It Safe?
              </Button>
            </Form>
            <Result>
              <ResultDespriction>
                The Chances of being safe:
                <ResultValue>{` ${
                  safety.score == "--" ? "--" : safety.score * 100
                }%`}</ResultValue>
              </ResultDespriction>
              <ResultDespriction>
                Most Probable Crime:
                <ResultValue>{` ${safety.crime}`}</ResultValue>
              </ResultDespriction>
              <ResultDespriction>
                The Chances of being on Women:
                <ResultValue>{` ${
                  safety.women == "--" ? "--" : safety.women * 100
                }%`}</ResultValue>
              </ResultDespriction>
            </Result>
          </FormContainer>
        </Grid>
        <Grid height={"100%"} width={"100%"} item xs={12} md={6} lg={7}>
          <Map position={position} onChange={mapChangeHandler} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyApp;
