import { FC } from 'react';

import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';

import { IDetails } from '../../interfaces/detailsInterface';
import { IGenre } from '../../interfaces';
import List from '../List/List';
import GenreItem from '../Genre/GenreItem';
import css from './DetailsItem.module.css';
import defaultImage from '../../defaultImage/default-image.jpg';

interface IProps {
  item: IDetails;
}

const DetailsItem: FC<IProps> = ({ item }) => {
  const urlImg = `https://image.tmdb.org/t/p/w200/${item?.poster_path}`;
  const checkUrl = urlImg.split('/').slice(-1).toString() === 'null';

  return (
    <div className={css.wrapper}>
      <Card sx={{ width: 500, height: 'auto' }}>
        <div className={css.badgeContainer}>
          <CardMedia
            component="img"
            alt={item?.title}
            // height="500"
            image={!checkUrl ? urlImg : defaultImage}
          />
          <div className={css.badgeWrapper}>
            {item?.genres && <List items={item?.genres}
                                   renderItem={(item: IGenre) =>
                                     <div className={css.badgeItem}>
                                       <GenreItem key={item?.id}
                                                  genre={item}
                                       />
                                     </div>}
            />}
          </div>
        </div>
        <CardContent>
          <Typography variant="body2"
                      color="text.secondary"
          >
            <Rating name="read-only"
                    value={item?.vote_average ? item?.vote_average / 2 : 0}
                    readOnly
                    precision={0.5}
                    size="small"
            />
          </Typography>
          <Typography gutterBottom
                      variant="h6"
                      component="div"
          >
            <p>{item?.title}</p>
          </Typography>
          <Typography gutterBottom
                      variant="h6"
                      component="div"
          >
            <p>{item?.overview}</p>
          </Typography>
          <Typography gutterBottom
                      variant="h6"
                      component="div"
          >
            <p>{item?.release_date}</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsItem;
