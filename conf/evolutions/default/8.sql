# --- !Ups
ALTER TABLE USER_TILE ADD PREFERENCES CLOB;

# --- !Downs
ALTER TABLE USER_TILE DROP COLUMN PREFERENCES;
