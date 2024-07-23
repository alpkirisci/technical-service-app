-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "productHandle" TEXT NOT NULL,
    "boughtFrom" TEXT NOT NULL,
    "billingDate" DATETIME NOT NULL,
    "billingNo" TEXT NOT NULL,
    "complaint" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "repair" TEXT,
    "repairCost" REAL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
