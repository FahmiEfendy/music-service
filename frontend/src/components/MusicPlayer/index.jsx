import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Avatar, Box, Container, IconButton, Typography } from '@mui/material';

import getTime from '@utils/getTime';
import { selectSongDetail } from './selectors';

import classes from './style.module.scss';

const MusicPlayer = ({ songDetail }) => {
  const ref = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [appTime, setAppTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.2);

  const isPlayingToggler = () => {
    setIsPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <Box className={classes.player_container}>
      <Container className={classes.player_container_inner}>
        <Box className={classes.song_info}>
          <Avatar src={songDetail?.data?.songCoverUrl} className={classes.cover}>
            <AudiotrackIcon />
          </Avatar>
          <Box className={classes.song_info_text}>
            <Typography variant="body1">{songDetail.data.title}</Typography>
            <Typography variant="body1">{songDetail.data.singer}</Typography>
          </Box>
        </Box>

        <Box className={classes.indicator}>
          <Box className={classes.playbtn}>
            {isPlaying ? (
              <IconButton onClick={isPlayingToggler}>
                <PauseCircleOutlineIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            ) : (
              <IconButton onClick={isPlayingToggler}>
                <PlayCircleOutlineIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            )}
          </Box>
          <Box className={classes.bar}>
            <Typography variant="body1">{getTime(appTime)}</Typography>
            <input
              type="range"
              step="any"
              value={appTime}
              min={0}
              max={duration}
              onInput={(e) => setSeekTime(e.target.value)}
            />
            <Typography variant="body1">{getTime(songDetail?.data?.songDuration)}</Typography>
          </Box>
        </Box>

        <Box className={classes.volume}>
          {volume === 0 && <VolumeOffIcon onClick={() => setVolume(0.2)} />}
          {volume > 0 && volume <= 0.5 && <VolumeDownIcon onClick={() => setVolume(0)} />}
          {volume > 0.5 && volume <= 1 && <VolumeUpIcon onClick={() => setVolume(0)} />}
          <input type="range" step="any" value={volume} min="0" max="1" onChange={(e) => setVolume(e.target.value)} />
        </Box>

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          src={songDetail?.data?.songUrl}
          ref={ref}
          onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
          onLoadedData={(e) => setDuration(e.target.duration)}
        />
      </Container>
    </Box>
  );
};

MusicPlayer.propTypes = {
  songDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  songDetail: selectSongDetail,
});

export default connect(mapStateToProps)(MusicPlayer);
