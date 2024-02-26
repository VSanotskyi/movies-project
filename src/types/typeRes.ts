import {AxiosResponse} from 'axios';

export type typeRes<T> = Promise<AxiosResponse<T>>