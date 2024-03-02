import { FC } from 'react';

import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  Rating,
} from '@mui/material';

import { IDetails, IGenre } from '../../interfaces';
import { List, GenreItem } from '../../components';
import { defaultUrlImage } from '../../constants';
import defaultImage from '../../defaultImage/default-image.jpg';
import css from './DetailsItem.module.css';

interface IProps {
  item: IDetails;
}

const DetailsItem: FC<IProps> = ({ item }) => {
  const urlImg = defaultUrlImage + item?.poster_path;
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
                                     <div className={css.badgeItem}
                                          key={item.id}
                                     >
                                       <GenreItem
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

export { DetailsItem };
