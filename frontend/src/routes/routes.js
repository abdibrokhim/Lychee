import React from 'react';
import { Route, Routes } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import VideoPage from '../pages/VideoPage';
import NoMatchPage from '../pages/NoMatchPage';
import HomePage from '../pages/HomePage';

const Router = () => (
  <Routes>
    <Route 
        exact path="/" 
        element={
            <LandingPage />
        } 
    />
    <Route 
        path="/video" 
        element={
            <HomePage />
        } 
    />
    <Route 
        path="/video/:id" 
        element={
            <VideoPage />
        } 
    />
    <Route 
        path="*" 
        element={
            <NoMatchPage />
        } 
    />
  </Routes>
);

export default Router;