import pandas as pd
import numpy as np
import os

class DataProcessor:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.df = None
        self.load_and_process_data()

    def load_and_process_data(self):
        if not os.path.exists(self.csv_path):
            raise FileNotFoundError(f"Data file not found at {self.csv_path}")

        self.df = pd.read_csv(self.csv_path)
        
        # Ensure numeric columns are actually numeric
        numeric_cols = [
            'attacking_finishing', 'power_shot_power', 'mentality_att_positioning',
            'mentality_vision', 'attacking_short_passing', 'mentality_composure',
            'goalkeeping_gk_diving', 'goalkeeping_gk_handling', 'goalkeeping_gk_reflexes',
            'overall_rating'
        ]
        for col in numeric_cols:
            self.df[col] = pd.to_numeric(self.df[col], errors='coerce').fillna(0)

        # Generate Synthetic Stats
        np.random.seed(42) # For reproducibility

        # Matches Played (15-38)
        self.df['matches_played'] = np.random.randint(15, 39, size=len(self.df))

        # Goals: Weighted by Finishing, Shot Power, Positioning
        # Base goal probability
        goal_prob = (
            self.df['attacking_finishing'] * 0.5 + 
            self.df['power_shot_power'] * 0.3 + 
            self.df['mentality_att_positioning'] * 0.2
        ) / 100
        
        # Adjust for position (Forwards score more)
        # Note: 'positions' column might be a string like 'ST, CF'. We check if it contains attacking roles.
        self.df['is_attacker'] = self.df['positions'].str.contains('ST|CF|RW|LW|CAM', na=False, case=False)
        goal_prob = np.where(self.df['is_attacker'], goal_prob * 1.5, goal_prob * 0.3)
        
        self.df['goals'] = (goal_prob * self.df['matches_played'] * np.random.uniform(0.5, 1.2, size=len(self.df))).astype(int)

        # Assists: Weighted by Vision, Short Passing
        assist_prob = (
            self.df['mentality_vision'] * 0.6 + 
            self.df['attacking_short_passing'] * 0.4
        ) / 100
        self.df['is_midfielder'] = self.df['positions'].str.contains('CM|CAM|CDM|LM|RM', na=False, case=False)
        assist_prob = np.where(self.df['is_midfielder'], assist_prob * 1.2, assist_prob * 0.4)
        
        self.df['assists'] = (assist_prob * self.df['matches_played'] * np.random.uniform(0.3, 0.8, size=len(self.df))).astype(int)

        # G/A Ratio
        self.df['ga_ratio'] = (self.df['goals'] + self.df['assists']) / self.df['matches_played']
        self.df['ga_ratio'] = self.df['ga_ratio'].round(2)

        # Saves (Only for GKs)
        self.df['is_gk'] = self.df['positions'].str.contains('GK', na=False, case=False)
        save_prob = (
            self.df['goalkeeping_gk_diving'] + 
            self.df['goalkeeping_gk_handling'] + 
            self.df['goalkeeping_gk_reflexes']
        ) / 300
        
        self.df['saves'] = np.where(
            self.df['is_gk'], 
            (save_prob * self.df['matches_played'] * np.random.uniform(2.0, 5.0, size=len(self.df))).astype(int), 
            0
        )

        # Clutch Goals: Subset of goals, weighted by Composure
        clutch_prob = self.df['mentality_composure'] / 100
        self.df['clutch_goals'] = (self.df['goals'] * clutch_prob * np.random.uniform(0.2, 0.5, size=len(self.df))).astype(int)

    def get_top_scorers(self, limit=10):
        return self.df.nlargest(limit, 'goals')[['name', 'club_name', 'goals', 'matches_played', 'image']].to_dict(orient='records')

    def get_top_assists(self, limit=10):
        return self.df.nlargest(limit, 'assists')[['name', 'club_name', 'assists', 'matches_played', 'image']].to_dict(orient='records')

    def get_top_ga_ratio(self, limit=10):
        # Filter for players with reasonable play time to avoid outliers
        filtered = self.df[self.df['matches_played'] > 10]
        return filtered.nlargest(limit, 'ga_ratio')[['name', 'club_name', 'ga_ratio', 'goals', 'assists', 'matches_played', 'image']].to_dict(orient='records')

    def get_top_saves(self, limit=10):
        return self.df.nlargest(limit, 'saves')[['name', 'club_name', 'saves', 'matches_played', 'image']].to_dict(orient='records')

    def get_top_clutch(self, limit=10):
        return self.df.nlargest(limit, 'clutch_goals')[['name', 'club_name', 'clutch_goals', 'goals', 'matches_played', 'image']].to_dict(orient='records')

    def get_all_players(self):
        return self.df[['name', 'club_name', 'overall_rating', 'positions', 'image']].head(50).to_dict(orient='records')
