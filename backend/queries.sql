ALTER TABLE `Social_Media`.`user` 
CHANGE COLUMN `mobile_no` `mobile_no` VARCHAR(50) NULL DEFAULT NULL ;

ALTER TABLE `Social_Media`.`user` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(255) NOT NULL ;

ALTER TABLE `Social_Media`.`user` 
CHANGE COLUMN `updation_time` `updation_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ;
