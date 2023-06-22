import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum, range } from './utils/numbers';
import LifeMatrix from './services/LifeMatrix_Yuri';
import example from "./Config/example.json"


test ('sum of matrix', () => {
  expect(matrixSum([[1,1,1],[2,2,2],[3,3,3]])).toEqual(18);
})

test ("range test", () => {
  expect(range(1,3)).toEqual([1,2])
}) 

test ('next', () => {
  expect(new LifeMatrix(example.line_horizont).next()).toEqual(example.line_vertical)
  expect(new LifeMatrix(example.line_vertical).next()).toEqual(example.line_horizont)
  expect(new LifeMatrix(example.square).next()).toEqual(example.square)
})