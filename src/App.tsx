import { View1 } from 'components/View1';
import { View2 } from 'components/View2';
import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{ backgroundColor: 'yellow' }}>
      <View1 displayText="Test">
        <View2 />
        <View2 />
        <div> Texto</div>
        <View2 />
        <View2 />
        <View2 />
      </View1>
      <View2 />
    </div>
  );
}

export default App;
