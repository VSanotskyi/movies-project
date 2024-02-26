import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';

import api from '../../services/moviesService';
import {IGenre} from '../../interfaces';
import List from '../List/List';
import GenreItem from '../Genre/GenreItem';
import {IDetails} from '../../interfaces/detailsInterface';
import css from './DetailsItem.module.css';

const DetailsItem = () => {
    window.scrollTo(0, 0);
    const [movieDetails, setMovieDetails] = useState<IDetails | null>(null);
    const {pathname} = useLocation();
    const {state: {item}} = useLocation();
    const movieId = pathname.split('/')[3];

    const getDetails = async (id: string) => {
        try {
            const {data} = await api.getDetailsMovie(id);
            setMovieDetails(data);
        } catch (error) {
            console.error(error);
        }
    };

    const urlImg = `https://image.tmdb.org/t/p/w200/${movieDetails?.poster_path}`;

    useEffect(() => {
        getDetails(movieId);
    }, []);

    return (
        <div className={css.wrapper}>
            <Card sx={{width: 500, height: 'auto'}}>
                <div className={css.badgeContainer}>
                    <CardMedia
                        component="img"
                        alt={item.title}
                        // height="500"
                        image={urlImg}
                    />
                    <div className={css.badgeWrapper}>
                        {movieDetails?.genres && <List items={movieDetails?.genres}
                                                       renderItem={(item: IGenre) =>
                                                           <GenreItem key={item?.id}
                                                                      genre={item}
                                                           />}
                        />}
                    </div>
                </div>
                <CardContent>
                    <Typography variant="body2"
                                color="text.secondary"
                    >
                        <Rating name="read-only"
                                value={movieDetails?.vote_average ? movieDetails?.vote_average / 2 : 0}
                                readOnly
                                precision={0.5}
                                size="small"
                        />
                    </Typography>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p>{movieDetails?.title}</p>
                    </Typography>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p>{movieDetails?.overview}</p>
                    </Typography>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p>{movieDetails?.release_date}</p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default DetailsItem;