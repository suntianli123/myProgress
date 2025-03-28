SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS `middle_dept` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `ori_dept_id` varchar(50) NOT NULL COMMENT '第三方部门ID',
  `ori_dept_name` varchar(100) NOT NULL COMMENT '第三方部门名称',
  `ori_dept_pid` varchar(50) NOT NULL COMMENT '第三方部门父级ID',
  `dept_id` varchar(50) NOT NULL COMMENT 'WPS部门ID',
  `dept_id_pid` varchar(50) NOT NULL COMMENT 'WPS父级部门ID',
  `dept_order` int(50) NOT NULL COMMENT '排序',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  `create_user` varchar(50) NOT NULL COMMENT '创建人',
  `update_user` varchar(50) NOT NULL COMMENT '修改人',
  `syncsequence` varchar(50) COMMENT '部门序列id',
  `maxsyncsequence` varchar(50) COMMENT '最大部门序列id',
  `is_delete` int(1) NOT NULL COMMENT '删除标示：0未删除，1删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_ori_dept_id_is_delete` (`ori_dept_id`,`is_delete`),
  KEY `ori_dept_id` (`ori_dept_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7642 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
