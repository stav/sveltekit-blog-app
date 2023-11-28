CREATE MIGRATION m1fkb4h77wcf7go4mgkhg2fexrgscssn7ssjyaaof52p3tb7retrga
    ONTO m1c7trqrp4kr7c5aasfw5ove3xss5xfd6cyu5l3s3wyn242kpd6k6q
{
  CREATE SCALAR TYPE default::Status EXTENDING enum<active, archived>;
  CREATE TYPE default::Client EXTENDING default::HasTimestamp {
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY state: std::str;
      CREATE PROPERTY street: std::str;
      CREATE PROPERTY zip: std::str;
      CREATE PROPERTY address := (((((((.street ++ ', ') ++ .city) ++ ', ') ++ .state) ++ ' ') ++ .zip));
      CREATE PROPERTY company_name: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY last_name: std::str;
      CREATE PROPERTY full_name := (((.first_name ++ ' ') ++ .last_name));
      CREATE PROPERTY phone: std::str;
      CREATE PROPERTY status: default::Status {
          SET default := 'active';
      };
  };
};
