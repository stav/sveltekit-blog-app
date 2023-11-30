CREATE MIGRATION m1tx2pcajhv5kk3ca24fsct5waqulnyhtmuq42rf3bziridzmwyjva
    ONTO m17fernmz5otlzu4o7cufdnubnhj5a3qi3fhzwga4rdwuzfdmzeuta
{
      ALTER TYPE default::Job {
      CREATE MULTI LINK costs: default::Cost;
      CREATE MULTI LINK payments: default::Payment;
  };
};
