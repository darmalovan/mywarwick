# --- !Ups
alter table USER_PREFERENCE add CHOSEN_COLOUR_SCHEME int default 1 not null;

# --- !Downs
alter table USER_PREFERENCE drop column CHOSEN_COLOUR_SCHEME;

