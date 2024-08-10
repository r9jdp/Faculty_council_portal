-- CreateEnum
CREATE TYPE "academic_year" AS ENUM ('First', 'Second', 'Third', 'Fourth');

-- CreateEnum
CREATE TYPE "approval_status" AS ENUM ('Approved', 'Pending', 'Rejected');

-- CreateEnum
CREATE TYPE "certificate_level" AS ENUM ('Inter College', 'Intra College', 'Regional', 'National', 'International');

-- CreateEnum
CREATE TYPE "certificate_type" AS ENUM ('Individual', 'Team');

-- CreateEnum
CREATE TYPE "target_audience" AS ENUM ('UG Students', 'PG Students');

-- CreateTable
CREATE TABLE "activities" (
    "activity_id" INTEGER NOT NULL,
    "council_id" INTEGER,
    "tenure_id" INTEGER,
    "date_of_activity" DATE,
    "name_of_activity" VARCHAR,
    "activity_type" VARCHAR,
    "name_of_the_organizer" VARCHAR,
    "start_date_of_activity" DATE,
    "end_date_of_activity" DATE,
    "target_audience" "target_audience",
    "no_of_hours" INTEGER,
    "no_of_participants" INTEGER,
    "description" VARCHAR(200),
    "pamplets" BYTEA,
    "activity_photos" BYTEA,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "activity_faculty_approval" (
    "activity_approval_id" INTEGER NOT NULL,
    "activity_id" INTEGER,
    "approval_status" "approval_status",

    CONSTRAINT "activity_faculty_approval_pkey" PRIMARY KEY ("activity_approval_id")
);

-- CreateTable
CREATE TABLE "certificate_faculty_approval" (
    "certificate_approval_id" INTEGER NOT NULL,
    "certificate_id" INTEGER,
    "approval_status" "approval_status",

    CONSTRAINT "certificate_faculty_approval_pkey" PRIMARY KEY ("certificate_approval_id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "certificate_id" INTEGER NOT NULL,
    "member_id" INTEGER,
    "tenure_id" INTEGER,
    "name_of_certificate" VARCHAR,
    "date_of_issue" DATE,
    "start_date_of_certificate" DATE,
    "end_date_of_certificate" DATE,
    "issue_by" VARCHAR,
    "certificate_type" "certificate_type",
    "level" "certificate_level",
    "certificate_description" VARCHAR(200),
    "certificate_image" BYTEA,
    "certificate_photos" BYTEA,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("certificate_id")
);

-- CreateTable
CREATE TABLE "councils" (
    "council_id" INTEGER NOT NULL,
    "council_name" VARCHAR,

    CONSTRAINT "councils_pkey" PRIMARY KEY ("council_id")
);

-- CreateTable
CREATE TABLE "faculty_incharge" (
    "facuty_name" VARCHAR,
    "council_id" INTEGER,
    "faculty_id" INTEGER NOT NULL,

    CONSTRAINT "faculty_incharge_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "member_faculty_approval" (
    "member_approval_id" INTEGER NOT NULL,
    "member_id" INTEGER,
    "approval_status" "approval_status",

    CONSTRAINT "member_faculty_approval_pkey" PRIMARY KEY ("member_approval_id")
);

-- CreateTable
CREATE TABLE "members" (
    "council_id" INTEGER,
    "tenure_id" INTEGER,
    "member_id" INTEGER NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "designation" VARCHAR,
    "branch" VARCHAR,
    "academic_year" "academic_year",
    "roll_number" INTEGER,
    "email" VARCHAR,
    "contact" INTEGER,

    CONSTRAINT "members_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "tenure" (
    "tenure_id" INTEGER NOT NULL,
    "tenure" VARCHAR,

    CONSTRAINT "tenure_pkey" PRIMARY KEY ("tenure_id")
);

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_council_id_fkey" FOREIGN KEY ("council_id") REFERENCES "councils"("council_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tenure_id_fkey" FOREIGN KEY ("tenure_id") REFERENCES "tenure"("tenure_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activity_faculty_approval" ADD CONSTRAINT "activity_faculty_approval_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("activity_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "certificate_faculty_approval" ADD CONSTRAINT "certificate_faculty_approval_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "certificates"("certificate_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("member_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_tenure_id_fkey" FOREIGN KEY ("tenure_id") REFERENCES "tenure"("tenure_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faculty_incharge" ADD CONSTRAINT "faculty_incharge_council_id_fkey" FOREIGN KEY ("council_id") REFERENCES "councils"("council_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member_faculty_approval" ADD CONSTRAINT "member_faculty_approval_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("member_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_council_id_fkey" FOREIGN KEY ("council_id") REFERENCES "councils"("council_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_tenure_id_fkey" FOREIGN KEY ("tenure_id") REFERENCES "tenure"("tenure_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
