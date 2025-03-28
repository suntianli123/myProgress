SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS `middle_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` varchar(50) NOT NULL COMMENT '第三方用户ID',
  `nick_name` varchar(50) NOT NULL COMMENT '第三方用户名称',
  `company_uid` varchar(50) NOT NULL COMMENT 'WPS企业成员ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  `create_user` varchar(50) NOT NULL COMMENT '创建人',
  `update_user` varchar(50) NOT NULL COMMENT '修改人',
  `syncsequence` varchar(50) COMMENT '用户序列id',
  `maxsyncsequence` varchar(50) COMMENT '最大部门序列id',
  `is_delete` int(1) NOT NULL COMMENT '删除标示：0未删除，1删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
