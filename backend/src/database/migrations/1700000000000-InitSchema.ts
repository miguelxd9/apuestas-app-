import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1700000000000 implements MigrationInterface {
    name = 'InitSchema1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."event_status_enum" AS ENUM('open', 'closed', 'finished')`);
        await queryRunner.query(`CREATE TYPE "public"."sport_type_enum" AS ENUM('football', 'basketball', 'tennis', 'baseball')`);
        await queryRunner.query(`CREATE TYPE "public"."bet_status_enum" AS ENUM('pending', 'won', 'lost', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "public"."bet_type_enum" AS ENUM('team1', 'team2', 'draw')`);

        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "balance" decimal(10,2) NOT NULL DEFAULT '0', "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "sportType" "public"."sport_type_enum" NOT NULL, "team1" character varying NOT NULL, "team2" character varying NOT NULL, "odds1" decimal(5,2) NOT NULL, "odds2" decimal(5,2) NOT NULL, "oddsDraw" decimal(5,2), "status" "public"."event_status_enum" NOT NULL DEFAULT 'open', "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "winner" character varying, "totalBets" decimal(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        
        await queryRunner.query(`CREATE TABLE "bets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" decimal(10,2) NOT NULL, "odds" decimal(10,2) NOT NULL, "potentialWinnings" decimal(10,2), "betType" "public"."bet_type_enum" NOT NULL, "status" "public"."bet_status_enum" NOT NULL DEFAULT 'pending', "winnings" decimal(10,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "eventId" uuid NOT NULL, "selectedTeam" character varying, CONSTRAINT "PK_7c91e57a3e1b5932225e345c564" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "bets" ADD CONSTRAINT "FK_805fc19303e92f2f3e804d18579" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bets" ADD CONSTRAINT "FK_9bf39b1a8a16a8cef7f33799e99" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bets" DROP CONSTRAINT "FK_9bf39b1a8a16a8cef7f33799e99"`);
        await queryRunner.query(`ALTER TABLE "bets" DROP CONSTRAINT "FK_805fc19303e92f2f3e804d18579"`);
        await queryRunner.query(`DROP TABLE "bets"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."bet_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bet_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."sport_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."event_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }
}
