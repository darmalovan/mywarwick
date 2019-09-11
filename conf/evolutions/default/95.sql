# --- !Ups

UPDATE NEWS_CATEGORY SET ICON = 'running' WHERE ID = 'e17f83c2-213a-4580-a8e1-0ded4d8b73ad' AND ICON = 'map-signs';

# --- !Downs

UPDATE NEWS_CATEGORY SET ICON = 'map-signs' WHERE ID = 'e17f83c2-213a-4580-a8e1-0ded4d8b73ad' AND ICON = 'running';
