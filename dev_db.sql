BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Address" (
	"id"	INTEGER NOT NULL UNIQUE,
	"person_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"address"	TEXT NOT NULL,
	FOREIGN KEY("person_id") REFERENCES "Person"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Person" (
	"id"	INTEGER NOT NULL UNIQUE,
	"first_name"	TEXT NOT NULL,
	"last_name"	TEXT NOT NULL,
	"display_name"	TEXT NOT NULL,
	"date_of_birth"	TEXT,
	"email_address"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "User" (
	"id"	INTEGER NOT NULL UNIQUE,
	"username"	TEXT NOT NULL UNIQUE,
	"password_hash"	TEXT NOT NULL,
	"password_salt"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "Address" VALUES (1,1,'Home','8675 Rainbow Rd.
Houston, TX 77042'),
 (2,1,'Work','1233 Calliope Ln.
Houston, TX 77024'),
 (3,2,'Work','1233 Calliope Ln.
Houston, TX 77024'),
 (4,3,'Work','1233 Calliope Ln.
Houston, TX 77024');
INSERT INTO "Person" VALUES (1,'Apples','Na','Apples Na','01/02/1993','email@gmail.com'),
 (2,'Apples','Na','Apples Na','01/02/1993','email@gmail.com'),
 (3,'ZApples','Naz','ZApples Naz','01/02/2015','zemail@gmail.com'),
 (4,'ZApples','Naz','ZApples Naz','01/02/2015','zemail@gmail.com'),
 (5,'ZApples','Naz','ZApples Naz','01/02/2015','zemail@gmail.com'),
 (6,'Gpples','Aaz','Gpples Aaz','01/02/2016','gemail@yohe.com'),
 (7,'Gpples','Aaz','Gpples Aaz','01/02/2016','gemail@yohe.com'),
 (8,'Gpples','Aaz','Gpples Aaz','01/02/2016','bad email'),
 (9,'Gpples','Aaz','Gpples Aaz','01/02/2016','gemail@yohe.com'),
 (10,'Jpples','Zaz','Jpples Zaz','01/02/1529','gemail@yohe.com'),
 (11,'Jpples','Zaz','Jpples Zaz','01/02/1529','typo@gmaill.com'),
 (12,'Jpples','Zaz','Jpples Zaz','01/02/1529','gemail@yohe.com'),
 (13,'Jpples','Zaz','Jpples Zaz','01/02/1529','gemail@yohe.com');
INSERT INTO "User" VALUES (1,'admin','565edecc70b716b8dc5a52d92b3df5523468092e732c79ef5ca1533a5d1b1fde030c8932af8b53b6961f9cc8490486a9bb6870b3b89745cf2d033d8cd95cdb2e','673bd3f38db9b13d96ee0fcc9fb83e9b');
COMMIT;
