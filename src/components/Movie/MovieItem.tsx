import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import {IMovie} from '../../interfaces';
import css from './MovieItem.module.css';
import defaultImage from '../../defaultImage/default-image.jpg';

interface IProps {
    item: IMovie;
}

const MovieItem: FC<IProps> = ({item}) => {
    const navigate = useNavigate();
    const {title, poster_path, vote_average, id} = item;
    const urlImg = `https://image.tmdb.org/t/p/w200/${poster_path}`;
    const checkUrl = urlImg.split('/').slice(-1).toString() === 'null';

    const handleClick = () => {
        navigate(`/movies/details/${id}`, {state: {item}});
    };

    return (
        <li>
            <Card sx={{width: 300, height: 400}}
                  onClick={handleClick}
            >
                <CardMedia
                    component="img"
                    alt={title}
                    height="300"
                    image={!checkUrl ? urlImg : defaultImage}
                />
                <CardContent>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p className={css.overflowWrap}>{title}</p>
                    </Typography>
                    <Typography variant="body2"
                                color="text.secondary"
                    >
                        <Rating name="read-only"
                                value={vote_average / 2}
                                readOnly
                                precision={0.5}
                                size="small"
                        />
                    </Typography>
                </CardContent>
            </Card>
        </li>
    );
};

export default MovieItem;
