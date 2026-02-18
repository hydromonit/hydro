-- CreateEnum
CREATE TYPE "CategoryPest" AS ENUM ('PEST', 'DISEASE');

-- CreateEnum
CREATE TYPE "CategoryTreatment" AS ENUM ('INSECTICIDE', 'FUNGICIDE', 'ORGANIC', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONGOING', 'RESOLVED', 'UNRESOLVED');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('MILD', 'MODERATE', 'SEVERE');

-- CreateEnum
CREATE TYPE "Effectiveness" AS ENUM ('EFFECTIVE', 'INEFFECTIVE', 'PENDING', 'PARTIAL');

-- CreateTable
CREATE TABLE "pest_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CategoryPest" NOT NULL,
    "description" TEXT,

    CONSTRAINT "pest_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "treatment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pest_treatment_recommendations" (
    "id" TEXT NOT NULL,
    "pest_type_id" TEXT NOT NULL,
    "treatment_type_id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "effectiveness" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "pest_treatment_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pest_incidents" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "pest_type_id" TEXT NOT NULL,
    "detected_date" TIMESTAMP(3) NOT NULL,
    "resolved_date" TIMESTAMP(3),
    "status" "Status",
    "severity" "Severity",
    "affected_count" INTEGER,
    "notes" TEXT,
    "image_url" TEXT,

    CONSTRAINT "pest_incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_logs" (
    "id" TEXT NOT NULL,
    "pest_incident_id" TEXT NOT NULL,
    "treatment_type_id" TEXT NOT NULL,
    "treatment_date" TIMESTAMP(3) NOT NULL,
    "dosage" TEXT,
    "notes" TEXT,
    "image_url" TEXT,
    "effectiveness" "Effectiveness" DEFAULT 'PENDING',
    "next_treatment_date" TIMESTAMP(3),

    CONSTRAINT "treatment_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pest_types_name_key" ON "pest_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "treatment_types_name_key" ON "treatment_types"("name");

-- AddForeignKey
ALTER TABLE "pest_treatment_recommendations" ADD CONSTRAINT "pest_treatment_recommendations_pest_type_id_fkey" FOREIGN KEY ("pest_type_id") REFERENCES "pest_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pest_treatment_recommendations" ADD CONSTRAINT "pest_treatment_recommendations_treatment_type_id_fkey" FOREIGN KEY ("treatment_type_id") REFERENCES "treatment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pest_incidents" ADD CONSTRAINT "pest_incidents_pest_type_id_fkey" FOREIGN KEY ("pest_type_id") REFERENCES "pest_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_logs" ADD CONSTRAINT "treatment_logs_pest_incident_id_fkey" FOREIGN KEY ("pest_incident_id") REFERENCES "pest_incidents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_logs" ADD CONSTRAINT "treatment_logs_treatment_type_id_fkey" FOREIGN KEY ("treatment_type_id") REFERENCES "treatment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
