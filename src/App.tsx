/**
 * Fruit Cut｜水果自由拼
 * Complete High-Fidelity Web Application
 * Streamlined Flow: Select Fruits -> Directly into Fruit Box -> Packaging -> Share Card
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { SelectFruit } from './pages/SelectFruit';
import { BoxPreviewPage } from './pages/BoxPreviewPage';
import { PackagingPage } from './pages/PackagingPage';
import { ShareCardPage } from './pages/ShareCardPage';
import { DemoModePage } from './pages/DemoModePage';
import { useFruitBox } from './hooks/useFruitBox';
import { Fruit } from './types/fruit';

export default function App() {
  const {
    boxState,
    selectedFruits,
    addFruit,
    removeFruit,
    populateBoxWithFruits,
    randomMix,
    clearBox,
  } = useFruitBox();

  const [currentView, setCurrentView] = useState<'home' | 'select' | 'box' | 'pack' | 'result' | 'demo'>('home');

  const handleStartSelect = () => {
    setCurrentView('select');
  };

  const handleRandomMixHome = () => {
    const picked = randomMix();
    populateBoxWithFruits(picked);
    setCurrentView('box');
  };

  const handleToggleFruit = (fruit: Fruit) => {
    const exists = selectedFruits.some((f) => f.id === fruit.id);
    if (exists) {
      removeFruit(fruit.id);
    } else {
      addFruit(fruit);
    }
  };

  const handleProceedToBox = () => {
    // Fill the fruit box directly with the selected fruits
    populateBoxWithFruits(selectedFruits);
    setCurrentView('box');
  };

  const handleOpenBox = () => {
    setCurrentView('box');
  };

  const handleGoHome = () => {
    setCurrentView('home');
  };

  const handleRestartAll = () => {
    clearBox();
    setCurrentView('select');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111111] flex flex-col selection:bg-[#111111] selection:text-white">
      {/* Global Navigation Header */}
      <Header
        fruitCount={boxState.fruits.length || selectedFruits.length}
        onOpenBox={handleOpenBox}
        onGoHome={handleGoHome}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <Home
            fruitsInBox={boxState.fruits}
            onStartSelect={handleStartSelect}
            onRandomMix={handleRandomMixHome}
            onStartDemo={() => setCurrentView('demo')}
          />
        )}

        {currentView === 'select' && (
          <SelectFruit
            selectedFruits={selectedFruits}
            onToggleFruit={handleToggleFruit}
            onRemoveFruit={removeFruit}
            onProceedToBox={handleProceedToBox}
            onRandomMix={() => randomMix()}
            onBackToHome={handleGoHome}
          />
        )}

        {currentView === 'box' && (
          <BoxPreviewPage
            fruits={boxState.fruits}
            boxType={boxState.boxType}
            onBackToSelect={() => setCurrentView('select')}
            onRemoveFruit={removeFruit}
            onStartPack={() => setCurrentView('pack')}
          />
        )}

        {currentView === 'pack' && (
          <PackagingPage
            fruits={boxState.fruits}
            boxType={boxState.boxType}
            onBackToBox={() => setCurrentView('box')}
            onReopenBox={() => setCurrentView('box')}
            onGoToShareCard={() => setCurrentView('result')}
          />
        )}

        {currentView === 'result' && (
          <ShareCardPage
            fruits={boxState.fruits}
            boxType={boxState.boxType}
            onBackToPack={() => setCurrentView('pack')}
            onRestartAll={handleRestartAll}
          />
        )}

        {currentView === 'demo' && (
          <DemoModePage
            onExitDemo={handleGoHome}
            onEnterManualMode={handleStartSelect}
          />
        )}
      </main>

      {/* Minimalist Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#86868B] border-t border-[#D9DADD]/30">
        <p>Fruit Cut · 水果自由拼 · 纯粹自然风味</p>
      </footer>
    </div>
  );
}
