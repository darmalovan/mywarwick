# --- !Ups
CREATE TABLE NEWS_ITEM (
  ID           NVARCHAR2(100),
  TITLE        CLOB NOT NULL,
  TEXT         CLOB NOT NULL,
  CREATED_AT   TIMESTAMP (0) NOT NULL,
  PUBLISH_DATE TIMESTAMP (0) NOT NULL,
  LINK_TEXT    NVARCHAR2(4000),
  LINK_HREF    NVARCHAR2(4000),
  CONSTRAINT "NEWS_ITEM_PK" PRIMARY KEY ("ID")
);

CREATE TABLE NEWS_RECIPIENT (
  NEWS_ITEM_ID NVARCHAR2(100),
  USERCODE     NVARCHAR2(100),
  PUBLISH_DATE TIMESTAMP (0) NOT NULL,
  CONSTRAINT "NEWS_RECIP_FK" FOREIGN KEY ("NEWS_ITEM_ID") REFERENCES NEWS_ITEM ("ID")
);

CREATE INDEX NEWS_ITEM_INDEX ON NEWS_ITEM (PUBLISH_DATE DESC);
CREATE INDEX NEWS_RECIP_INDEX ON NEWS_RECIPIENT (USERCODE, PUBLISH_DATE DESC);
CREATE INDEX NEWS_RECIP_PARENT_INDEX ON NEWS_RECIPIENT(NEWS_ITEM_ID);


# --- !Downs
DROP TABLE NEWS_ITEM;
DROP TABLE NEWS_RECIPIENT;
