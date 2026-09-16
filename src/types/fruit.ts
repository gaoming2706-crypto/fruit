export type FruitCategory = 'all' | 'seasonal' | 'popular' | 'sweet-sour' | 'refreshing';

export interface Fruit {
  id: string;
  name: string;
  englishName: string;
  emoji: string;
  category: 'seasonal' | 'popular' | 'sweet-sour' | 'refreshing';
  taste: string;
  color: string;
  gradient: string;
  accentColor: string;
  tagline: string;
}

export type BoxType = 'single' | 'double' | 'triple' | 'quad';

export interface FruitInBox {
  fruit: Fruit;
  instanceId: string;
  cutTimestamp: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface FruitBoxState {
  boxType: BoxType;
  boxCapacity: number;
  fruits: FruitInBox[];
  isOpen: boolean;
  isPacked: boolean;
}
