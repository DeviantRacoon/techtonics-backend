import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1748483163059 implements MigrationInterface {
    name = 'InitMigration1748483163059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`persons\` (\`personId\` int NOT NULL AUTO_INCREMENT, \`names\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`secondLastName\` varchar(255) NULL, \`curp\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`cellphone\` varchar(255) NULL, \`birthdate\` date NULL, \`status\` enum ('ACTIVO', 'ELIMINADO') NOT NULL DEFAULT 'ACTIVO', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`personId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`roleId\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, \`status\` enum ('ACTIVO', 'ELIMINADO') NOT NULL DEFAULT 'ACTIVO', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_sessions\` (\`sessionId\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`device\` varchar(255) NULL, \`ip\` varchar(255) NULL, \`expiresAt\` timestamp NOT NULL, \`status\` enum ('ACTIVO', 'ELIMINADO', 'BANEADO') NOT NULL DEFAULT 'ACTIVO', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`sessionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(64) NOT NULL, \`code\` varchar(6) NULL, \`username\` varchar(20) NOT NULL, \`status\` enum ('ACTIVO', 'INACTIVO', 'PENDIENTE', 'ELIMINADO') NOT NULL DEFAULT 'PENDIENTE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`personId\` int NULL, \`roleId\` int NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` ADD CONSTRAINT \`FK_55fa4db8406ed66bc7044328427\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_ddd0d20e45dbd0d1536dc082039\` FOREIGN KEY (\`personId\`) REFERENCES \`persons\`(\`personId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`roleId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_ddd0d20e45dbd0d1536dc082039\``);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` DROP FOREIGN KEY \`FK_55fa4db8406ed66bc7044328427\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_sessions\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`persons\``);
    }

}
