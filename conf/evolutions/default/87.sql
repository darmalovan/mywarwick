# --- !Ups
CREATE TABLE EAP_FEATURE (
  ID NVARCHAR2(100) NOT NULL,
  NAME NVARCHAR2(255) NOT NULL,
  START_DATE TIMESTAMP,
  END_DATE TIMESTAMP,
  SUMMARY CLOB,
  FEEDBACK_URL NVARCHAR2(1000),
  CONSTRAINT EAP_FEATURE_PK PRIMARY KEY (ID)
);

# --- !Downs
DROP TABLE EAP_FEATURE;

