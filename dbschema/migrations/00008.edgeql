CREATE MIGRATION m1hqn5hxklf2pvorti3juryl7buw6q7tmoof6aogdp567ifj7qgpcq
    ONTO m1oejqnse2nr3g6c4s2imb2h4pn5aumb44n2lz4ggnxh5sdel7rqta
{
      ALTER TYPE default::Job {
      ALTER LINK payments {
          USING (.<job[IS default::Payment]);
      };
      CREATE PROPERTY total_cost := (std::sum(std::to_int32(.costs.amount)));
  };
};
