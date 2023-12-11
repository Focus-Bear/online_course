import { ROUTES } from 'constants/routes';

export const isYoutubeURL = (url: string) =>
  url.match(
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|shorts\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/
  );

export const increment = (value: number) => ++value;

export const decrement = (value: number) => -value;

export const isUserAdmin = () => window.location.pathname === ROUTES.ADMIN;
