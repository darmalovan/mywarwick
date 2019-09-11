# --- !Ups
DELETE FROM USER_NEWS_CATEGORY;
DELETE FROM NEWS_ITEM_CATEGORY;
DELETE FROM NEWS_CATEGORY;

INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('f7909bb4-58dc-46d1-a5cc-fb3abdfd7d8d', 'Community & campus', 'users');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('a376b49b-123f-415c-85f5-1ee965e42ff3', 'Departmental news', 'newspaper');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('7fa30aae-9483-49c9-8a24-2ff6a142112d', 'Development & careers', 'building');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('9a221b0a-b903-48fd-9da6-1710b808b50d', 'Dialogue & feedback', 'comments');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('5c929b4c-17f0-40c4-8138-d354a832d728', 'Free events & lectures', 'microphone-alt');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('12c6da1d-f9dc-4ca5-b12a-9bbd6b9856da', 'Funding, scholarships & finance', 'money-bill-wave');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('33a265d2-f732-4a79-8e88-6b06baf14ce4', 'International events & trips', 'globe');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('19f930e0-a532-4854-b779-cf7b32bb78db', 'Support & wellbeing', 'hands-helping');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('e17f83c2-213a-4580-a8e1-0ded4d8b73ad', 'SU, sport, volunteering & societies', 'map-signs');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('08c7d3b2-21ba-4b3f-bbd0-12088ac36766', 'Teaching & learning', 'books');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('edbbbb45-42b1-464a-b026-d728610e5af5', 'University news & notices', 'university');


# --- !Downs

DELETE FROM NEWS_CATEGORY;
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('5df10fa7-56c3-4713-88ed-20630564e8c1', 'Teaching and Learning', 'chalkboard-teacher');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('b255aa73-f257-4e28-a604-968abf67b130', 'Retail', 'store');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('bb4e6835-c889-4042-b092-b65765500e22', 'Careers', 'user-tie');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('5f6dd785-aa80-4532-bcd3-582764168dca', 'Sport', 'baseball');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('a44a01fd-4315-4c4e-9a5a-fb6d1f3c14a5', 'Arts Centre', 'theater-masks');
INSERT INTO NEWS_CATEGORY (ID, NAME, ICON) VALUES ('9f087304-0784-4ae1-bcfe-6a395e9653d6', 'Campus', 'map-signs');
