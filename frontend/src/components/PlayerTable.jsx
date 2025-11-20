import React from 'react';

const PlayerTable = ({ title, players, columns }) => {
    if (!players || players.length === 0) {
        return (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                <p className="text-gray-400">No data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
                {title}
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Rank</th>
                            <th className="px-4 py-3">Player</th>
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-3 text-right">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors last:border-0"
                            >
                                <td className="px-4 py-3 font-medium text-gray-500">#{index + 1}</td>
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden flex-shrink-0 border border-gray-500">
                                        {player.image ? (
                                            <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs">N/A</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{player.name}</div>
                                        <div className="text-xs text-gray-400">{player.club_name}</div>
                                    </div>
                                </td>
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-3 text-right font-mono text-white">
                                        {player[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerTable;
