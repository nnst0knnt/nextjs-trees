-- CreateTable
CREATE TABLE "roots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "root_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "child_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "edges_root_id_child_id_key" ON "edges"("root_id", "child_id");

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_root_id_fkey" FOREIGN KEY ("root_id") REFERENCES "roots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
