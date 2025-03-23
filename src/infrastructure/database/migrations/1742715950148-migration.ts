import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742715950148 implements MigrationInterface {
  name = 'Migration1742715950148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user" ("username", "password", "roleId", "createdAt", "updatedAt") VALUES ('jmc-admin', 'dGVzdDEyMzQ=', 1, NOW(), NOW()), ('jmc-support', 'dGVzdDQzMjE=', 2, NOW(), NOW())`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "role" ("name", "createdAt", "updatedAt") VALUES ('ADMIN', NOW(), NOW()), ('TECHNICAL_SUPPORT', NOW(), NOW())`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "permission" ("name", "createdAt", "updatedAt") VALUES ('client:create', NOW(), NOW()), ('client:read-all', NOW(), NOW()), ('client:read-by-status', NOW(), NOW())`,
    );
    await queryRunner.query(
      `INSERT INTO "permission" ("name", "createdAt", "updatedAt") VALUES ('client-status:create', NOW(), NOW()), ('client-status:read-all', NOW(), NOW())`,
    );
    await queryRunner.query(
      `CREATE TABLE "granted_permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "permissionId" integer, CONSTRAINT "PK_78ea555a01fd058ecdf47ad5361" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "granted_permission" ("roleId", "permissionId", "createdAt", "updatedAt") VALUES (1, 1, NOW(), NOW()), (1, 2, NOW(), NOW()), (1, 3, NOW(), NOW()), (1, 4, NOW(), NOW()), (1, 5, NOW(), NOW())`,
    );
    await queryRunner.query(
      `INSERT INTO "granted_permission" ("roleId", "permissionId", "createdAt", "updatedAt") VALUES (2, 2, NOW(), NOW()), (2, 3, NOW(), NOW()), (2, 5, NOW(), NOW())`,
    );
    await queryRunner.query(
      `CREATE TABLE "client_status" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2fcaf8756581eab94bba1d006c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("description", "isActive", "createdAt", "updatedAt") VALUES ('Activos', true, NOW(), NOW())`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "documentId" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "statusId" integer, CONSTRAINT "UQ_94b563b35c69f522757765933c8" UNIQUE ("documentId"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "granted_permission" ADD CONSTRAINT "FK_2f872e1cef698dcab7bc665f4e4" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "granted_permission" ADD CONSTRAINT "FK_ffc1fac0cb63bd4881ace60d41a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_0ce939bf6640541190453d3693f" FOREIGN KEY ("statusId") REFERENCES "client_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_0ce939bf6640541190453d3693f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "granted_permission" DROP CONSTRAINT "FK_ffc1fac0cb63bd4881ace60d41a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "granted_permission" DROP CONSTRAINT "FK_2f872e1cef698dcab7bc665f4e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "client_status"`);
    await queryRunner.query(`DROP TABLE "granted_permission"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
