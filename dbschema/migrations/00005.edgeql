CREATE MIGRATION m17fernmz5otlzu4o7cufdnubnhj5a3qi3fhzwga4rdwuzfdmzeuta
    ONTO m1junasg3qycsqoqirndzahqhullsx3urlpfqnkwbpckzi76zqgieq
{
  CREATE TYPE default::Cost EXTENDING default::HasTimestamp {
      CREATE REQUIRED LINK job: default::Job;
      CREATE MULTI LINK tags: default::Tag;
      CREATE PROPERTY amount: std::str;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY job_date: std::str;
      CREATE PROPERTY purchase_date: std::str;
      CREATE PROPERTY tax: std::str;
      CREATE PROPERTY vendor: std::str;
  };
  CREATE TYPE default::Payment EXTENDING default::HasTimestamp {
      CREATE REQUIRED LINK job: default::Job;
      CREATE MULTI LINK tags: default::Tag;
      CREATE PROPERTY amount: std::str;
      CREATE PROPERTY date: std::str;
      CREATE PROPERTY description: std::str;
  };
};
