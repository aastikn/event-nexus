package database

import (
	"Event-Nexus-Api/models"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DbInstance is a representation of the database instance - its only field is the gorm DB instance
type DbInstance struct {
	Db *gorm.DB
}

func GlobalActivationScope(db *gorm.DB) *gorm.DB {
	return db.Where("is_activated = ?", true)
}

var Database DbInstance

func ConnectToDB() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	connectionString := os.Getenv("DB_URL")

	log.Println("Connecting to database...")
	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{})

	if err != nil {
		log.Fatal("Error connecting to database")
	}

	db.Scopes(GlobalActivationScope)

	log.Println("Connected to database")

	// Create triggers and indexes
	//const triggerQuery = `
	//	CREATE OR REPLACE FUNCTION ride_search_vector_update() RETURNS trigger AS $$
	//	BEGIN
	//	NEW.search_vector := to_tsvector('english', coalesce(NEW.start_location, '') || ' ' || coalesce(NEW.end_location, ''));
	//	RETURN NEW;
	//	END
	//	$$ LANGUAGE plpgsql;
	//
	//	DROP TRIGGER IF EXISTS ride_search_vector_trigger ON rides;
	//	CREATE TRIGGER ride_search_vector_trigger
	//	BEFORE INSERT OR UPDATE ON rides
	//	FOR EACH ROW EXECUTE FUNCTION ride_search_vector_update();
	//	`
	//
	//log.Println("Creating triggers...")
	//if result := db.Exec(triggerQuery); result.Error != nil {
	//	log.Println("Error creating triggers")
	//}
	//log.Println("Triggers created")
	//
	//const indexQuery = `CREATE INDEX IF NOT EXISTS ride_search_idx ON rides USING GIN(search_vector);`
	//
	//log.Println("Creating index...")
	//if result := db.Exec(indexQuery); result.Error != nil {
	//	log.Println("Error creating index")
	//}
	//log.Println("Index created")

	if os.Getenv("SHOULD_MIGRATE") == "TRUE" {
		log.Println("Running DB Migrations...")

		err = db.AutoMigrate(&models.User{}, &models.Service{}, &models.Provider{})

		if err != nil {
			log.Fatalf("Error running migrations: %v", err)
		}

		log.Println("DB Migrations completed")
	}

	Database = DbInstance{Db: db}
}
