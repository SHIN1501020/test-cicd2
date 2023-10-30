import { MouseEventHandler } from 'react';

export type MagazineProps = {
  data?: magazine[];
};

export interface magazine {
  magazineId: number;
  title: string;
  content: string;
  mainImage: undefined;
  createAt: undefined;
  editor: string;
  likes: undefined;
}

export interface PriceData {
  maxPrice: number;
  minPrice: number;
  priceHistoryForWeek: any;
}

export interface DropDownProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export interface HeartProps {
  like: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface LikeProps {
  isLiked: boolean;
  magazineId: string;
  likeCount: number;
  handleLikeClick: (event: React.MouseEvent, magazineId: string, index: number) => void;
  index: number;
  style?: React.CSSProperties;
}

export interface PriceData {
  priceHistoryForWeek: any;
  maxPrice: number;
  minPrice: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    backgroundColor?: any;
  }[];
}

export interface PriceChartProps extends ParamsProps {
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface ParamsProps {
  id: string | number;
  setMinPrice?: Function;
  setMaxPrice?: Function;
}

export interface PriceWrapProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export interface FormattedData {
  [key: string]: number;
}
