CREATE TABLE `article`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文章内容',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `user_id` int(0) UNSIGNED NULL DEFAULT NULL COMMENT '作者id',
  `state` int(0) NOT NULL DEFAULT 0 COMMENT '删除状态 0为未删除，1为已删除',
--   `type` int(0) NULL DEFAULT 0 COMMENT '文章类型：默认0为技术文章，1为生活说说',
--   `pic_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文章封面',
--   `visited` int(0) NOT NULL DEFAULT 1 COMMENT '文章访问量',
--   `like_count` int(0) NOT NULL DEFAULT 0 COMMENT '点赞数量',
--   `islike` tinyint(0) NOT NULL DEFAULT 0 COMMENT '当前用户是否点赞了，默认为0,已点赞则为1',
  `author` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作者',
  `classify` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '[]' COMMENT '分类数组，存储分类id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE
)

CREATE TABLE `user`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
--   `head_img` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'http://b-ssl.duitang.com/uploads/item/201607/27/20160727112945_S2kR5.thumb.700_0.png',
--   `grade` int(0) NULL DEFAULT 3,
--   `is_apply` int(0) NULL DEFAULT 0 COMMENT '是否申请成为管理员，0为否，1为是',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `username_UNIQUE`(`username`) USING BTREE,
  UNIQUE INDEX `nickname_UNIQUE`(`nickname`) USING BTREE
)