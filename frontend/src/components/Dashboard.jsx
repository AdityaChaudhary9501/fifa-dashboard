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
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
                    FIFA 2025 Analytics
                </h1>
                <p className="text-gray-400 text-lg">Real-time performance insights and player stats</p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PlayerTable
                    title="Top Goal Scorers"
                    players={goals}
                    columns={[{ key: 'goals', label: 'Goals' }, { key: 'matches_played', label: 'Matches' }]}
                />

                <PlayerTable
                    title="Top Assist Providers"
                    players={assists}
                    columns={[{ key: 'assists', label: 'Assists' }, { key: 'matches_played', label: 'Matches' }]}
                />

                <PlayerTable
                    title="Best G/A Ratio"
                    players={gaRatio}
                    columns={[
                        { key: 'ga_ratio', label: 'G/A Ratio' },
                        { key: 'goals', label: 'G' },
                        { key: 'assists', label: 'A' }
                    ]}
                />

                <PlayerTable
                    title="Top Saves (GK)"
                    players={saves}
                    columns={[{ key: 'saves', label: 'Saves' }, { key: 'matches_played', label: 'Matches' }]}
                />

                <div className="lg:col-span-2">
                    <PlayerTable
                        title="Clutch Players (Crucial Goals)"
                        players={clutch}
                        columns={[{ key: 'clutch_goals', label: 'Clutch Goals' }, { key: 'goals', label: 'Total Goals' }]}
                    />
                </div>
            </div>

            <footer className="mt-16 text-center text-gray-500 text-sm">
                <p>Data based on FIFA 2025 Attributes & Synthetic Performance Metrics</p>
            </footer>
        </div>
    );
};

export default Dashboard;
