import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import WebVitalsPage from "./pages/WebVitalsPage";
import DebouncingThrottlingPage from "./pages/DebouncingThrottlingPage";
import MemoizationPage from "./pages/MemoizationPage";
import LazyLoadingPage from "./pages/LazyLoadingPage";
import ImageOptimizationPage from "./pages/ImageOptimizationPage";
import VirtualListsPage from "./pages/VirtualListsPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/web-vitals" element={<WebVitalsPage />} />
                <Route path="/debouncing-throttling" element={<DebouncingThrottlingPage />} />
                <Route path="/memoization" element={<MemoizationPage />} />
                <Route path="/lazy-loading" element={<LazyLoadingPage />} />
                <Route path="/image-optimization" element={<ImageOptimizationPage />} />
                <Route path="/virtual-lists" element={<VirtualListsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
