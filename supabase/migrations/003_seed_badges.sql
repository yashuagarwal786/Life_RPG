-- ============================================================
-- Life RPG — Achievement Badges Seed
-- ============================================================

INSERT INTO badges (name, description, icon, condition_type, condition_value) VALUES
('First Quest', 'Complete your very first quest.', '⚔️', 'quests_completed', 1),
('Adventurer', 'Complete 10 quests.', '🗺️', 'quests_completed', 10),
('Veteran Quester', 'Complete 50 quests.', '🏆', 'quests_completed', 50),
('Century Hero', 'Complete 100 quests.', '💯', 'quests_completed', 100),
('On a Roll', 'Maintain a 3-day streak.', '🔥', 'streak', 3),
('Week Warrior', 'Maintain a 7-day streak.', '📅', 'streak', 7),
('Unstoppable', 'Maintain a 30-day streak.', '⚡', 'streak', 30),
('Level 5', 'Reach Level 5.', '⭐', 'level', 5),
('Level 10', 'Reach Level 10.', '🌟', 'level', 10),
('Level 25', 'Reach Level 25.', '💫', 'level', 25),
('Legendary Hero', 'Reach Level 50.', '👑', 'level', 50),
('Scholar', 'Complete 10 study quests.', '📚', 'category_study', 10),
('Code Wizard', 'Complete 10 coding quests.', '💻', 'category_coding', 10),
('Iron Body', 'Complete 10 fitness quests.', '💪', 'category_fitness', 10),
('Rich Adventurer', 'Accumulate 1000 Gold.', '💰', 'gold', 1000),
('Legendary Quest', 'Complete a Legendary difficulty quest.', '🐉', 'legendary_quests', 1);
