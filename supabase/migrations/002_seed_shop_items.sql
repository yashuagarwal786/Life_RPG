-- ============================================================
-- Life RPG — Shop Items Seed
-- ============================================================

INSERT INTO shop_items (name, description, type, cost, icon, rarity, metadata) VALUES

-- THEMES
('Midnight Arcane', 'Dark purple mystic theme for true spellcasters.', 'theme', 200, '🌙', 'rare', '{"key":"midnight_arcane","colors":{"bg":"#1a0a2e","accent":"#7c3aed","text":"#e2d9f3"}}'),
('Ember Forge', 'Fiery orange theme for warriors of flame.', 'theme', 200, '🔥', 'rare', '{"key":"ember_forge","colors":{"bg":"#1a0800","accent":"#f97316","text":"#fde8d0"}}'),
('Forest Ranger', 'Earthy green theme for nature scouts.', 'theme', 200, '🌿', 'rare', '{"key":"forest_ranger","colors":{"bg":"#071a0e","accent":"#10b981","text":"#d1f0e0"}}'),
('Golden Legacy', 'Premium gold theme for legendary heroes.', 'theme', 500, '👑', 'legendary', '{"key":"golden_legacy","colors":{"bg":"#1a1200","accent":"#f59e0b","text":"#fef9e7"}}'),
('Void Walker', 'Pure darkness for those who walk in shadows.', 'theme', 350, '⚫', 'epic', '{"key":"void_walker","colors":{"bg":"#050507","accent":"#a855f7","text":"#d4d4f7"}}'),

-- TITLES
('The Unbroken', 'Awarded to those who maintain an iron will.', 'title', 300, '⚔️', 'epic', '{"text":"The Unbroken"}'),
('Archmage', 'Reserved for those who master the arcane arts.', 'title', 500, '🧙', 'legendary', '{"text":"Archmage"}'),
('Shadowblade', 'For rogues who move unseen.', 'title', 300, '🗡️', 'epic', '{"text":"Shadowblade"}'),
('The Persistent', 'For adventurers who never skip a day.', 'title', 150, '🏅', 'rare', '{"text":"The Persistent"}'),
('Seeker of Knowledge', 'For those who never stop learning.', 'title', 150, '📚', 'common', '{"text":"Seeker of Knowledge"}'),

-- AVATAR FRAMES
('Arcane Halo', 'A glowing purple halo surrounds your avatar.', 'avatar_frame', 400, '✨', 'epic', '{"key":"arcane_halo","glow":"#7c3aed"}'),
('Golden Crown', 'A crown of pure gold marks a true legend.', 'avatar_frame', 600, '👑', 'legendary', '{"key":"golden_crown","glow":"#f59e0b"}'),
('Flame Ring', 'A ring of fire shows your warrior spirit.', 'avatar_frame', 400, '🔥', 'epic', '{"key":"flame_ring","glow":"#f97316"}'),
('Nature Wreath', 'A wreath of leaves for the forest guardian.', 'avatar_frame', 250, '🌿', 'rare', '{"key":"nature_wreath","glow":"#10b981"}'),

-- BADGES (cosmetic shop badges, separate from achievement badges)
('Veteran', 'Shows you have been adventuring for a long time.', 'badge', 100, '🎖️', 'common', '{"key":"veteran"}'),
('Completionist', 'For those who finish what they start.', 'badge', 200, '✅', 'rare', '{"key":"completionist"}'),
('Speed Runner', 'Complete quests faster than lightning.', 'badge', 200, '⚡', 'rare', '{"key":"speed_runner"}'),
('Iron Will', 'Nothing breaks your streak.', 'badge', 500, '💎', 'epic', '{"key":"iron_will"}');
