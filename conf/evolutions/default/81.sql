# --- !Ups
UPDATE AUDIENCE_COMPONENT SET VALUE='All' WHERE NAME='UndergradStudents';

# --- !Downs
UPDATE AUDIENCE_COMPONENT SET VALUE=NULL WHERE NAME='UndergradStudents';

