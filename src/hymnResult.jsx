import React from 'react';
import PropTypes from 'prop-types';
import { Card,
  CardContent,
  Typography,
  CardActions,
  Button } from '@material-ui/core';

export default function HymnResult (props) {
  const lyricsOnClick = () => {
    window.open(props.textLink)
  }
  return (
    <Card style={{ marginTop: '15px' }} variant='outlined'>
      <CardContent>
      <Typography variant="h5" component="h2">
        {props.title}
      </Typography>
      <Typography color="textSecondary">
        {props.author}
      </Typography>
      <Typography variant="body2" component="p">
        {props.scripture}
      </Typography>
      </CardContent>
      <CardActions style={{display: 'flex', justifyContent: 'center'  }}>
        <Button onClick={lyricsOnClick} size="small" color="primary">
          Lyrics
        </Button>
      </CardActions>
    </Card>
  )
}

HymnResult.propTypes = {
  title: PropTypes.string,
  originalLanguage: PropTypes.string,
  scripture: PropTypes.string,
  author: PropTypes.string,
  textLink: PropTypes.string,
}