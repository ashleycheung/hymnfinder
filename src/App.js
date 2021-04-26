import './App.css';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  createMuiTheme,
  ThemeProvider,
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import HymnResult from './hymnResult.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/free-solid-svg-icons'

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#EB4B64',
    },
    secondary: {
      main: '#F7BBD0',
    },
  }
})

function App() {
  const [inputValue, setInputValue] = useState('');
  const [hymnData, setHymnData] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [showError, setShowError] = useState(false);
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
    paddingBottom: '20px',
    paddingTop: '20px'
  }
  const onSearch = () => {
    setWaitingResponse(true);
    // Fetch data
    fetch(`https://hymnary.org/api/scripture?reference=${inputValue}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setHymnData(data);
      })
      .catch((error) => {
        setShowError(true);
      })
      .finally(() => setWaitingResponse(false))
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
    <ThemeProvider theme={appTheme}>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={showError} autoHideDuration={6000} onClose={() => {setShowError(false)}}>
        <Alert severity='error'>Could not find the given bible verse</Alert>
      </Snackbar>
      <div style={pageStyle}>
        <div style={boxWrapperStyle}>
          <Typography style={{ fontSize: '5vh' }} variant="h2" component="h2">
            <FontAwesomeIcon icon={faCross}/>  Hymn Finder
          </Typography>
          <Typography color="textSecondary">
            By Ashley Cheung
          </Typography>
          <TextField
            value={inputValue}
            onChange={(e) => {setInputValue(String(e.target.value))}}
            style={{ width: '100%' }}
            id='standard-basic'
            label='Bible Verse'/>
          <Button onClick={onSearch} style={{ marginTop: '50px' }} color='primary'  variant='contained'>Search Hymn</Button>
        </div>
        { renderWaiting() }
        { renderHymnData() }
      </div>
    </ThemeProvider>
  );
}

export default App;
