-- Seed data for wemake database
-- Profile b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4 must already exist in profiles (not seeded here).

-- topics
INSERT INTO topics (topic_id, name, slug) OVERRIDING SYSTEM VALUE VALUES
  (1, 'Indie Hacking', 'indie-hacking'),
  (2, 'SaaS', 'saas'),
  (3, 'AI Tools', 'ai-tools'),
  (4, 'Design', 'design'),
  (5, 'Marketing', 'marketing');

-- categories
INSERT INTO categories (category_id, name, description) OVERRIDING SYSTEM VALUE VALUES
  (1, 'Productivity', 'Tools that help you get more done.'),
  (2, 'Developer Tools', 'Software built for developers.'),
  (3, 'Design', 'Products for designers and creatives.'),
  (4, 'AI', 'Artificial intelligence powered products.'),
  (5, 'Community', 'Platforms that connect people.');

-- jobs
INSERT INTO jobs (
  job_id, position, overview, responsibilities, qualifications, benefits, skills,
  company_name, company_logo, company_location, apply_url, job_type, location, salary_range
) OVERRIDING SYSTEM VALUE VALUES
  (
    1,
    'Senior Full-Stack Engineer',
    'Build and scale our core product platform.',
    'Design APIs, ship features, review code, mentor juniors.',
    '5+ years TypeScript experience, strong React skills.',
    'Remote work, equity, health insurance.',
    'TypeScript, React, Node.js, PostgreSQL',
    'Acme Labs',
    'https://placehold.co/64x64',
    'San Francisco, CA',
    'https://example.com/jobs/1',
    'full-time',
    'remote',
    '$120,000 - $150,000'
  ),
  (
    2,
    'Product Designer',
    'Own the end-to-end design of new features.',
    'User research, wireframes, high-fidelity UI, design system upkeep.',
    'Portfolio with shipped products, Figma expert.',
    'Flexible hours, learning budget.',
    'Figma, UX research, prototyping',
    'Pixel Studio',
    'https://placehold.co/64x64',
    'New York, NY',
    'https://example.com/jobs/2',
    'full-time',
    'hybrid',
    '$100,000 - $120,000'
  ),
  (
    3,
    'Growth Marketer',
    'Drive user acquisition and retention.',
    'Run campaigns, analyze funnels, experiment with channels.',
    '3+ years B2B SaaS marketing experience.',
    'Performance bonus, conference budget.',
    'SEO, content, analytics, paid ads',
    'LaunchPad',
    'https://placehold.co/64x64',
    'Austin, TX',
    'https://example.com/jobs/3',
    'full-time',
    'in-person',
    '$70,000 - $100,000'
  ),
  (
    4,
    'Frontend Freelancer',
    'Short-term contract to rebuild marketing site.',
    'Implement responsive pages from Figma, optimize performance.',
    'Strong React and Tailwind experience.',
    'Flexible schedule, paid weekly.',
    'React, Tailwind CSS, accessibility',
    'Bright Web',
    'https://placehold.co/64x64',
    'Remote',
    'https://example.com/jobs/4',
    'freelance',
    'remote',
    '$50,0000 - $70,000'
  ),
  (
    5,
    'Engineering Intern',
    'Join our team for a summer internship.',
    'Fix bugs, write tests, pair with senior engineers.',
    'Currently enrolled in CS program, knows Git basics.',
    'Mentorship, stipend, return offer potential.',
    'JavaScript, Git, problem solving',
    'Startup Hub',
    'https://placehold.co/64x64',
    'Seattle, WA',
    'https://example.com/jobs/5',
    'internship',
    'hybrid',
    '$0 - $50,000'
  );

-- teams
INSERT INTO teams (
  team_id, product_name, team_size, equity_split, product_stage, roles, product_description, team_leader_id
) OVERRIDING SYSTEM VALUE VALUES
  (1, 'TaskFlow', 3, 33, 'mvp', 'Full-stack developer', 'A lightweight task manager for indie hackers.', 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'),
  (2, 'DesignKit', 2, 50, 'prototype', 'UI/UX designer', 'Open design system for early-stage startups.', 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'),
  (3, 'ChatLoop', 4, 25, 'idea', 'Backend engineer', 'Async messaging for remote product teams.', 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'),
  (4, 'Metricly', 5, 20, 'product', 'Data engineer', 'Analytics dashboard for SaaS founders.', 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'),
  (5, 'ShipFast', 2, 50, 'mvp', 'Mobile developer', 'Mobile-first launch checklist for side projects.', 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

-- gpt_ideas
INSERT INTO gpt_ideas (gpt_idea_id, idea, views, claimed_at, claimed_by) OVERRIDING SYSTEM VALUE VALUES
  (1, 'AI-powered changelog generator for dev teams', 120, NULL, NULL),
  (2, 'No-code waitlist builder with referral tracking', 85, NULL, NULL),
  (3, 'Browser extension that summarizes GitHub PRs', 200, NOW(), 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'),
  (4, 'Marketplace for Notion templates', 45, NULL, NULL),
  (5, 'Slack bot that turns standups into action items', 310, NOW(), 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

-- message_rooms
INSERT INTO message_rooms (message_room_id) OVERRIDING SYSTEM VALUE VALUES
  (1), (2), (3), (4), (5);

-- products
INSERT INTO products (
  product_id, name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id
) OVERRIDING SYSTEM VALUE VALUES
  (
    1,
    'TaskFlow',
    'Ship tasks, not spreadsheets',
    'A minimal task manager built for solo founders.',
    'Create projects, add tasks, track progress with kanban boards.',
    '📋',
    'https://taskflow.example.com',
    '{"views": 1500, "reviews": 12, "upvotes": 48}'::jsonb,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4',
    1
  ),
  (
    2,
    'DevPulse',
    'Metrics for your side project',
    'Track signups, revenue, and churn in one dashboard.',
    'Connect Stripe and your database, view real-time charts.',
    '📊',
    'https://devpulse.example.com',
    '{"views": 890, "reviews": 8, "upvotes": 32}'::jsonb,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4',
    2
  ),
  (
    3,
    'Palette',
    'Design tokens for startups',
    'Export consistent colors and typography to any codebase.',
    'Define tokens in the app, sync via CLI to your repo.',
    '🎨',
    'https://palette.example.com',
    '{"views": 420, "reviews": 5, "upvotes": 19}'::jsonb,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4',
    3
  ),
  (
    4,
    'PromptVault',
    'Store and share AI prompts',
    'Organize prompts by project and collaborate with your team.',
    'Save prompts, tag them, run versions against models.',
    '🤖',
    'https://promptvault.example.com',
    '{"views": 2100, "reviews": 24, "upvotes": 95}'::jsonb,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4',
    4
  ),
  (
    5,
    'Circle',
    'Community for makers',
    'Host discussions, AMAs, and events for your audience.',
    'Create spaces, moderate threads, integrate with Discord.',
    '👥',
    'https://circle.example.com',
    '{"views": 670, "reviews": 3, "upvotes": 14}'::jsonb,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4',
    5
  );

-- posts
INSERT INTO posts (post_id, title, content, topic_id, profile_id) OVERRIDING SYSTEM VALUE VALUES
  (
    1,
    'How do you validate ideas before building?',
    'I spend a week talking to users before writing code. What is your process?',
    1,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'
  ),
  (
    2,
    'Best pricing strategy for early SaaS',
    'Freemium vs free trial — curious what worked for you in the first 100 customers.',
    2,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'
  ),
  (
    3,
    'Favorite AI coding assistants in 2025',
    'Share tools that actually save time without hurting code quality.',
    3,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'
  ),
  (
    4,
    'Design system tips for solo founders',
    'How minimal can a design system be and still scale?',
    4,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'
  ),
  (
    5,
    'Launch channels that still work',
    'Product Hunt, Twitter, newsletters — rank what drove signups for you.',
    5,
    'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4'
  );

-- post_replies
INSERT INTO post_replies (post_reply_id, post_id, parent_id, profile_id, reply) OVERRIDING SYSTEM VALUE VALUES
  (1, 1, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Landing page + waitlist is my go-to before an MVP.'),
  (2, 1, 1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Same here — I also run 5–10 user interviews.'),
  (3, 2, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Free trial converted better for us than freemium.'),
  (4, 3, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Copilot for boilerplate, human review for architecture.'),
  (5, 4, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Start with colors, spacing, and two text styles only.');

-- reviews
INSERT INTO reviews (review_id, product_id, profile_id, rating, review) OVERRIDING SYSTEM VALUE VALUES
  (1, 1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 5, 'Simple and fast — exactly what I needed.'),
  (2, 2, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 4, 'Great charts, would love more integrations.'),
  (3, 3, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 5, 'Saved hours syncing design tokens.'),
  (4, 4, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 4, 'Solid prompt library, UI could be cleaner.'),
  (5, 5, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 3, 'Good start, missing analytics for hosts.');

-- messages
INSERT INTO messages (message_id, message_room_id, sender_id, content) OVERRIDING SYSTEM VALUE VALUES
  (1, 1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Hey, saw your product on the leaderboard!'),
  (2, 1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Would love to hear how you got your first users.'),
  (3, 2, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Are you open to a design collaboration?'),
  (4, 3, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Thanks for the feedback on my launch post.'),
  (5, 4, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'Let us sync on the API integration next week.');

-- notifications
INSERT INTO notifications (
  notification_id, source_id, product_id, post_id, target_id, type
) OVERRIDING SYSTEM VALUE VALUES
  (1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', NULL, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'follow'),
  (2, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 1, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'review'),
  (3, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', NULL, 1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'reply'),
  (4, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', NULL, 3, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'mention'),
  (5, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 4, NULL, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'review');

-- events
INSERT INTO events (event_id, event_type, event_data) VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'product_view',
    '{"product_id": 1, "profile_id": "b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4"}'::jsonb
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'product_visit',
    '{"product_id": 2, "url": "https://devpulse.example.com"}'::jsonb
  ),
  (
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'profile_view',
    '{"profile_id": "b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4"}'::jsonb
  ),
  (
    'd4e5f6a7-b8c9-0123-def0-234567890123',
    'product_view',
    '{"product_id": 4, "profile_id": "b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4"}'::jsonb
  ),
  (
    'e5f6a7b8-c9d0-1234-ef01-345678901234',
    'product_visit',
    '{"product_id": 5, "url": "https://circle.example.com"}'::jsonb
  );

-- follows (1 row: only one profile available)
INSERT INTO follows (follower_id, following_id) VALUES
  ('b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4', 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

-- composite primary key tables (1 row each)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
  (1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

INSERT INTO post_upvotes (post_id, profile_id) VALUES
  (1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
  (1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

INSERT INTO message_room_members (message_room_id, profile_id) VALUES
  (1, 'b4d352c3-7591-4c2c-8fc2-b5c5ee0b4bf4');

-- reset identity sequences
SELECT setval('topics_topic_id_seq', (SELECT COALESCE(MAX(topic_id), 1) FROM topics));
SELECT setval('categories_category_id_seq', (SELECT COALESCE(MAX(category_id), 1) FROM categories));
SELECT setval('jobs_job_id_seq', (SELECT COALESCE(MAX(job_id), 1) FROM jobs));
SELECT setval(pg_get_serial_sequence('teams', 'team_id'), (SELECT COALESCE(MAX(team_id), 1) FROM teams));
SELECT setval('gpt_ideas_gpt_idea_id_seq', (SELECT COALESCE(MAX(gpt_idea_id), 1) FROM gpt_ideas));
SELECT setval('message_rooms_message_room_id_seq', (SELECT COALESCE(MAX(message_room_id), 1) FROM message_rooms));
SELECT setval('products_product_id_seq', (SELECT COALESCE(MAX(product_id), 1) FROM products));
SELECT setval('posts_post_id_seq', (SELECT COALESCE(MAX(post_id), 1) FROM posts));
SELECT setval('post_replies_post_reply_id_seq', (SELECT COALESCE(MAX(post_reply_id), 1) FROM post_replies));
SELECT setval('reviews_review_id_seq', (SELECT COALESCE(MAX(review_id), 1) FROM reviews));
SELECT setval('messages_message_id_seq', (SELECT COALESCE(MAX(message_id), 1) FROM messages));
SELECT setval('notifications_notification_id_seq', (SELECT COALESCE(MAX(notification_id), 1) FROM notifications));
