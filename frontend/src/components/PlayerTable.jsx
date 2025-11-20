import React from 'react';

const PlayerTable = ({ title, players, columns, icon }) => {
    if (!players || players.length === 0) {
        return (
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span>{icon}</span> {title}
                </h2>
                <p className="text-blue-300/50 italic">No data available.</p>
            </div>
        );
    }

    return (
        <div className="backdrop-blur-xl bg-black/40 rounded-2xl p-1 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
            <div className="bg-gradient-to-b from-white/5 to-transparent rounded-xl p-6 h-full">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                    <span className="text-3xl filter drop-shadow-lg">{icon}</span> {title}
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="text-xs uppercase text-gray-500 font-bold tracking-wider border-b border-white/5">
                            <tr>
                                <th className="px-4 py-4">#</th>
                                <th className="px-4 py-4">Player</th>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-4 py-4 text-right">
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {players.map((player, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-white/5 transition-colors duration-200 group/row"
                                >
                                    <td className="px-4 py-4 font-medium text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-4 flex items-center gap-4">
                                        {/* Image with fallback */}
                                        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden flex-shrink-0 border border-white/10">
                                            <img
                                                src={player.image}
                                                alt={player.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden w-full h-full items-center justify-center bg-gray-800">
                                                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover/row:text-blue-400 transition-colors">{player.name}</div>
                                            <div className="text-xs text-gray-500">{player.club_name}</div>
                                        </div>
                                    </td>
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-4 text-right font-mono text-gray-300 group-hover/row:text-white transition-colors">
                                            {player[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlayerTable;
