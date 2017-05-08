# --- !Ups
ALTER TABLE ACTIVITY_RECIPIENT ADD SHOULD_NOTIFY NUMBER (1, 0);
ALTER TABLE ACTIVITY_RECIPIENT ADD REPLACED NUMBER (1, 0) DEFAULT 0 NOT NULL;

# --- !Downs
ALTER TABLE ACTIVITY_RECIPIENT DROP COLUMN SHOULD_NOTIFY;
ALTER TABLE ACTIVITY_RECIPIENT DROP COLUMN REPLACED;