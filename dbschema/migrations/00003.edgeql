CREATE MIGRATION m1ivook25kxd5nqzboud7ssjktktijxio7d3bthzjk4ngcwifrdv5a
    ONTO m1fkb4h77wcf7go4mgkhg2fexrgscssn7ssjyaaof52p3tb7retrga
{
  CREATE TYPE default::Job EXTENDING default::HasTimestamp {
      CREATE REQUIRED LINK client: default::Client;
      CREATE MULTI LINK tags: default::Tag;
      CREATE PROPERTY beg_date: std::datetime;
      CREATE PROPERTY end_date: std::datetime;
      CREATE PROPERTY title: std::str;
  };
  ALTER TYPE default::Client {
      CREATE MULTI LINK jobs := (.<client[IS default::Job]);
  };
};
