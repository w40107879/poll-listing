-- CreateTable
CREATE TABLE `answer` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(50) NULL DEFAULT 'utf8mb4_unicode_ci',
    `poll_id` BIGINT UNSIGNED NULL,
    `vote_count` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    INDEX `poll_id`(`poll_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poll` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL DEFAULT 'utf8mb4_unicode_ci',
    `type` VARCHAR(50) NULL DEFAULT 'utf8mb4_unicode_ci',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `poll`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

