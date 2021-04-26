import './App.css';
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core';
import { useState } from 'react';
import HymnResult from './hymnResult.jsx';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [hymnData, setHymnData] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '20vh',
  }
  const boxWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    backgroundColor: '#FFFFFF',
    zIndex: '1',
    paddingBottom: '20px'
  }
  const onSearch = () => {
    setWaitingResponse(true);
    // Fetch data
    fetch(`https://hymnary.org/api/scripture?reference=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        setHymnData(data);
        console.log(data);
        setWaitingResponse(false);
      })
  }
  /**
   * Renders the hymn data
   */
  const renderHymnData = () => {
    // Return nothing if there is no data
    if (!hymnData || Object.keys(hymnData).length === 0) {
      return (null);
    }
    // Render
    return Object.keys(hymnData).map((hymnKey) => {
        const data = hymnData[hymnKey];
        return <HymnResult
          key={hymnKey}
          title={hymnKey}
          originalLanguage={data['original language']}
          scripture={data['scripture references']}
          author={data.author}
          textLink={data['text link']}
        />
      }
    )
  }
  const renderWaiting = () => {
    if (waitingResponse) {
      return (
      <div style={{ display: 'flex',
        justifyContent: 'center',
        padding: '20px' }}>
        <CircularProgress/>
      </div>
      )
    }
    return (null)
  }
  return (
    <div style={pageStyle}>
      <div style={boxWrapperStyle}>
        <Typography variant="h2" component="h2">
          Hymn Finder
        </Typography>
        <Typography color="textSecondary">
          By Ashley Cheung
        </Typography>
        <TextField
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
          style={{ width: '100%' }}
          id='standard-basic'
          label='Bible Verse'/>
        <Button onClick={onSearch} style={{ marginTop: '50px' }} color='primary'  variant='contained'>Search Hymn</Button>
      </div>
      { renderWaiting() }
      { renderHymnData() }
    </div>
  );
}

export default App;
