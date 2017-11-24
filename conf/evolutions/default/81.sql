# --- !Ups
INSERT INTO TILE_GROUP (TILE_ID, "GROUP") SELECT TILE_ID, 'no-uni-id' FROM TILE_GROUP WHERE "GROUP" = 'anonymous';
INSERT INTO TILE_GROUP (TILE_ID, "GROUP") VALUES ('account', 'no-uni-id');

INSERT INTO TILE_GROUP_LAYOUT (GROUP_ID, TILE_ID, LAYOUT_WIDTH, X, Y, WIDTH, HEIGHT)
    SELECT 'no-uni-id', TILE_ID, LAYOUT_WIDTH, X, Y+1, WIDTH, HEIGHT FROM TILE_GROUP_LAYOUT WHERE GROUP_ID = 'anonymous';
INSERT INTO TILE_GROUP_LAYOUT (GROUP_ID, TILE_ID, LAYOUT_WIDTH, X, Y, WIDTH, HEIGHT) VALUES ('no-uni-id', 'account', 2, 0, 0, 2, 1);
INSERT INTO TILE_GROUP_LAYOUT (GROUP_ID, TILE_ID, LAYOUT_WIDTH, X, Y, WIDTH, HEIGHT) VALUES ('no-uni-id', 'account', 5, 0, 0, 2, 1);

# --- !Downs
DELETE FROM TILE_GROUP_LAYOUT WHERE GROUP_ID = 'no-uni-id';
DELETE FROM TILE_GROUP WHERE "GROUP" = 'no-uni-id';
