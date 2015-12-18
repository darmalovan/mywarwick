# --- !Ups
CREATE TABLE PUSH_REGISTRATION (
  "USERCODE" NVARCHAR2(100) NOT NULL,
  "PLATFORM" CHAR(1) NOT NULL,
  "TOKEN" NVARCHAR2(100) NOT NULL,
  "CREATED_AT" TIMESTAMP NOT NULL
);

CREATE INDEX PUSH_REG_USERCODE_INDEX ON PUSH_REGISTRATION (USERCODE);

# --- !Downs
DROP INDEX PUSH_REG_USERCODE_INDEX;

DROP TABLE PUSH_REGISTRATION;