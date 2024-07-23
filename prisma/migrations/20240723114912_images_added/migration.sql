-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceRequestId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    CONSTRAINT "Image_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Image_serviceRequestId_idx" ON "Image"("serviceRequestId");
