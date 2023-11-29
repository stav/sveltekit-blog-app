CREATE MIGRATION m1junasg3qycsqoqirndzahqhullsx3urlpfqnkwbpckzi76zqgieq
    ONTO m1ivook25kxd5nqzboud7ssjktktijxio7d3bthzjk4ngcwifrdv5a
{
  ALTER TYPE default::Job {
      ALTER PROPERTY beg_date {
          SET TYPE std::str USING (<std::str>.beg_date);
      };
      ALTER PROPERTY end_date {
          SET TYPE std::str USING (<std::str>.end_date);
      };
  };
};
