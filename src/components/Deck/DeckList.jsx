import PropTypes from 'prop-types';
import { ImageList, ImageListItem, Typography } from '@mui/material';

DeckList.propTypes = {
  deckList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired
    })
  ).isRequired
};

export default function DeckList({ deckList }) {
  return (
    <ImageList sx={{ width: 400, height: 450 }} cols={4} rowHeight={164}>
      {deckList.map((deck) => (
        <ImageListItem key={deck.name}>
          <img
            srcSet={`${deck.imageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${deck.imageURL}?w=164&h=164&fit=crop&auto=format`}
            alt={deck.name}
            loading="lazy"
          />
          <Typography fontWeight="bold">{deck.name}</Typography>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
