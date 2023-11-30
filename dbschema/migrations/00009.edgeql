CREATE MIGRATION m1i6pljxuavtukjvj7s4uhbczbyezvrrchlzvtz7y2qrpu3p4cxaia
    ONTO m1hqn5hxklf2pvorti3juryl7buw6q7tmoof6aogdp567ifj7qgpcq
{
      ALTER TYPE default::Job {
      CREATE PROPERTY total_earn := (std::sum(std::to_int32(.payments.amount)));
  };
};
