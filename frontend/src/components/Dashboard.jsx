import React, { useEffect, useState } from 'react';
import PlayerTable from './PlayerTable';
import { getTopGoals, getTopAssists, getTopGARatio, getTopSaves, getTopClutch } from '../services/api';

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [assists, setAssists] = useState([]);
    const [gaRatio, setGaRatio] = useState([]);
    const [saves, setSaves] = useState([]);
    const [clutch, setClutch] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [goalsData, assistsData, gaData, savesData, clutchData] = await Promise.all([
                    getTopGoals(),
                    getTopAssists(),
                    getTopGARatio(),
                    getTopSaves(),
                    getTopClutch(),
                ]);

                setGoals(goalsData);
                setAssists(assistsData);
                setGaRatio(gaData);
                setSaves(savesData);
                setClutch(clutchData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white p-8 font-sans selection:bg-pink-500 selection:text-white">
            <header className="mb-16 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                    FIFA 25 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">DASHBOARD</span>
                </h1>
                <p className="text-gray-400 text-lg font-medium tracking-wide uppercase text-xs">Performance Analytics & Player Stats</p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                <PlayerTable
                    title="Top Goal Scorers"
                    players={goals}
                    columns={[{ key: 'goals', label: 'Goals' }, { key: 'matches_played', label: 'Matches' }]}
                    icon="⚽"
                />

                <PlayerTable
                    title="Top Assist Providers"
                    players={assists}
                    columns={[{ key: 'assists', label: 'Assists' }, { key: 'matches_played', label: 'Matches' }]}
                    icon="🎯"
                />

                <PlayerTable
                    title="Best G/A Ratio"
                    players={gaRatio}
                    columns={[
                        { key: 'ga_ratio', label: 'G/A Ratio' },
                        { key: 'goals', label: 'G' },
                        { key: 'assists', label: 'A' }
                    ]}
                    icon="⚡"
                />

                <PlayerTable
                    title="Top Saves (GK)"
                    players={saves}
                    columns={[{ key: 'saves', label: 'Saves' }, { key: 'matches_played', label: 'Matches' }]}
                    icon="🧤"
                />

                <div className="lg:col-span-2">
                    <PlayerTable
                        title="Clutch Players (Crucial Goals)"
                        players={clutch}
                        columns={[{ key: 'clutch_goals', label: 'Clutch Goals' }, { key: 'goals', label: 'Total Goals' }]}
                        icon="🔥"
                    />
                </div>
            </div>

            <footer className="mt-20 text-center text-blue-400/60 text-sm font-light">
                <p>Powered by Antigravity AI • FIFA 2025 Data • Synthetic Performance Metrics</p>
            </footer>
        </div>
    );
};

export default Dashboard;
