CREATE MIGRATION m1oejqnse2nr3g6c4s2imb2h4pn5aumb44n2lz4ggnxh5sdel7rqta
    ONTO m1tx2pcajhv5kk3ca24fsct5waqulnyhtmuq42rf3bziridzmwyjva
{
      ALTER TYPE default::Job {
      ALTER LINK costs {
          USING (.<job[IS default::Cost]);
      };
  };
};
