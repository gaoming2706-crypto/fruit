import { useState, useCallback } from 'react';
import { Fruit, FruitInBox, FruitBoxState, BoxType } from '../types/fruit';
import { FRUITS } from '../data/fruits';

export function useFruitBox() {
  const [boxState, setBoxState] = useState<FruitBoxState>({
    boxType: 'single',
    boxCapacity: 4,
    fruits: [],
    isOpen: true,
    isPacked: false,
  });

  const [selectedFruits, setSelectedFruits] = useState<Fruit[]>([]);

  // Compute boxType based on count: 1 -> single, 2 -> double, 3 -> triple, 4 -> quad
  const getBoxTypeForCount = (count: number): BoxType => {
    if (count <= 1) return 'single';
    if (count === 2) return 'double';
    if (count === 3) return 'triple';
    return 'quad';
  };

  // Add fruit to selection
  const addFruit = useCallback((fruit: Fruit) => {
    setSelectedFruits((prev) => {
      if (prev.length >= 4) return prev;
      if (prev.some((f) => f.id === fruit.id)) return prev;
      return [...prev, fruit];
    });
  }, []);

  const removeFruit = useCallback((fruitId: string) => {
    setSelectedFruits((prev) => prev.filter((f) => f.id !== fruitId));
    setBoxState((prev) => {
      const updatedFruits = prev.fruits.filter((item) => item.fruit.id !== fruitId);
      return {
        ...prev,
        fruits: updatedFruits,
        boxType: getBoxTypeForCount(updatedFruits.length),
      };
    });
  }, []);

  // Place fruit directly into box with organic positioning
  const placeFruitInBox = useCallback((fruit: Fruit) => {
    setBoxState((prev) => {
      if (prev.fruits.length >= 4) return prev;
      
      // Calculate realistic random offset and rotation for organic stacking
      const rotation = (Math.random() - 0.5) * 24;
      const offsetX = (Math.random() - 0.5) * 36;
      const offsetY = (Math.random() - 0.5) * 36;
      const scale = 0.9 + Math.random() * 0.15;

      const newFruitInBox: FruitInBox = {
        fruit,
        instanceId: `${fruit.id}-${Date.now()}`,
        cutTimestamp: Date.now(),
        rotation,
        offsetX,
        offsetY,
        scale,
      };

      const updated = [...prev.fruits, newFruitInBox];
      return {
        ...prev,
        fruits: updated,
        boxType: getBoxTypeForCount(updated.length),
      };
    });
  }, []);

  // Fill box with multiple fruits at once
  const populateBoxWithFruits = useCallback((fruits: Fruit[]) => {
    const limited = fruits.slice(0, 4);
    const boxItems: FruitInBox[] = limited.map((fruit, idx) => {
      const rotation = (Math.random() - 0.5) * 24;
      const offsetX = (Math.random() - 0.5) * 36;
      const offsetY = (Math.random() - 0.5) * 36;
      const scale = 0.9 + Math.random() * 0.15;

      return {
        fruit,
        instanceId: `${fruit.id}-${idx}-${Date.now()}`,
        cutTimestamp: Date.now(),
        rotation,
        offsetX,
        offsetY,
        scale,
      };
    });

    setBoxState((prev) => ({
      ...prev,
      fruits: boxItems,
      boxType: getBoxTypeForCount(boxItems.length),
    }));
  }, []);

  // Random mix: select 2 to 4 distinct fruits
  const randomMix = useCallback((count?: number) => {
    const targetCount = count || Math.floor(Math.random() * 3) + 2; // 2, 3 or 4
    const shuffled = [...FRUITS].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, targetCount);
    setSelectedFruits(picked);
    return picked;
  }, []);

  const clearBox = useCallback(() => {
    setSelectedFruits([]);
    setBoxState({
      boxType: 'single',
      boxCapacity: 4,
      fruits: [],
      isOpen: true,
      isPacked: false,
    });
  }, []);

  return {
    boxState,
    selectedFruits,
    setSelectedFruits,
    addFruit,
    removeFruit,
    placeFruitInBox,
    populateBoxWithFruits,
    randomMix,
    clearBox,
    setBoxState,
  };
}
